import { message } from 'antd';

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

import { isHandledError } from './handled-error';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.skipGlobalError) {
        return;
      }

      if (isHandledError(error)) {
        return;
      }

      message.error(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalError) {
        return;
      }

      if (isHandledError(error)) {
        return;
      }

      message.error(getErrorMessage(error));
    },
  }),
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'request failed';
}
