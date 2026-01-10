import type { FieldConfig } from '@/features/form/types';

export const PharmacyProtocol = {
  Doxazosin: 'Doxazosin / Hydrochlorothiazide tablets batch analysis',
  Irbesartan: 'Irbesartan 150 mg tablets batch analysis',
} as const;

export type PharmacyProtocol =
  (typeof PharmacyProtocol)[keyof typeof PharmacyProtocol];

export const PharmacyStep = {
  QCTesting: 'Quality control testing',
  Assay: 'Assay',
  RelatedSubstances: 'Related Substances',
  Dissolution: 'Dissolution',
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
