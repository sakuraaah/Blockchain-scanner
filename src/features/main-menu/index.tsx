import type { FC } from 'react';

import { MAIN_MENU_ITEMS } from '@/features/navigation/constants/menuItems';
import { AppMenu } from '@/ui/app-menu';

import { Wrapper } from './styles';

export const MainMenu: FC = () => {
  return (
    <Wrapper>
      <AppMenu title="MENU" menuItems={MAIN_MENU_ITEMS} />
    </Wrapper>
  );
};
