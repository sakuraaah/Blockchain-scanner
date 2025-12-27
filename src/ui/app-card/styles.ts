import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 720px;
  border-radius: 16px;
  padding: 28px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.15;
`;

export const Subtitle = styled.div`
  font-size: 15px;
  opacity: 0.7;
  line-height: 1.45;
`;

export const Body = styled.div`
  margin-top: 18px;
`;

export const Actions = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
