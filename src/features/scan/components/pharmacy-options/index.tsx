import { useMemo } from 'react';
import type { FC } from 'react';

import { Select } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import {
  PHARMACY_OPTIONS,
  SELECTED_PHARMACY_OPTIONS_CONFIRMED_STORAGE_KEY,
  SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
  SELECTED_PHARMACY_STEP_STORAGE_KEY,
} from './constants';
import { Field, Label, Row } from './styles';
import type { PolicySelectorProps, ProtocolType, StepType } from './types';

export const PolicySelector: FC<PolicySelectorProps> = ({ onChange }) => {
  const [protocol, setProtocol] = useLocalStorage<ProtocolType>(
    SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
    null
  );

  const [step, setStep] = useLocalStorage<StepType>(
    SELECTED_PHARMACY_STEP_STORAGE_KEY,
    null
  );

  const protocolOptions = useMemo(
    () => PHARMACY_OPTIONS.map((p) => ({ value: p.protocol, label: p.label })),
    []
  );

  const stepOptions = useMemo(
    () => currentPolicy.steps.map((s) => ({ value: s.step, label: s.label })),
    [currentPolicy]
  );

  const safeStep = useMemo(() => {
    const exists = currentPolicy.steps.some((s) => s.step === step);
    return exists ? step : (currentPolicy.steps[0]?.step ?? defaultStep);
  }, [currentPolicy, step, defaultStep]);

  // keep localStorage consistent if protocol changed and step no longer valid
  if (safeStep !== step) {
    setStep(safeStep);
  }

  return (
    <Row>
      <Field>
        <Label>protocol type</Label>
        <Select
          value={protocol}
          options={protocolOptions}
          onChange={(next: ProtocolType) => {
            setProtocol(next);

            const nextPolicy =
              PROTOCOL_POLICIES.find((p) => p.protocol === next) ??
              PROTOCOL_POLICIES[0];

            const nextStep = nextPolicy.steps[0]?.step ?? defaultStep;
            setStep(nextStep);

            onChange?.({ protocol: next, step: nextStep });
          }}
        />
      </Field>

      <Field>
        <Label>step type</Label>
        <Select
          value={safeStep}
          options={stepOptions}
          onChange={(next: StepType) => {
            setStep(next);
            onChange?.({ protocol, step: next });
          }}
        />
      </Field>
    </Row>
  );
};
