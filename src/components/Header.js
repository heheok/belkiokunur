import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '../utils/styles';
import { Categories } from '../mockData';

const Header = () => (
  <StStickyHeader>
    <StHeader>
      <StHeaderWrapper>
        <StLogoType to="/">BelkiOkunur</StLogoType>
        <StMenu>Menu</StMenu>
      </StHeaderWrapper>
    </StHeader>

    <StHeader>
      <StHeaderCategoryWrapper>
        {Categories.map(category => (
          <StCategoryLink to={`/tur/${category.slug}`} key={category.id}>
            {category.name}
          </StCategoryLink>
        ))}
      </StHeaderCategoryWrapper>
    </StHeader>
  </StStickyHeader>
);

const StStickyHeader = styled.div`

`;
const StHeader = styled.div`
  width:100%;
  padding:0px 10px
  display:flex;
  justify-content:center;
`;
const StHeaderWrapper = styled.div`
  justify-content:space-between;
  align-items:center;
  width:1040px;
  display:flex;
  height:56px;
  ${media.md`
    width:100%;
  `};
`;
const StHeaderCategoryWrapper = styled.div`
  justify-content:space-between;
  align-items:center;
  width:1040px;
  display:flex;
  height:56px;
  padding:0 30px;
  ${media.md`
    width:100%;
  `};
`;

const StCategoryLink = styled(Link)`
  color:${props => props.theme.secondaryText};
  text-transform:uppercase;
  &:hover{
    color:${props => props.theme.primaryText};
  }
`;

const StLogoType = styled(Link)`
  font-size:28px;
  color:${props => props.theme.logoColor};
`;
const StMenu = styled.div`
  font-size:18px;
  color:#1d1d1d;
`;

export default Header;
