import { z } from 'zod';

import {
  pharmacyProtocolSchema,
  pharmacyStepSchema,
} from '@/features/scan/components/pharmacy-options/types';

import { packageCodeSchema } from './components/package-scan/types';
import { palletCodeSchema } from './components/pallet-scan/types';

export const payloadSchema = z.object({
  cmoId: z.string().uuid(),
  protocolType: pharmacyProtocolSchema,
  stepNumber: pharmacyStepSchema,
  packageCodes: z.array(packageCodeSchema),
  palletCode: palletCodeSchema.optional(),
  additionalData: z.string().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;
