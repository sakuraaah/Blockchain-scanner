import { z } from 'zod';

import { packageCodeSchema } from './components/package-scan/types';
import { palletCodeSchema } from './components/pallet-scan/types';
import {
  pharmacyProtocolSchema,
  pharmacyStepSchema,
} from './components/pharmacy-options/types';
import { type ScanSubmitRequest, scanSubmitRequestSchema } from './types';

const rawSchema = z.object({
  cmoId: z.string().uuid(),
  protocolType: pharmacyProtocolSchema,
  stepNumber: pharmacyStepSchema,
  packageCodes: z.array(packageCodeSchema),
  palletCode: palletCodeSchema.optional(),
  additionalData: z.record(z.string(), z.unknown()).optional(),
});

export const mapToPayloadSchema = rawSchema
  .transform((raw) => {
    const out: ScanSubmitRequest = {
      cmoId: raw.cmoId,
      protocolType: raw.protocolType,
      stepNumber: raw.stepNumber,
      packageCodes: raw.packageCodes,
    };

    if (raw.palletCode !== undefined) {
      out.palletCode = raw.palletCode;
    }

    if (raw.additionalData !== undefined) {
      out.additionalData = JSON.stringify(raw.additionalData);
    }

    return out;
  })
  .pipe(scanSubmitRequestSchema);
