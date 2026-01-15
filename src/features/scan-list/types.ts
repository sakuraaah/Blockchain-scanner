import { z } from 'zod';

export const scanListRequestSchema = z.object({
  Top: z.number().int(),
  Skip: z.number().int(),
  cmoId: z.string().uuid().optional(),
  ProtocolType: z.number().int().optional(),
  PalletCode: z.string().uuid().optional(),
  PackageCode: z.string().uuid().optional(),
});

export type ScanListRequestParams = z.infer<typeof scanListRequestSchema>;

const scanListItemSchema = z.object({
  cmoId: z.string().uuid(),
  cmoName: z.string(),
  protocolType: z.number().int(),
  stepsSubmitted: z.number().int(),
  possibleProtocolSteps: z.number().int(),
  packageCodes: z.array(z.string().uuid()),
  palletCode: z.string().uuid().optional(),
});

export type ScanListItem = z.infer<typeof scanListItemSchema>;

export const scanListResponseSchema = z.array(scanListItemSchema);
