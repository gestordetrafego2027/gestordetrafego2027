// Layout vazio — substitui o /crm/layout.tsx para a página de impressão,
// removendo o header/nav e deixando apenas o conteúdo da proposta.
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
