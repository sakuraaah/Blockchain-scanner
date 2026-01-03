import { Modal } from 'antd';

import type { Action } from './types';

const { confirm } = Modal;

export const handleAction = (resetSteps: () => void, action: Action) => {
  if (action.confirm) {
    confirm({
      title: 'Are you sure?',
      content: action.confirmText,
      okText: action.label,
      cancelText: 'Go back',
      okType: 'danger',
      onOk: () => {
        resetSteps();
        action.proceed();
      },
    });

    return;
  }

  resetSteps();
  action.proceed();
};
