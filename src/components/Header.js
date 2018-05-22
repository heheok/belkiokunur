import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { media } from '../utils/styles';
import { apiGet } from '../utils/api';
import { getAuthorContext } from '../utils/auth';

class Header extends Component {
  state = {
    loading: true,
    hasError: false,
    genres: null
  };
  componentDidMount = async () => {
    const endPointResponse = await apiGet({
      endpoint: 'genres'
    });

    this.setState({
      loading: false,
      genres: endPointResponse.data ? endPointResponse.data.genres : null
    });
  };
  render() {
    const { genres, loading, hasError } = this.state;
    return (
      <div>
        {loading && <span>loading</span>}
        {hasError && <span>error</span>}
        {genres &&
          genres.length > 0 &&
          <StStickyHeader>
            <StHeader>
              <StHeaderWrapper>
                <StLogoType to="/">BelkiOkunur</StLogoType>
                <StMenu>
                  <StLink to={'/hikaye-ekle'}>Hikaye Ekle</StLink>
                </StMenu>
              </StHeaderWrapper>
            </StHeader>

            <StHeader>
              <StHeaderCategoryWrapper>
                {genres.map(genre => (
                  <StCategoryLink to={`/tur/${genre.slug}`} key={genre.slug}>
                    {genre.name}
                  </StCategoryLink>
                ))}
              </StHeaderCategoryWrapper>
            </StHeader>
          </StStickyHeader>}
      </div>
    );
  }
}

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

const StCategoryLink = styled(NavLink)`
  color:${props => props.theme.secondaryText};
  text-transform:uppercase;
  &.active {
    color:${props => props.theme.primaryText};
    text-decoration:underline;
  }
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
`;

const StLink = styled(Link)`
    color:#1d1d1d;
`;
export default Header;
