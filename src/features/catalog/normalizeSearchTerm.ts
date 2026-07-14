/**
 * Mesma normalização usada em ingestion/src/normalize.ts para montar o
 * searchIndex (minúsculo, sem acento) — precisa ser idêntica aqui para
 * o termo digitado bater com o índice gerado na ingestão. Duplicado de
 * propósito: web/ e ingestion/ são projetos Node separados, sem
 * pacote compartilhado — para uma função de poucas linhas não vale a
 * pena criar um workspace só para isso.
 */
export function normalizeSearchTerm(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}
