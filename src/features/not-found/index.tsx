import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AppCard } from '@/ui/app-card';

import { Code, ContentBlock, FooterNote, HintList, Wrapper } from './styles';

export const NotFound: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <AppCard
        title={<Code>404</Code>}
        subtitle={
          <ContentBlock>
            <div>Page not found</div>
            <div>The page you're looking for doesn't exist or was moved.</div>
          </ContentBlock>
        }
        actions={[
          { key: 'home', label: 'go home', type: 'primary', to: '/' },
          { key: 'back', label: 'go back', onClick: () => navigate(-1) },
        ]}
      >
        <HintList>
          <li>check the url for typos</li>
          <li>use the menu to navigate</li>
          <li>go back to the previous page</li>
        </HintList>

        <FooterNote>requested: {location.pathname}</FooterNote>
      </AppCard>
    </Wrapper>
  );
};
