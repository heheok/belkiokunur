import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../utils/styles';

class AuthorProfile extends Component {
  render() {
    const {
      loading,
      hasError,
      data: author,
      compact,
      publishDate,
      readTime,
      articleSlug
    } = this.props;
    const { fullname, username, summary, since, followers, following } = author;
    return (
      <div>
        {loading && <span>loading</span>}
        {hasError && <span>error</span>}
        {!loading &&
          !hasError &&
          author &&
          <StAuthorProfile>
            <StAuthorProfileWrapper>
              <StAuthorAvatar compact={compact} />
              {compact
                ? <StAuthorInformation>
                    <StAuthorNameCompact to={`/@${username}`}>
                      {fullname}
                    </StAuthorNameCompact>
                    <StAuthorFollowerStats>
                      <StFollowers>{publishDate}</StFollowers>
                      <StFollows>Okuma Süresi: {readTime} dk.</StFollows>
                    </StAuthorFollowerStats>
                    <StEditLink to={`/@${username}/${articleSlug}/edit`}>
                      Düzenle
                    </StEditLink>
                  </StAuthorInformation>
                : <StAuthorInformation>
                    <StAuthorName>{fullname}</StAuthorName>
                    <StAuthorSummary>{summary}</StAuthorSummary>
                    <StMemberSince>
                      {since} tarihinden beri "belki okunur" diyor.
                    </StMemberSince>
                    <StAuthorFollowerStats>
                      <StFollowers>{followers} Kişi Takipçi</StFollowers>
                      <StFollows>{following} Kişiyi Takip Ediyor</StFollows>
                    </StAuthorFollowerStats>
                  </StAuthorInformation>}

            </StAuthorProfileWrapper>
          </StAuthorProfile>}
      </div>
    );
  }
}

const StAuthorProfile = styled.div`
  width:100%;
  padding:0px 10px;
  margin-top:20px;
  display:flex;
  justify-content:center;
`;
const StAuthorProfileWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:700px;
  ${media.md`
    width:100%;
  `};
`;
const StAuthorInformation = styled.div`
  flex:1;
`;
const StAuthorName = styled.h1`
  font-size: 36px;
  line-height:40px;
  letter-spacing: -0.93px;
  padding:0;
  margin:4px 0px;
  font-weight:400;
  color:${props => props.theme.primaryText};
`;
const StAuthorNameCompact = styled(Link)`
  font-size: 16px;
  line-height:20px;
  letter-spacing:0;
  padding:0;
  margin:4px 0px;
  font-weight:400;
  color:${props => props.theme.primaryText};
`;

const StAuthorSummary = styled.p`
  font-size:18px;
  color:${props => props.theme.primaryText};
  padding:0;
  margin:0;
  margin-bottom:16px;
  line-height:24px;
`;

const StMemberSince = styled.p`
  color:${props => props.theme.secondaryText};
  padding:0;
  margin:0;
  font-size:15px;
  line-height:20px;
`;
const StAuthorFollowerStats = styled.div``;
const StFollowers = styled.span`
  color:${props => props.theme.secondaryText};
  padding:0;
  font-size:15px;
  line-height:20px;
  margin-right:15px;
`;
const StFollows = styled.span`
  color:${props => props.theme.secondaryText};
  padding:0;
  font-size:15px;
  line-height:20px;
  margin-right:15px;
`;
const StAuthorAvatar = styled.div`
  min-width:${props => (props.compact ? '50px' : '120px')};
  min-height:${props => (props.compact ? '50px' : '120px')};
  border-radius:100%
  border:1px solid #3d3d3d;
  padding:0;
  margin:0;
  margin-right:${props => (props.compact ? '15px' : '30px')};
  background:#efefef;
`;

const StEditLink = styled(Link)`
  color:${props => props.theme.primaryText};
`;
export default AuthorProfile;
