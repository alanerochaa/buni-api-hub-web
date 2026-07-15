import { createBrowserRouter, Navigate } from 'react-router'

import { AboutPage } from '@/features/about'
import { AdminResourcesPage, ResourceFormPage, ResourceViewPage } from '@/features/admin'
import { CatalogPage } from '@/features/catalog'
import { ResourceDetailsPage } from '@/features/resource-details'
import { AppShell } from '@/layout'
import { legacyPaths, paths } from '@/routes'

import { LegacyEditResourceRedirect, LegacyViewResourceRedirect } from './legacyRedirects'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: paths.catalog.path, element: <CatalogPage view="all" /> },
      { path: paths.apis.path, element: <CatalogPage view="api" /> },
      { path: paths.webServices.path, element: <CatalogPage view="web-service" /> },
      { path: paths.sites.path, element: <CatalogPage view="site" /> },
      { path: paths.favorites.path, element: <CatalogPage view="favorites" /> },
      { path: paths.resourceDetails.path, element: <ResourceDetailsPage /> },
      { path: paths.about.path, element: <AboutPage /> },
      { path: paths.admin.resources.path, element: <AdminResourcesPage /> },
      { path: paths.admin.newResource.path, element: <ResourceFormPage mode="create" /> },
      { path: paths.admin.editResource.path, element: <ResourceFormPage mode="edit" /> },
      { path: paths.admin.viewResource.path, element: <ResourceViewPage /> },
    ],
  },
  // Compatibilidade com URLs antigas (/admin/recursos/...), de antes
  // da migração para /cadastro-recursos — só redirecionam, não
  // renderizam nenhuma tela própria.
  {
    path: legacyPaths.adminResources,
    element: <Navigate to={paths.admin.resources.getHref()} replace />,
  },
  {
    path: legacyPaths.adminNewResource,
    element: <Navigate to={paths.admin.newResource.getHref()} replace />,
  },
  { path: legacyPaths.adminEditResource, element: <LegacyEditResourceRedirect /> },
  { path: legacyPaths.adminViewResource, element: <LegacyViewResourceRedirect /> },
])