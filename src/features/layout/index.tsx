import { type FC, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';

import { env } from '@/config/env';
import { MAIN_MENU_ITEMS } from '@/features/navigation/constants/menuItems';
import type { MenuItem } from '@/features/navigation/types';

import { Content, Header, MenuButton, Root, Title } from './styles';

export const Layout: FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const items = useMemo<MenuItem[]>(
    () => [{ key: 'home', label: 'Home', path: '/' }, ...MAIN_MENU_ITEMS],
    []
  );

  const selectedKeys = useMemo(
    () =>
      items.reduce((acc: string[], item) => {
        const hit =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);

        if (hit) acc.push(item.key);
        return acc;
      }, []),
    [items, location.pathname]
  );

  const menuItems = useMemo(
    () =>
      items.map((it) => ({
        key: it.key,
        label: (
          <Link to={it.path} onClick={() => setOpen(false)}>
            {it.label}
          </Link>
        ),
      })),
    [items]
  );

  return (
    <Root>
      <Header>
        <Title as={Link} to="/">
          {env.appName}
        </Title>

        <MenuButton
          type="text"
          aria-label="open menu"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />
      </Header>

      <Drawer placement="right" open={open} onClose={() => setOpen(false)}>
        <Menu mode="inline" selectedKeys={selectedKeys} items={menuItems} />
      </Drawer>

      <Content>
        <Outlet />
      </Content>
    </Root>
  );
};
