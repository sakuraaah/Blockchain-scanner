import { Button, Layout } from 'antd';

import styled from 'styled-components';

export const Root = styled(Layout)`
  min-height: 100vh;
`;

export const Header = styled(Layout.Header)`
  height: 56px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Title = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  text-decoration: none;

  &:hover {
    color: #000;
    opacity: 0.85;
  }
`;

export const MenuButton = styled(Button)`
  border: none;
  box-shadow: none;
`;

export const Content = styled(Layout.Content)`
  padding: 16px;
`;
