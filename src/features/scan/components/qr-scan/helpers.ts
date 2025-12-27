import type { z } from 'zod';

import type { QrScanResult } from './types';

const tryParseJson = (
  text: string
): { ok: true; value: unknown } | { ok: false } => {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false };
  }
};

export const decodeQrWithSchema = <T>(
  rawText: string,
  schema: z.ZodType<T>
): QrScanResult<T> => {
  // first try raw text (for uuid/guid and other plain strings)
  const rawResult = schema.safeParse(rawText);
  if (rawResult.success) {
    return { rawText, parsed: rawResult.data, error: null };
  }

  // then try JSON (for objects/arrays/etc.)
  const parsedJson = tryParseJson(rawText);
  if (!parsedJson.ok) {
    return {
      rawText,
      parsed: null,
      error: rawResult.error.issues[0]?.message ?? 'invalid payload',
    };
  }

  const jsonResult = schema.safeParse(parsedJson.value);
  if (jsonResult.success) {
    return { rawText, parsed: jsonResult.data, error: null };
  }

  return {
    rawText,
    parsed: null,
    error: jsonResult.error.issues[0]?.message ?? 'invalid payload',
  };
};
