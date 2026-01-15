import type { TableColumnsType } from 'antd';

import dayjs from 'dayjs';

import { PHARMACY_STEP_MAP } from '@/features/scan/components/pharmacy-options/constants';
import type { PharmacyStepType } from '@/features/scan/components/pharmacy-options/types';

import type { PackageType, StepType } from './types';

export const PACKAGE_COLUMNS: TableColumnsType<PackageType> = [
  {
    title: 'Package code',
    dataIndex: 'packageCode',
    width: 200,
    fixed: 'start',
  },
];

export const STEP_COLUMNS: TableColumnsType<StepType> = [
  {
    title: 'Step',
    dataIndex: 'stepNumber',
    render: (stepNumber: PharmacyStepType) => PHARMACY_STEP_MAP[stepNumber],
  },
  {
    title: 'Time',
    dataIndex: 'timestamp',
    render: (v: Date) => dayjs(v).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: 'Additional data',
    dataIndex: 'additionalData',
  },
];
