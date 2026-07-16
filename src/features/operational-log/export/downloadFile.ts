/**
 * Dispara o download de um conteúdo textual já pronto (CSV hoje;
 * qualquer exportador futuro — Excel, PDF — só precisa gerar sua
 * string/blob e chamar isso, sem repetir a mecânica de download.
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
