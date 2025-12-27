import { type FC, useMemo } from 'react';

import { Button, Modal, message } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import { AppCard } from '@/ui/app-card';

import { PharmacyOptions } from './components/pharmacy-options';
import {
  SELECTED_PHARMACY_OPTIONS_CONFIRMED_STORAGE_KEY,
  SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
  SELECTED_PHARMACY_STEP_STORAGE_KEY,
} from './components/pharmacy-options/constants';
import type {
  PharmacyProtocol,
  PharmacyStep,
} from './components/pharmacy-options/types';
import { QrScan } from './components/qr-scan';
import type { QrScanResult } from './components/qr-scan/types';
import { ScannedItem } from './components/scanned-item';
import { SCANNED_ITEMS_STORAGE_KEY } from './components/scanned-item/constants';
import { Content, Wrapper } from './styles';
import { type PackageCode, packageCodeSchema } from './types';

const { confirm } = Modal;

export const Scan: FC = () => {
  const [protocol, setProtocol] = useLocalStorage<PharmacyProtocol | null>(
    SELECTED_PHARMACY_PROTOCOL_STORAGE_KEY,
    null
  );

  const [step, setStep] = useLocalStorage<PharmacyStep | null>(
    SELECTED_PHARMACY_STEP_STORAGE_KEY,
    null
  );

  const [pharmacyOptionsConfirmed, setPharmacyOptionsConfirmed] =
    useLocalStorage<boolean>(
      SELECTED_PHARMACY_OPTIONS_CONFIRMED_STORAGE_KEY,
      false
    );

  const scanEnabled = useMemo(
    () => !!protocol && !!step && pharmacyOptionsConfirmed,
    [protocol, step, pharmacyOptionsConfirmed]
  );

  const [scannedItems, setScannedItems] = useLocalStorage<PackageCode[]>(
    SCANNED_ITEMS_STORAGE_KEY,
    []
  );

  const handleScanResult = (result: QrScanResult<PackageCode>) => {
    if (!result.parsed) {
      return;
    }

    const existingItem = scannedItems.find((item) => item === result.parsed);

    if (existingItem) {
      message.info('Item is already added');
      return;
    }

    const newScannedItems = [...scannedItems, result.parsed];
    setScannedItems(newScannedItems);
  };

  const warnCancelScan = () => {
    confirm({
      title: 'Are you sure?',
      content: 'This action will remove all scanned items',
      okText: 'Cancel scan',
      cancelText: 'Go back',
      okType: 'danger',
      onOk: cancelScan,
    });
  };

  const cancelScan = () => {
    setScannedItems([]);
    setProtocol(null);
    setStep(null);
    setPharmacyOptionsConfirmed(false);
  };

  return (
    <Wrapper>
      <AppCard title="Scan" subtitle="scan a qr code">
        {!scanEnabled ? (
          <PharmacyOptions />
        ) : (
          <>
            <QrScan<PackageCode>
              schema={packageCodeSchema}
              onScan={handleScanResult}
            />

            <Content>
              {scannedItems.map((code) => (
                <ScannedItem<PackageCode>
                  key={code}
                  value={code}
                  onClear={() =>
                    setScannedItems((items) => items.filter((x) => x !== code))
                  }
                />
              ))}
            </Content>

            <Button type={'primary'} danger onClick={warnCancelScan}>
              Cancel Scan
            </Button>
          </>
        )}
      </AppCard>
    </Wrapper>
  );
};
