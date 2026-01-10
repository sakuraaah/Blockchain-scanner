import { z } from 'zod';

import { packageCodeSchema } from './components/package-scan/types';
import { palletCodeSchema } from './components/pallet-scan/types';
import { type Payload, payloadSchema } from './types';

const rawSchema = z.object({
  cmoId: z.string().uuid(),
  protocolType: z.number().int(),
  stepNumber: z.number().int(),
  packageCodes: z.array(packageCodeSchema),
  palletCode: palletCodeSchema.optional(),
  additionalData: z.record(z.string(), z.unknown()).optional(),
});

export const mapToPayloadSchema = rawSchema
  .transform((raw) => {
    const out: Payload = {
      cmoId: raw.cmoId,
      protocolType: raw.protocolType,
      stepNumber: raw.stepNumber,
      packageCodes: raw.packageCodes,
    };

    if (raw.palletCode !== undefined) out.palletCode = raw.palletCode;
    if (raw.additionalData !== undefined) {
      out.additionalData = JSON.stringify(raw.additionalData);
    }

    return out;
  })
  .pipe(payloadSchema);

export const mapToPayload = (input: unknown): Payload => {
  return mapToPayloadSchema.parse(input);
};
