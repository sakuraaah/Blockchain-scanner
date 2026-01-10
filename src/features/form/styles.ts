import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  gap: 12px;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const RowActions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const ListRow = styled.div`
  display: grid;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.03);
`;

export const ListRowTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

export const ListRows = styled.div`
  display: grid;
  gap: 10px;
`;
