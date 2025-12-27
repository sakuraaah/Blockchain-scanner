import {
  PharmacyProtocol,
  type PharmacyProtocolListItem,
  PharmacyStep,
} from './types';

export const PHARMACY_OPTIONS: PharmacyProtocolListItem[] = [
  {
    protocol: PharmacyProtocol.FirstPharmacyProtocol,
    label: 'First pharmacy protocol',
    steps: [
      { step: PharmacyStep.FirstPharmacyStep, label: 'First pharmacy step' },
      { step: PharmacyStep.SecondPharmacyStep, label: 'Second pharmacy step' },
    ],
  },
  {
    protocol: PharmacyProtocol.SecondPharmacyProtocol,
    label: 'Second pharmacy protocol',
    steps: [
      { step: PharmacyStep.ThirdPharmacyStep, label: 'Third pharmacy step' },
    ],
  },
];

export const SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY =
  'selected-pharmacy-protocol';
export const SELECTED_PHARMACY_STEP_STORAGE_KEY = 'selected-pharmacy-step';
export const SELECTED_PHARMACY_OPTIONS_CONFIRMED_STORAGE_KEY =
  'selected-pharmacy-options-confirmed';
