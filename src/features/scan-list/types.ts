import { z } from 'zod';

import { packageCodeSchema } from '@/features/scan/components/package-scan/types';
import { palletCodeSchema } from '@/features/scan/components/pallet-scan/types';
import { pharmacyProtocolSchema } from '@/features/scan/components/pharmacy-options/types';

export const scanListRequestSchema = z.object({
  Top: z.number().int(),
  Skip: z.number().int(),
  cmoId: z.string().uuid().optional(),
  ProtocolType: pharmacyProtocolSchema.optional(),
  PalletCode: palletCodeSchema.optional(),
  PackageCode: packageCodeSchema.optional(),
});

export type ScanListRequestParams = z.infer<typeof scanListRequestSchema>;

const scanListItemSchema = z.object({
  cmoId: z.string().uuid(),
  cmoName: z.string(),
  protocolType: pharmacyProtocolSchema,
  stepsSubmitted: z.number().int(),
  possibleProtocolSteps: z.number().int(),
  packageCodes: z.array(packageCodeSchema),
  palletCode: palletCodeSchema,
});

export type ScanListItem = z.infer<typeof scanListItemSchema>;

export const scanListResponseSchema = z.array(scanListItemSchema);
