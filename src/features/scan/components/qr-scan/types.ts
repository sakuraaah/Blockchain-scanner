import type { z } from 'zod';

export type QrScanResult<T = unknown> = {
  rawText: string;
  parsed: T | null;
  error: string | null;
};

export type QrScanProps<T = unknown> = {
  schema: z.ZodType<T>;
  onScan: (result: QrScanResult<T>) => void;
};
