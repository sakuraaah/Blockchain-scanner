import type { FC } from 'react';

import { message } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import { AppCard } from '@/ui/app-card';

import { QrScan } from './components/qr-scan';
import type { QrScanResult } from './components/qr-scan/types';
import { ScannedItem } from './components/scanned-item';
import { SCANNED_ITEMS_STORAGE_KEY } from './components/scanned-item/constants';
import { Content, Wrapper } from './styles';
import { type PackageCode, packageCodeSchema } from './types';

export const Scan: FC = () => {
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

  return (
    <Wrapper>
      <AppCard title="Scan" subtitle="scan a qr code">
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
      </AppCard>
    </Wrapper>
  );
};
