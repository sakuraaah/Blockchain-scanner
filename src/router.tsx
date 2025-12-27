import { createBrowserRouter } from 'react-router-dom';

import { LayoutPage } from '@/pages/layout';
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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
