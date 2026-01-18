import { z } from 'zod';

import { scanDetailsResponseSchema } from '@/features/scan-details/types';
import { packageCodeSchema } from '@/features/scan/components/package-scan/types';
import { pharmacyStepSchema } from '@/features/scan/components/pharmacy-options/types';

export const scanValidationRequestSchema = scanDetailsResponseSchema.omit({
  cmoId: true,
  cmoName: true,
  palletCode: true,
  possibleProtocolSteps: true,
});

export type ScanValidationRequest = z.infer<typeof scanValidationRequestSchema>;

const invalidPackageSchema = z.object({
  packageCode: packageCodeSchema,
  stepNumber: z.array(pharmacyStepSchema),
});

export type InvalidPackage = z.infer<typeof invalidPackageSchema>;

export const scanValidationResponseSchema = z.object({
  isValid: z.boolean(),
  invalidPackages: z.array(invalidPackageSchema),
});

export interface InvalidPackageListProps {
  invalidPackages: InvalidPackage[];
}
