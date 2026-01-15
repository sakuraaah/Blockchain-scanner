import { z } from 'zod';

import type { FieldConfig } from '@/features/form/types';

import { PharmacyProtocol, PharmacyStep } from './constants';

export const pharmacyProtocolSchema = z.union([
  z.literal(PharmacyProtocol.Doxazosin),
  z.literal(PharmacyProtocol.Irbesartan),
]);

export type PharmacyProtocolType = z.infer<typeof pharmacyProtocolSchema>;

export const pharmacyStepSchema = z.union([
  z.literal(PharmacyStep.QCTesting),
  z.literal(PharmacyStep.Assay),
  z.literal(PharmacyStep.RelatedSubstances),
  z.literal(PharmacyStep.Dissolution),
]);

export type PharmacyStepType = z.infer<typeof pharmacyStepSchema>;

export type PharmacyStepListItem = {
  step: PharmacyStepType;
  label: string;
  additionalData: FieldConfig[];
};

export type PharmacyProtocolListItem = {
  protocol: PharmacyProtocolType;
  label: string;
  steps: PharmacyStepListItem[];
};
