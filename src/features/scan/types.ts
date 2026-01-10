import { z } from 'zod';

import { packageCodeSchema } from './components/package-scan/types';
import { palletCodeSchema } from './components/pallet-scan/types';

export const payloadSchema = z.object({
  cmoId: z.string().uuid(),
  protocolType: z.number().int(),
  stepNumber: z.number().int(),
  packageCodes: z.array(packageCodeSchema),
  palletCode: palletCodeSchema.optional(),
  additionalData: z.string().optional(),
});

export type Payload = z.infer<typeof payloadSchema>;
