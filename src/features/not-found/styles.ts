import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px - 32px);
  display: grid;
  place-items: center;
`;

export const Code = styled.div`
  font-size: 64px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -2px;
`;

export const ContentBlock = styled.div`
  margin-top: 6px;
  display: grid;
  gap: 8px;

  > div:first-child {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
  }

  > div:last-child {
    font-size: 14px;
    opacity: 0.75;
    line-height: 1.4;
  }
`;

export const HintList = styled.ul`
  margin: 18px 0 0;
  padding-left: 18px;
  opacity: 0.85;

  li {
    margin: 6px 0;
  }
`;

export const FooterNote = styled.div`
  margin-top: 18px;
  font-size: 12px;
  opacity: 0.65;
`;
