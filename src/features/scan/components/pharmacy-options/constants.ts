import { FieldType } from '@/features/form/types';

import {
  PharmacyProtocol,
  type PharmacyProtocolListItem,
  PharmacyStep,
} from './types';

export const PHARMACY_OPTIONS: PharmacyProtocolListItem[] = [
  {
    protocol: PharmacyProtocol.Doxazosin,
    label: 'Doxazosin / Hydrochlorothiazide tablets batch analysis',
    steps: [
      {
        step: PharmacyStep.QCTesting,
        label: 'Quality control testing',
        additionalData: [],
      },
      {
        step: PharmacyStep.Assay,
        label: 'Assay',
        additionalData: [
          {
            type: FieldType.InputNumber,
            key: 'doxazosinPercent',
            name: 'doxazosinPercent',
            label: 'Doxazosin (%)',
            numberProps: { step: 0.1 },
          },
          {
            type: FieldType.InputNumber,
            key: 'hydrochlorothiazidePercent',
            name: 'hydrochlorothiazidePercent',
            label: 'Hydrochlorothiazide (%)',
            numberProps: { step: 0.1 },
          },
        ],
      },
      {
        step: PharmacyStep.RelatedSubstances,
        label: 'Related Substances',
        additionalData: [
          {
            type: FieldType.InputNumber,
            key: 'doxazosinTotal',
            name: 'doxazosinTotal',
            label: 'Doxazosin total',
            numberProps: { step: 0.01 },
          },
          {
            type: FieldType.InputNumber,
            key: 'hydrochlorothiazideTotal',
            name: 'hydrochlorothiazideTotal',
            label: 'Hydrochlorothiazide total',
            numberProps: { step: 0.01 },
          },
        ],
      },
      {
        step: PharmacyStep.Dissolution,
        label: 'Dissolution',
        additionalData: [
          {
            type: FieldType.List,
            key: 'timePointsMinutes',
            name: 'timePointsMinutes',
            label: 'Time point (minutes)',
            addText: 'add time point',
            fields: [
              {
                type: FieldType.InputNumber,
                key: 'minute',
                name: 'minute',
                label: 'Minutes',
                numberProps: { step: 1 },
              },
            ],
          },
          {
            type: FieldType.List,
            key: 'resultsPercent',
            name: 'resultsPercent',
            label: 'Result (%)',
            addText: 'add result',
            fields: [
              {
                type: FieldType.InputNumber,
                key: 'percent',
                name: 'percent',
                label: 'Percent',
                numberProps: { step: 1 },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    protocol: PharmacyProtocol.Irbesartan,
    label: 'Irbesartan 150 mg tablets batch analysis',
    steps: [
      {
        step: PharmacyStep.QCTesting,
        label: 'Quality control testing',
        additionalData: [],
      },
      {
        step: PharmacyStep.Assay,
        label: 'Assay',
        additionalData: [
          {
            type: FieldType.InputNumber,
            key: 'irbesartanPercent',
            name: 'irbesartanPercent',
            label: 'Irbesartan (%)',
            numberProps: { step: 0.1 },
          },
        ],
      },
      {
        step: PharmacyStep.RelatedSubstances,
        label: 'Related Substances',
        additionalData: [
          {
            type: FieldType.InputNumber,
            key: 'irbesartanSpecifiedMax',
            name: 'irbesartanSpecifiedMax',
            label: 'Irbesartan specified max',
            numberProps: { step: 0.01 },
          },
          {
            type: FieldType.InputNumber,
            key: 'irbesartanSingleMax',
            name: 'irbesartanSingleMax',
            label: 'Irbesartan single max',
            numberProps: { step: 0.01 },
          },
          {
            type: FieldType.InputNumber,
            key: 'irbesartanTotal',
            name: 'irbesartanTotal',
            label: 'Irbesartan total',
            numberProps: { step: 0.01 },
          },
        ],
      },
      {
        step: PharmacyStep.Dissolution,
        label: 'Dissolution',
        additionalData: [
          {
            type: FieldType.List,
            key: 'timePointsMinutes',
            name: 'timePointsMinutes',
            label: 'Time point (minutes)',
            addText: 'add time point',
            fields: [
              {
                type: FieldType.InputNumber,
                key: 'minute',
                name: 'minute',
                label: 'Minutes',
                numberProps: { step: 1 },
              },
            ],
          },
          {
            type: FieldType.List,
            key: 'resultsPercent',
            name: 'resultsPercent',
            label: 'Result (%)',
            addText: 'add result',
            fields: [
              {
                type: FieldType.InputNumber,
                key: 'percent',
                name: 'percent',
                label: 'Percent',
                numberProps: { step: 1 },
              },
            ],
          },
        ],
      },
    ],
  },
];

export const SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY =
  'selected-pharmacy-protocol';
export const SELECTED_PHARMACY_STEP_STORAGE_KEY = 'selected-pharmacy-step';
