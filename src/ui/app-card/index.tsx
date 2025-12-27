import type { FC } from 'react';

import { AppButton } from '../app-button';
import { Actions, Body, Header, Subtitle, Title, Wrapper } from './styles';
import type { AppCardProps } from './types';

export const AppCard: FC<AppCardProps> = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  return (
    <Wrapper>
      {(title || subtitle) && (
        <Header>
          {title ? <Title>{title}</Title> : null}
          {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        </Header>
      )}

      {children ? <Body>{children}</Body> : null}

      {actions?.length ? (
        <Actions>
          {actions.map(({ key, ...action }) => (
            <AppButton key={key} {...action} />
          ))}
        </Actions>
      ) : null}
    </Wrapper>
  );
};
