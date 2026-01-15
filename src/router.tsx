import { createBrowserRouter } from 'react-router-dom';

import { LayoutPage } from '@/pages/layout';
import { ScanDataPage } from '@/pages/layout/data';
import { MainMenuPage } from '@/pages/layout/main-menu';
import { NotFoundPage } from '@/pages/layout/not-found';
import { ScanPage } from '@/pages/layout/scan';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <MainMenuPage />,
      },
      {
        path: 'scan',
        element: <ScanPage />,
      },
      {
        path: 'data',
        element: <ScanDataPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
