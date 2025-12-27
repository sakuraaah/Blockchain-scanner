import styled from 'styled-components';

export const Row = styled.div`
  display: grid;
  gap: 12px;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.div`
  font-size: 12px;
  opacity: 0.65;
`;
