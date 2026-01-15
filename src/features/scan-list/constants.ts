import type { TableColumnsType } from 'antd';

import { PHARMACY_PROTOCOL_MAP } from '@/features/scan/components/pharmacy-options/constants';
import type { PharmacyProtocol } from '@/features/scan/components/pharmacy-options/types';

import type { ScanListItem } from './types';

export const SCAN_ITEMS_BATCH = 10;

export const SCAN_TABLE_COLUMNS: TableColumnsType<ScanListItem> = [
  {
    title: 'CMO',
    dataIndex: 'cmoName',
    width: 120,
    fixed: 'start',
  },
  {
    title: 'Protocol',
    dataIndex: 'protocolType',
    render: (protocolType: PharmacyProtocol) =>
      PHARMACY_PROTOCOL_MAP[protocolType],
  },
  {
    title: 'Steps submitted',
    dataIndex: 'stepsSubmitted',
  },
  {
    title: 'Possible protocol steps',
    dataIndex: 'possibleProtocolSteps',
  },
  {
    title: 'Pallet code',
    dataIndex: 'palletCode',
  },
];
