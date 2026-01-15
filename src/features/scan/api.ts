import { message } from 'antd';

import { z } from 'zod';

import { api } from '@/api/axios';

import { mapToPayloadSchema } from './helpers';

export const getMutationConfig = (data: unknown, clearForm: () => void) => ({
  mutationFn: () => stepSubmit(data),
  onSuccess: () => {
    message.success('Pharmacy step data was saved successfully');
    clearForm();
  },
});

const stepSubmit = (requestData: unknown) => {
  const parsedRequestData = mapToPayloadSchema.safeParse(requestData);

  if (!parsedRequestData.success) {
    const error = new z.ZodError(parsedRequestData.error.issues);

    console.error(error);
    message.error('Incorrect request body');

    throw error;
  }

  return api.post('/protocol/stepSubmit', parsedRequestData);
};
