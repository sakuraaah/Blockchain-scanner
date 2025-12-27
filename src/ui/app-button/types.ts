import type { ReactNode } from 'react';
import type { To } from 'react-router-dom';

import type { ButtonProps } from 'antd';

export type AppButtonBase = Omit<ButtonProps, 'children' | 'href'> & {
  label: ReactNode;
};

export type AppButtonLink = AppButtonBase & {
  to: To;
  replace?: boolean;
  state?: unknown;
};

export type AppButtonAction = AppButtonBase & {
  onClick?: ButtonProps['onClick'];
  to?: never;
};

export type AppButtonProps = AppButtonLink | AppButtonAction;
