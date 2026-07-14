import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      // Se a API cair (ou estiver de boot) no momento em que uma query
      // falha, ela fica em estado de erro permanente — nada mais a
      // refaz sozinha (sem refetchInterval para /resources e /summary,
      // diferente do health check). refetchOnWindowFocus é o gatilho de
      // recuperação padrão do React Query para esse caso: ao voltar
      // para a aba, refaz a query. Desabilitado antes, o que deixava a
      // tela presa em "Não foi possível carregar o catálogo." mesmo
      // depois da API voltar a responder, exigindo F5 manual.
      refetchOnWindowFocus: true,
    },
  },
})
