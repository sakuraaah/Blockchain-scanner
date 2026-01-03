import { z } from 'zod';

export const packageCodeSchema = z.string().uuid();

export type PackageCode = z.infer<typeof packageCodeSchema>;
