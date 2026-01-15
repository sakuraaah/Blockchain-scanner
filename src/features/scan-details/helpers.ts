import { message } from 'antd';

import type { ScanDetails } from './types';

export const copyToClipboard = async (data: ScanDetails) => {
  const {
    cmoId: _cmoId,
    cmoName: _cmoName,
    palletCode: _palletCode,
    possibleProtocolSteps: _possibleProtocolSteps,
    ...validateData
  } = data;

  const text = JSON.stringify(validateData, null, 2);

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    message.success('Successfuly copied to clipboard');

    return;
  }

  // fallback
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  ta.style.top = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();

  const ok = document.execCommand('copy');
  document.body.removeChild(ta);

  if (!ok) {
    message.error('Copy failed!');

    throw new Error('copy failed');
  }

  message.success('Successfuly copied to clipboard');
};
