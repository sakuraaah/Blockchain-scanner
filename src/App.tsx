import { RouterProvider } from 'react-router-dom';

import { ConfigProvider } from 'antd';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/api/queryClient';
import { router } from '@/router';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
