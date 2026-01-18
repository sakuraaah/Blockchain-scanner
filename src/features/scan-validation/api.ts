import { message } from 'antd';

import { z } from 'zod';

import { api } from '@/api/axios';
import { HandledError } from '@/api/handled-error';

import { getJsonSafe } from './helpers';
import {
  scanValidationRequestSchema,
  scanValidationResponseSchema,
} from './types';

export const getMutationConfig = (data: unknown) => ({
  mutationFn: () => validateScan(data),
});

const validateScan = async (requestData: unknown) => {
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

  const response = await api.post(
    '/dataValidation/validate',
    parsedRequestData.data
  );

  const parsedResponse = scanValidationResponseSchema.safeParse(response.data);

  if (!parsedResponse.success) {
    const error = new z.ZodError(parsedResponse.error.issues);

    console.error(error);
    message.error('Incorrect response body');

    throw new HandledError('Incorrect response body', error);
  }

  return parsedResponse.data;
};
