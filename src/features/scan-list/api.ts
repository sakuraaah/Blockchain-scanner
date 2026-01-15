import { message } from 'antd';

import type { UseQueryOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/api/axios';

import {
  type ScanListItem,
  scanListRequestSchema,
  scanListResponseSchema,
} from './types';

export const getQueryConfig = (
  requestData: unknown
): UseQueryOptions<ScanListItem[]> => ({
  queryKey: ['protocol', 'list', requestData],
  queryFn: () => getScanList(requestData),
});

const getScanList = async (requestData: unknown) => {
  const parsedRequestData = scanListRequestSchema.safeParse(requestData);

  if (!parsedRequestData.success) {
    const error = new z.ZodError(parsedRequestData.error.issues);

    console.error(error);
    message.error('Incorrect request body');

    throw error;
  }

  const response = await api.get<unknown>('/protocol/list', {
    params: parsedRequestData.data,
  });

  const parsedResponse = scanListResponseSchema.safeParse(response.data);

  if (!parsedResponse.success) {
    const error = new z.ZodError(parsedResponse.error.issues);

    console.error(error);
    message.error('Incorrect response body');

    throw error;
  }

  return parsedResponse.data;
};
