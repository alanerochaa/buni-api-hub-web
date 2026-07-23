export const paths = {
  login: {
    path: '/login',
    getHref: () => '/login',
  },
  accessDenied: {
    path: '/acesso-negado',
    getHref: () => '/acesso-negado',
  },
  catalog: {
    path: '/',
    getHref: () => '/',
  },
  apis: {
    path: '/apis',
    getHref: () => '/apis',
  },
  webServices: {
    path: '/web-services',
    getHref: () => '/web-services',
  },
  sites: {
    path: '/sites',
    getHref: () => '/sites',
  },
  favorites: {
    path: '/favoritos',
    getHref: () => '/favoritos',
  },
  resourceDetails: {
    path: '/resource/:resourceId',
    getHref: (resourceId: string) => `/resource/${resourceId}`,
  },
  about: {
    path: '/sobre',
    getHref: () => '/sobre',
  },
  admin: {
    resources: {
      path: '/cadastro-recursos',
      getHref: () => '/cadastro-recursos',
    },
    newResource: {
      path: '/cadastro-recursos/novo',
      getHref: () => '/cadastro-recursos/novo',
    },
    editResource: {
      path: '/cadastro-recursos/:resourceId/editar',
      getHref: (resourceId: string) => `/cadastro-recursos/${resourceId}/editar`,
    },
    viewResource: {
      path: '/cadastro-recursos/:resourceId',
      getHref: (resourceId: string) => `/cadastro-recursos/${resourceId}`,
    },
  },
  operationalLog: {
    path: '/log-operacional',
    getHref: () => '/log-operacional',
  },
} as const

export const legacyPaths = {
  adminResources: '/admin/recursos',
  adminNewResource: '/admin/recursos/novo',
  adminViewResource: '/admin/recursos/:resourceId',
  adminEditResource: '/admin/recursos/:resourceId/editar',
} as const
