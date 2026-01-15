import { z } from 'zod';

import { packageCodeSchema } from '@/features/scan/components/package-scan/types';
import { palletCodeSchema } from '@/features/scan/components/pallet-scan/types';
import {
  pharmacyProtocolSchema,
  pharmacyStepSchema,
} from '@/features/scan/components/pharmacy-options/types';

export const scanDetailsRequestSchema = z.object({
  ProtocolType: z.number().int(),
  PalletCode: z.string().uuid(),
});

export type ScanDetailsRequest = z.infer<typeof scanDetailsRequestSchema>;

const stepSchema = z.object({
  timestamp: z.coerce.date(),
  stepNumber: pharmacyStepSchema,
  additionalData: z.string().optional(),
});

export type StepType = z.infer<typeof stepSchema>;

const packageSchema = z.object({
  packageCode: packageCodeSchema,
  steps: z.array(stepSchema),
});

export type PackageType = z.infer<typeof packageSchema>;

export const scanDetailsResponseSchema = z.object({
  cmoId: z.string().uuid(),
  cmoName: z.string(),
  protocolType: pharmacyProtocolSchema,
  palletCode: palletCodeSchema,
  possibleProtocolSteps: z.number().int(),
  packages: z.array(packageSchema),
});

export type ScanDetails = z.infer<typeof scanDetailsResponseSchema>;
