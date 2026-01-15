import type { UseQueryOptions } from '@tanstack/react-query';

import { api } from '@/api/axios';

import {
  type ScanListItem,
  scanListRequestSchema,
  scanListResponseSchema,
} from './types';

export const getQueryConfig = (
  requestData: unknown
): UseQueryOptions<ScanListItem[]> => ({
  queryKey: ['scan', requestData],
  queryFn: () => getScanList(requestData),
});

const getScanList = async (requestData: unknown) => {
  const params = scanListRequestSchema.parse(requestData);
  const response = await api.get<unknown>('/protocol/list', { params });

  return scanListResponseSchema.parse(response.data);
};
