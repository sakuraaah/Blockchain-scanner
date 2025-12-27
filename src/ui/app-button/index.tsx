import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

import type { AppButtonProps } from './types';

export const AppButton: FC<AppButtonProps> = (props) => {
  const { label, ...rest } = props;

  if ('to' in props) {
    const { to, replace, state, ...btnProps } = rest as any;

    return (
      <Button {...btnProps}>
        <Link
          to={to}
          replace={replace}
          state={state}
          style={{ color: 'inherit' }}
        >
          {label}
        </Link>
      </Button>
    );
  }

  return <Button {...rest}>{label}</Button>;
};
