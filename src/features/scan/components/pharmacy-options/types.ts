export const PharmacyProtocol = {
  FirstPharmacyProtocol: 'firstPharmacyProtocol',
  SecondPharmacyProtocol: 'secondPharmacyProtocol',
} as const;

export type PharmacyProtocol =
  (typeof PharmacyProtocol)[keyof typeof PharmacyProtocol];

export const PharmacyStep = {
  FirstPharmacyStep: 'firstPharmacyStep',
  SecondPharmacyStep: 'secondPharmacyStep',
  ThirdPharmacyStep: 'thirdPharmacyStep',
} as const;

export type PharmacyStep = (typeof PharmacyStep)[keyof typeof PharmacyStep];

export type PharmacyStepListItem = {
  step: PharmacyStep;
  label: string;
};

export type PharmacyProtocolListItem = {
  protocol: PharmacyProtocol;
  label: string;
  steps: PharmacyStepListItem[];
};
