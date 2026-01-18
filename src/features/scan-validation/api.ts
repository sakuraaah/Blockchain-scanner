import { message } from 'antd';

import { z } from 'zod';

import { api } from '@/api/axios';
import { HandledError } from '@/api/handled-error';

import { getJsonSafe } from './helpers';
import { scanValidationRequestSchema } from './types';

export const getMutationConfig = (data: unknown) => ({
  mutationFn: () => validateScan(data),
  onSuccess: () => {
    message.success('Data was validated');
  },
});

const validateScan = (requestData: unknown) => {
  const jsonData = getJsonSafe(requestData);

  if (!jsonData.success) {
    console.error(jsonData.error);
    message.error('Incorrect JSON format');

    throw new HandledError('Incorrect JSON format', jsonData.error);
  }

  const parsedRequestData = scanValidationRequestSchema.safeParse(
    jsonData.data
  );

  if (!parsedRequestData.success) {
    const error = new z.ZodError(parsedRequestData.error.issues);

    console.error(error);
    message.error('Incorrect request body');

    throw new HandledError('Incorrect request body', error);
  }

  return api.post('/dataValidation/validate', parsedRequestData.data);
};
