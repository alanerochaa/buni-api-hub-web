import { createBrowserRouter } from 'react-router'

import { AboutPage } from '@/features/about'
import { CatalogPage } from '@/features/catalog'
import { ResourceDetailsPage } from '@/features/resource-details'
import { AppShell } from '@/layout'
import { paths } from '@/routes'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: paths.catalog.path, element: <CatalogPage /> },
      { path: paths.resourceDetails.path, element: <ResourceDetailsPage /> },
      { path: paths.about.path, element: <AboutPage /> },
    ],
  },
])