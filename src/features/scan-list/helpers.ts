import type { ScanListItem } from './types';

export const getRowKey = (r: ScanListItem) =>
  `${r.palletCode}-${r.protocolType}`;

export const mergeUnique = (prev: ScanListItem[], next: ScanListItem[]) => {
  const map = new Map<string, ScanListItem>();

  prev.forEach((x) => map.set(getRowKey(x), x));
  next.forEach((x) => map.set(getRowKey(x), x));

  return Array.from(map.values());
};
