import { type FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';

import { env } from '@/config/env';

import { Steps } from '../steps';
import { mutationConfig } from './api';
import { AdditionalData } from './components/additional-data';
import { ADDITIONAL_DATA_STORAGE_KEY } from './components/additional-data/constants';
import { PackageScan } from './components/package-scan';
import { SCANNED_ITEMS_STORAGE_KEY } from './components/package-scan/constants';
import type { PackageCode } from './components/package-scan/types';
import { PalletScan } from './components/pallet-scan';
import { SCANNED_PALLET_STORAGE_KEY } from './components/pallet-scan/constants';
import type { PalletCode } from './components/pallet-scan/types';
import { PharmacyOptions } from './components/pharmacy-options';
import {
  PHARMACY_OPTIONS,
  SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
  SELECTED_PHARMACY_STEP_STORAGE_KEY,
} from './components/pharmacy-options/constants';
import type {
  PharmacyProtocol,
  PharmacyStep,
} from './components/pharmacy-options/types';
import { Wrapper } from './styles';

export const Scan: FC = () => {
  const navigate = useNavigate();

  const [protocol, setProtocol] = useLocalStorage<PharmacyProtocol | null>(
    SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
    null
  );

  const [step, setStep] = useLocalStorage<PharmacyStep | null>(
    SELECTED_PHARMACY_STEP_STORAGE_KEY,
    null
  );

  const [scannedPallet, setScannedPallet] = useLocalStorage<PalletCode | null>(
    SCANNED_PALLET_STORAGE_KEY,
    null
  );

  const [scannedItems, setScannedItems] = useLocalStorage<PackageCode[]>(
    SCANNED_ITEMS_STORAGE_KEY,
    []
  );

  const [additionalData, setAdditionalData] = useLocalStorage<
    Record<string, unknown>
  >(ADDITIONAL_DATA_STORAGE_KEY, {});

  const selectedPharmacyStep = useMemo(() => {
    const selectedPharmacyOption = PHARMACY_OPTIONS.find(
      (p) => p.protocol === protocol
    );

    if (!selectedPharmacyOption) {
      return null;
    }

    return selectedPharmacyOption.steps.find((p) => p.step === step) ?? null;
  }, [protocol, step]);

  const steps = useMemo(
    () => [
      {
        title: 'choose protocol and step',
        content: <PharmacyOptions />,
        nextStepAllowed: !!protocol && !!step,
      },
      {
        title: 'scan used pallet',
        content: <PalletScan />,
        nextStepAllowed: !!protocol && !!step,
      },
      {
        title: 'scan a qr code',
        content: <PackageScan />,
        nextStepAllowed: !!protocol && !!step && !!scannedItems.length,
      },
      {
        title: 'enter additional data',
        content: (
          <AdditionalData fields={selectedPharmacyStep?.additionalData ?? []} />
        ),
      },
    ],
    [protocol, step, selectedPharmacyStep]
  );

  const data = useMemo(
    () => ({
      cmoId: env.cmoId,
      protocolType: protocol,
      stepNumber: step,
      packageCodes: scannedItems,
      palletCode: scannedPallet,
      additionalData: additionalData,
    }),
    [protocol, step, scannedPallet, scannedItems, additionalData]
  );

  const clearForm = () => {
    setProtocol(null);
    setStep(null);
    setScannedPallet(null);
    setScannedItems([]);
    setAdditionalData({});
  };

  const { mutate } = useMutation(mutationConfig(data, clearForm));

  const submitActionAllowed = useMemo(
    () => !!protocol && !!step && !!scannedPallet && !!scannedItems.length,
    [protocol, step, scannedPallet, scannedItems]
  );

  const submitAction = {
    label: 'Send data',
    actionAllowed: submitActionAllowed,
    confirm: true,
    confirmText: 'This action will send all entered data to blockchain',
    proceed: mutate,
  };

  const cancelActionAllowed = useMemo(
    () => !!protocol || !!step || !!scannedPallet || !!scannedItems.length,
    [protocol, step, scannedPallet, scannedItems]
  );

  const cancelAction = {
    label: 'Cancel Scan',
    actionAllowed: cancelActionAllowed,
    confirm: true,
    confirmText: 'This action will remove all scanned items',
    proceed: () => {
      clearForm();

      navigate('/');
    },
  };

  return (
    <Wrapper>
      <Steps
        name="pharmacy-scan"
        title="Scan"
        steps={steps}
        submitAction={submitAction}
        cancelAction={cancelAction}
      />
    </Wrapper>
  );
};
