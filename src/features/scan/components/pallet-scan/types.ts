import { z } from 'zod';

export const palletCodeSchema = z.string().uuid();

export type PalletCode = z.infer<typeof palletCodeSchema>;
