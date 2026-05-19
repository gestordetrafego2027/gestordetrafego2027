import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Certificate from '@/app/components/academy/Certificate'
import PrintButton from './PrintButton'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Certificado — House Mazzutti Academy',
  robots: { index: false },
}

/**
 * Página do próprio aluno: mostra o certificado em alta resolução com
 * botão "imprimir/baixar PDF" via diálogo do navegador (Ctrl+P → Salvar como PDF).
 * Para PDF programático, será introduzida uma rota futura com puppeteer.
 */
export default async function MyCertificatePage({ params }) {
  const { code } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirect=/academy/certificado/${code}`)

  const { data: cert, error } = await supabase
    .from('academy_certificates')
    .select(`
      id, code, user_id, issued_at, revoked_at,
      student_name_snapshot, course_title_pt_snapshot, course_title_en_snapshot,
      hours, start_date, end_date, city,
      founder_name, founder_title, coordinator_name, coordinator_title,
      product:academy_products(id, slug, title, metadata)
    `)
    .eq('code', code.toUpperCase())
    .maybeSingle()
  if (error || !cert) notFound()

  // Aluno só vê o próprio (admin pode ver tudo via outra rota)
  if (cert.user_id !== user.id) notFound()

  const m = cert.product?.metadata || {}

  return (
    <main style={{ minHeight: '100vh', background: '#FAF9F5', padding: '24px 16px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <a href="/academy/dashboard" style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', color: '#0E0D0B99' }}>
            ← Meu painel
          </a>
          <PrintButton />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
          <Certificate
            certCode={cert.code}
            studentName={(cert.student_name_snapshot || '').toUpperCase()}
            courseIndex={m.index_label || '01'}
            courseChapter={m.chapter || ''}
            coursePt={(cert.course_title_pt_snapshot || cert.product?.title || '').toUpperCase()}
            courseEn={(cert.course_title_en_snapshot || m.title_en || '').toUpperCase()}
            discipline={m.discipline || ''}
            hours={cert.hours || 0}
            startDate={cert.start_date}
            endDate={cert.end_date}
            city={cert.city || 'São Paulo · Mooca'}
            founderName={cert.founder_name}
            founderTitle={cert.founder_title}
            coordinatorName={cert.coordinator_name}
            coordinatorTitle={cert.coordinator_title}
            accent={m.accent_color || '#C8531C'}
            accentSoft={m.accent_soft || '#F2E1D4'}
            sealKind={m.seal_kind || 'creative'}
            verifyUrl={`https://housemazzutti.com/verify/${cert.code}`}
          />
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body { background: white; }
          .no-print { display: none !important; }
        }
      `}</style>
    </main>
  )
}

