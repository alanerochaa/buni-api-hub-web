export const paths = {
  catalog: {
    path: '/',
    getHref: () => '/',
  },
  resourceDetails: {
    path: '/resource/:resourceId',
    getHref: (resourceId: string) => `/resource/${resourceId}`,
  },
  about: {
    path: '/sobre',
    getHref: () => '/sobre',
  },
} as const
