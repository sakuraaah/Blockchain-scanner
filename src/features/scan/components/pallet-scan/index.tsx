import type { FC } from 'react';

import { useLocalStorage } from '@uidotdev/usehooks';

import { QrScan } from '../qr-scan';
import type { QrScanResult } from '../qr-scan/types';
import { ScannedItem } from '../scanned-item';
import { SCANNED_PALLET_STORAGE_KEY } from './constants';
import { Content } from './styles';
import { type PalletCode, palletCodeSchema } from './types';

export const PalletScan: FC = () => {
  const [scannedPallet, setScannedPallet] = useLocalStorage<PalletCode | null>(
    SCANNED_PALLET_STORAGE_KEY,
    null
  );

  const handleScanResult = (result: QrScanResult<PalletCode>) => {
    if (!result.parsed) {
      return;
    }

    setScannedPallet(result.parsed);
  };

  return (
    <>
      <QrScan<PalletCode>
        disabled={!!scannedPallet}
        schema={palletCodeSchema}
        onScan={handleScanResult}
      />

      <Content>
        {scannedPallet && (
          <ScannedItem<PalletCode>
            key={scannedPallet}
            value={scannedPallet}
            onClear={() => setScannedPallet(null)}
          />
        )}
      </Content>
    </>
  );
};
