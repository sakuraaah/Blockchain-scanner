import type { MenuItem } from '@/features/navigation/types';

import type { AppCardProps } from '../app-card/types';

export type AppMenuProps = Omit<AppCardProps, 'children' | 'actions'> & {
  menuItems: MenuItem[];
};
