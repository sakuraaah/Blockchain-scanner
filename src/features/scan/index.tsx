import { type FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@uidotdev/usehooks';

import { Steps } from '../steps';
import { PackageScan } from './components/package-scan';
import { SCANNED_ITEMS_STORAGE_KEY } from './components/package-scan/constants';
import type { PackageCode } from './components/package-scan/types';
import { PalletScan } from './components/pallet-scan';
import { SCANNED_PALLET_STORAGE_KEY } from './components/pallet-scan/constants';
import type { PalletCode } from './components/pallet-scan/types';
import { PharmacyOptions } from './components/pharmacy-options';
import {
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
      },
    ],
    [protocol, step]
  );

  const submitAction = {
    label: 'Send data',
    actionAllowed:
      !!protocol && !!step && !!scannedPallet && !!scannedItems.length,
    confirm: true,
    confirmText: 'This action will send all entered data to blockchain',
    proceed: () => {
      alert(123);
    },
  };

  const cancelAction = {
    label: 'Cancel Scan',
    actionAllowed:
      !!protocol || !!step || !!scannedPallet || !!scannedItems.length,
    confirm: true,
    confirmText: 'This action will remove all scanned items',
    proceed: () => {
      setScannedItems([]);
      setProtocol(null);
      setStep(null);
      setScannedPallet(null);

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
