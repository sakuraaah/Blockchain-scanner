import { message } from 'antd';

import type { ScanDetails } from './types';

export const copyToClipboard = (data: ScanDetails) => {
  console.log(data);
  message.success('Successfuly copied to clipboard.');
};
