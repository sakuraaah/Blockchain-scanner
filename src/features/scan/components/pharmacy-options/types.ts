import type { FieldConfig } from '@/features/form/types';

export const PharmacyProtocol = {
  Doxazosin: 1,
  Irbesartan: 2,
} as const;

export type PharmacyProtocol =
  (typeof PharmacyProtocol)[keyof typeof PharmacyProtocol];

export const PharmacyStep = {
  QCTesting: 1,
  Assay: 2,
  RelatedSubstances: 3,
  Dissolution: 4,
} as const;

export type PharmacyStep = (typeof PharmacyStep)[keyof typeof PharmacyStep];

export type PharmacyStepListItem = {
  step: PharmacyStep;
  label: string;
  additionalData: FieldConfig[];
};

export type PharmacyProtocolListItem = {
  protocol: PharmacyProtocol;
  label: string;
  steps: PharmacyStepListItem[];
};
