import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Certificate from '@/app/components/academy/Certificate'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { code } = await params
  return {
    title: `Certificado ${code} — House Mazzutti Academy`,
    description: 'Verifique a autenticidade de um certificado emitido pela House Mazzutti Academy.',
    robots: { index: false }, // página de verificação não deve ranquear
  }
}

export default async function VerifyPage({ params }) {
  const { code } = await params
  const supabase = await createClient()
  const { data: cert, error } = await supabase
    .from('v_academy_certificate_public')
    .select('*')
    .eq('cert_code', code.toUpperCase())
    .maybeSingle()

  if (error || !cert) notFound()

  return (
    <main style={{ minHeight: '100vh', background: '#FAF9F5', padding: '40px 20px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <Link
            href="/"
            style={{
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0E0D0B99',
              textDecoration: 'none',
            }}
          >
            ← House Mazzutti
          </Link>
          <Status revoked={cert.is_revoked} />
        </div>

        <div style={{ background: 'white', padding: 20, borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
            <Certificate
              certCode={cert.cert_code}
              studentName={(cert.student_name || '').toUpperCase()}
              courseIndex={cert.course_index || '01'}
              courseChapter={cert.course_chapter || ''}
              coursePt={(cert.course_title_pt || cert.course_title || '').toUpperCase()}
              courseEn={(cert.course_title_en || '').toUpperCase()}
              discipline={cert.discipline || ''}
              hours={cert.hours || 0}
              startDate={cert.start_date}
              endDate={cert.end_date}
              city={cert.city || 'São Paulo · Bosque da Saúde'}
              founderName={cert.founder_name}
              founderTitle={cert.founder_title}
              coordinatorName={cert.coordinator_name}
              coordinatorTitle={cert.coordinator_title}
              accent={cert.course_accent || '#C8531C'}
              accentSoft={cert.course_accent_soft || '#F2E1D4'}
              sealKind={cert.seal_kind || 'creative'}
              verifyUrl={`https://housemazzutti.com/verify/${cert.cert_code}`}
            />
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr 1fr', fontSize: 13 }}>
          <Stat label="Código" value={cert.cert_code} />
          <Stat label="Emitido em" value={fmt(cert.issued_at)} />
          <Stat label="Carga horária" value={`${cert.hours} horas`} />
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          html, body { background: white; }
          a, .no-print { display: none !important; }
        }
      `}</style>
    </main>
  )
}

function Status({ revoked }) {
  if (revoked) {
    return (
      <span style={{ background: '#fee', color: '#a00', padding: '6px 14px', borderRadius: 999, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        ⊘ Revogado
      </span>
    )
  }
  return (
    <span style={{ background: '#e6f4ea', color: '#137333', padding: '6px 14px', borderRadius: 999, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
      ✓ Autêntico
    </span>
  )
}

function Stat({ label, value }) {
  return (
    <div style={{ background: 'white', padding: '14px 18px', borderRadius: 12 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0E0D0B66' }}>{label}</div>
      <div style={{ marginTop: 4, fontWeight: 600, color: '#0E0D0B' }}>{value}</div>
    </div>
  )
}

function fmt(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}
