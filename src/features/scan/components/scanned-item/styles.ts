import styled from 'styled-components';

export const Box = styled.div`
  margin-top: 12px;
  border-radius: 12px;
  padding: 14px;
  background: rgba(0, 0, 0, 0.03);
`;

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const ValueText = styled.div`
  font-size: 14px;
  font-weight: 600;
  word-break: break-word;
  color: #111;
`;

export const Pre = styled.pre`
  margin: 10px 0 0;
  padding: 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  overflow: auto;
  font-size: 12px;
  line-height: 1.5;
  color: #111;
`;
