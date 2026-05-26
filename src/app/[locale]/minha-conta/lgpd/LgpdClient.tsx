'use client'

import { useState, useTransition } from 'react'
import { updateMarketingConsent, requestDataExport, requestAccountDeletion } from './actions'

interface Props {
  marketingConsent: boolean
}

export function LgpdClient({ marketingConsent: initialConsent }: Props) {
  const [consent, setConsent] = useState(initialConsent)
  const [exportMsg, setExportMsg] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')
  const [isPendingConsent, startConsent] = useTransition()
  const [isPendingExport, startExport] = useTransition()
  const [isPendingDelete, startDelete] = useTransition()

  function handleConsentToggle() {
    const next = !consent
    setConsent(next)
    const fd = new FormData()
    fd.set('marketing_consent', String(next))
    startConsent(() => updateMarketingConsent(fd))
  }

  function handleExport() {
    startExport(async () => {
      const res = await requestDataExport()
      setExportMsg(res.message)
    })
  }

  function handleDelete() {
    if (deleteInput !== 'EXCLUIR') return
    startDelete(async () => {
      await requestAccountDeletion()
    })
  }

  return (
    <div className="space-y-8">
      {/* Consentimento de marketing */}
      <section>
        <h3 className="font-semibold text-neutral-900 mb-1">Comunicações de marketing</h3>
        <p className="text-sm text-neutral-500 mb-4">
          Aceito receber e-mails com novidades, promoções e conteúdos da House Mazzutti.
          Você pode revogar a qualquer momento (Art. 8, §5º LGPD).
        </p>
        <button
          onClick={handleConsentToggle}
          disabled={isPendingConsent}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
            consent ? 'bg-neutral-900' : 'bg-neutral-200'
          }`}
          role="switch"
          aria-checked={consent}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              consent ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className="ml-3 text-sm text-neutral-600">{consent ? 'Ativado' : 'Desativado'}</span>
      </section>

      <hr className="border-neutral-100" />

      {/* Exportação de dados */}
      <section>
        <h3 className="font-semibold text-neutral-900 mb-1">Exportar meus dados</h3>
        <p className="text-sm text-neutral-500 mb-4">
          Direito de acesso e portabilidade (Art. 18, I e V LGPD). Você receberá um arquivo
          com todos os seus dados cadastrais e histórico de pedidos.
        </p>
        {exportMsg ? (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-xl px-4 py-3">
            {exportMsg}
          </div>
        ) : (
          <button
            onClick={handleExport}
            disabled={isPendingExport}
            className="px-5 py-2.5 border border-neutral-200 text-sm font-medium rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            {isPendingExport ? 'Processando...' : 'Solicitar exportação'}
          </button>
        )}
      </section>

      <hr className="border-neutral-100" />

      {/* Exclusão de conta */}
      <section>
        <h3 className="font-semibold text-red-600 mb-1">Excluir minha conta</h3>
        <p className="text-sm text-neutral-500 mb-2">
          Direito à eliminação (Art. 18, VI LGPD). Seus dados pessoais serão anonimizados.
          Registros fiscais são mantidos por obrigação legal (Art. 16, II LGPD).
        </p>
        <p className="text-xs text-neutral-400 mb-4">
          ⚠️ Esta ação é irreversível. Acesso à loja e academy será encerrado.
        </p>

        {!deleteConfirm ? (
          <button
            onClick={() => setDeleteConfirm(true)}
            className="px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors"
          >
            Excluir minha conta
          </button>
        ) : (
          <div className="border border-red-200 rounded-xl p-5 bg-red-50 space-y-3">
            <p className="text-sm font-medium text-red-800">
              Digite <strong>EXCLUIR</strong> para confirmar:
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
              placeholder="EXCLUIR"
              className="w-full border border-red-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none font-mono tracking-widest"
            />
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={deleteInput !== 'EXCLUIR' || isPendingDelete}
                className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPendingDelete ? 'Excluindo...' : 'Confirmar exclusão'}
              </button>
              <button
                onClick={() => { setDeleteConfirm(false); setDeleteInput('') }}
                className="px-5 py-2 border border-neutral-200 text-sm font-medium rounded-lg hover:bg-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
