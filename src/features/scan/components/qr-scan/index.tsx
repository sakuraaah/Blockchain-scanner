import { useRef, useState } from 'react';

import { Button, message } from 'antd';

import { Scanner } from '@yudiel/react-qr-scanner';
import type { IDetectedBarcode } from '@yudiel/react-qr-scanner';

import { decodeQrWithSchema } from './helpers';
import { Hint, ScannerBox, ScannerRow } from './styles';
import type { QrScanProps } from './types';

export const QrScan = <T extends unknown>({
  disabled,
  schema,
  onScan,
}: QrScanProps<T>) => {
  const [open, setOpen] = useState(false);

  const lastRawRef = useRef<string | null>(null);
  const lastAtRef = useRef<number>(0);

  const dedupeMs = 1200;

  const handleScan = (codes: IDetectedBarcode[]) => {
    if (!codes.length) return;

    const rawText = codes[0].rawValue ?? '';
    const now = Date.now();

    //dedupe same code firing repeatedly
    if (lastRawRef.current === rawText && now - lastAtRef.current < dedupeMs) {
      return;
    }

    lastRawRef.current = rawText;
    lastAtRef.current = now;

    const result = decodeQrWithSchema<T>(rawText, schema);

    if (result.error) {
      message.error(result.error);
      setOpen(false);
      return;
    }

    onScan(result);
  };

  return (
    <div>
      <ScannerRow>
        <Button
          type="primary"
          onClick={() => {
            lastRawRef.current = null;
            lastAtRef.current = 0;
            setOpen(true);
          }}
          disabled={disabled || open}
        >
          Scan
        </Button>

        <Button onClick={() => setOpen(false)} disabled={disabled || !open}>
          Stop
        </Button>
      </ScannerRow>

      {open && !disabled && (
        <ScannerBox>
          <Scanner
            onScan={handleScan}
            onError={(err) => {
              const msg = err instanceof Error ? err.message : String(err);
              message.error(msg);
            }}
            constraints={{ facingMode: 'environment' }}
          />
        </ScannerBox>
      )}

      <Hint>tip: qr must match expected format</Hint>
    </div>
  );
};
