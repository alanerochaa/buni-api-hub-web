import { createBrowserRouter, Navigate } from 'react-router'

import { AboutPage } from '@/features/about'
import { AdminResourcesPage, ResourceFormPage, ResourceViewPage } from '@/features/admin'
import { AccessDeniedPage, LoginPage, ProtectedRoute, RequireRole } from '@/features/auth'
import { CatalogPage } from '@/features/catalog'
import { OperationalLogPage } from '@/features/operational-log'
import { ResourceDetailsPage } from '@/features/resource-details'
import { AppShell } from '@/layout'
import { legacyPaths, paths } from '@/routes'

import { LegacyEditResourceRedirect, LegacyViewResourceRedirect } from './legacyRedirects'

export const router = createBrowserRouter([
  { path: paths.login.path, element: <LoginPage /> },
  {
    element: <AppShell />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: paths.catalog.path, element: <CatalogPage view="all" /> },
          { path: paths.apis.path, element: <CatalogPage view="api" /> },
          { path: paths.webServices.path, element: <CatalogPage view="web-service" /> },
          { path: paths.sites.path, element: <CatalogPage view="site" /> },
          { path: paths.favorites.path, element: <CatalogPage view="favorites" /> },
          { path: paths.resourceDetails.path, element: <ResourceDetailsPage /> },
          { path: paths.about.path, element: <AboutPage /> },
          { path: paths.accessDenied.path, element: <AccessDeniedPage /> },
          {
            element: <RequireRole roles={['ROLE_ADMIN']} />,
            children: [
              { path: paths.admin.resources.path, element: <AdminResourcesPage /> },
              { path: paths.admin.newResource.path, element: <ResourceFormPage mode="create" /> },
              { path: paths.admin.editResource.path, element: <ResourceFormPage mode="edit" /> },
              { path: paths.admin.viewResource.path, element: <ResourceViewPage /> },
              { path: paths.operationalLog.path, element: <OperationalLogPage /> },
            ],
          },
        ],
      },
    ],
  },
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