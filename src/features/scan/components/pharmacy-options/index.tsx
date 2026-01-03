import { useMemo } from 'react';
import type { FC } from 'react';

import { Select } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import {
  PHARMACY_OPTIONS,
  SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
  SELECTED_PHARMACY_STEP_STORAGE_KEY,
} from './constants';
import { Field, Label } from './styles';
import type { PharmacyProtocol, PharmacyStep } from './types';

export const PharmacyOptions: FC = () => {
  const [protocol, setProtocol] = useLocalStorage<PharmacyProtocol | null>(
    SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
    null
  );

  const [step, setStep] = useLocalStorage<PharmacyStep | null>(
    SELECTED_PHARMACY_STEP_STORAGE_KEY,
    null
  );

  const protocolOptions = useMemo(
    () => PHARMACY_OPTIONS.map((p) => ({ value: p.protocol, label: p.label })),
    []
  );

  const stepOptions = useMemo(() => {
    const availableStepOptions =
      PHARMACY_OPTIONS.find((p) => p.protocol === protocol)?.steps ?? [];

    if (!availableStepOptions.find((s) => s.step === step)) {
      setStep(null);
    }

    return availableStepOptions.map((s) => ({
      value: s.step,
      label: s.label,
    }));
  }, [protocol]);

  return (
    <>
      <Field>
        <Label>Protocol type</Label>
        <Select
          allowClear
          value={protocol}
          options={protocolOptions}
          onChange={(p) => setProtocol(p)}
        />
      </Field>

      <Field>
        <Label>Step type</Label>
        <Select
          allowClear
          value={step}
          options={stepOptions}
          onChange={(s) => setStep(s)}
        />
      </Field>
    </>
  );
};
