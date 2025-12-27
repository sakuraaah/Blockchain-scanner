import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AppCard } from '../app-card';
import { StyledMenu } from './styles';
import type { AppMenuProps } from './types';

export const AppMenu: FC<AppMenuProps> = ({ title, subtitle, menuItems }) => {
  const parsedMenuItems = useMemo(
    () =>
      menuItems.map((it) => ({
        key: it.key,
        label: <Link to={it.path}>{it.label}</Link>,
      })),
    [menuItems]
  );

  return (
    <AppCard title={title} subtitle={subtitle}>
      <StyledMenu mode="inline" items={parsedMenuItems} />
    </AppCard>
  );
};
