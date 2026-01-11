import { message } from 'antd';

import { api } from '@/api/axios';

import { mapToPayload } from './helpers';

export const mutationConfig = (data: unknown, clearForm: () => void) => ({
  mutationFn: () => stepSumit(data),
  onSuccess: () => {
    message.success('Pharmacy step data was saved successfully');
    clearForm();
  },
});

const stepSumit = (data: unknown) => {
  const parsedData = mapToPayload(data);

  return api.post('/protocol/stepSubmit', parsedData);
};
