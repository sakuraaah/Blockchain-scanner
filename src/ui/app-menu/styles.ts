import { Menu } from 'antd';

import styled from 'styled-components';

export const StyledMenu = styled(Menu)`
  margin-top: 32px;
  background: transparent;
  border: none;

  .ant-menu-item {
    height: 56px;
    line-height: 56px;
    margin: 0;
    padding: 0 18px;
    border-radius: 10px;

    color: #111; /*primary text*/
    background: #f7f8fa; /*resting bg*/

    font-weight: 500;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      transform 0.1s ease;
  }

  .ant-menu-item:not(:last-child) {
    margin-bottom: 8px;
  }

  .ant-menu-item:hover {
    background: #eef1f6; /*hover bg*/
    color: #000;
  }

  .ant-menu-item-selected {
    background: #e7f0ff; /*selected bg*/
    color: #1677ff; /*antd primary*/
    font-weight: 600;
  }

  .ant-menu-item:active {
    transform: translateY(1px);
  }

  /*keyboard focus*/
  .ant-menu-item:focus-visible {
    outline: 2px solid rgba(22, 119, 255, 0.35);
    outline-offset: 2px;
  }
`;
