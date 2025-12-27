import type { ReactNode } from 'react';

import type { AppButtonProps } from '../app-button/types';

export type AppCardProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  actions?: (AppButtonProps & { key: string })[];
};
