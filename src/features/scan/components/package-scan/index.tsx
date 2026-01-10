import type { FC } from 'react';

import { message } from 'antd';

import { useLocalStorage } from '@uidotdev/usehooks';

import { QrScan } from '../qr-scan';
import type { QrScanResult } from '../qr-scan/types';
import { ScannedItem } from '../scanned-item';
import { SCANNED_ITEMS_STORAGE_KEY } from './constants';
import { Content } from './styles';
import { type PackageCode, packageCodeSchema } from './types';

export const PackageScan: FC = () => {
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
    </>
  );
};
