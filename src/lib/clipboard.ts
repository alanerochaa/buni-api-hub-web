/**
 * navigator.clipboard só existe em contexto seguro (https ou
 * localhost) e a escrita pode ser rejeitada (permissão negada, foco
 * perdido). O fallback usa a API antiga (textarea + execCommand),
 * suportada em qualquer navegador, sem precisar de nenhuma biblioteca
 * nova. Devolve `false` em vez de lançar — quem chama decide como
 * comunicar a falha ao usuário (toast de erro).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // cai para o fallback abaixo
    }
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)
    return successful
  } catch {
    return false
  }
}
