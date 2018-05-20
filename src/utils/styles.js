import styled, { css } from 'styled-components';
import theme from '../theme';

export const media = Object.keys(theme).reduce((accumulator, label) => {
  const emSize = theme[label] / 14;
  /* eslint-disable no-param-reassign*/
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  /* eslint-enable no-param-reassign*/
  return accumulator;
}, {});

export const ContainerBox = styled.div`
  background-color: #fff;
  border: 1px solid ${props => props.theme.borderColor};
  padding: 2.14em;
  margin: 0 0 2.14em 0;

  ${media.sm`
    padding: 0;
    border: none;
    background: none;
  `};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const EllipsisText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;
