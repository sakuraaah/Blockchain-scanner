import { z } from 'zod';

import { scanDetailsResponseSchema } from '@/features/scan-details/types';

export const scanValidationRequestSchema = scanDetailsResponseSchema.omit({
  cmoId: true,
  cmoName: true,
  palletCode: true,
  possibleProtocolSteps: true,
});

export type ScanValidationRequest = z.infer<typeof scanValidationRequestSchema>;
