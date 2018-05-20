import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../utils/styles';
import SummaryList from '../containers/SummaryList';
import hasData from '../hoc/hasData';

const authorData = {
  name: 'Harun Akgün',
  authorId: 2,
  summary: 'I write fiction and weird essays about photography & the internet. Occasional documentary filmmaker.',
  since: 'Haziran 2017',
  followers: 291,
  following: 100
};

const AuthorProfile = ({
  author: { name, summary, since, followers, following, twitter }
}) => (
  <StAuthorProfile>
    <StAuthorProfileWrapper>
      <StAuthorAvatar />
      <StAuthorInformation>
        <StAuthorName>{name}</StAuthorName>
        <StAuthorSummary>{summary}</StAuthorSummary>
        <StMemberSince>
          {since} tarihinden beri "belki okunur" diyor.
        </StMemberSince>
        <StAuthorFollowerStats>
          <StFollowers>{followers} Kişi Takipçi</StFollowers>
          <StFollows>{following} Kişiyi Takip Ediyor</StFollows>
        </StAuthorFollowerStats>
      </StAuthorInformation>
    </StAuthorProfileWrapper>
  </StAuthorProfile>
);

class UserPage extends Component {
  shouldComponentUpdate(nextProps) {
    const { authorNick: nextSlug } = nextProps.match.params;
    const { authorNick } = this.props.match.params;
    return nextSlug !== authorNick;
  }
  render() {
    const SummaryListWithData = hasData({
      url: 'http://localhost:8080/articles',
      params: {
        _expand: ['genre', 'author'],
        authorId: authorData.authorId
      },
      loadingMessage: 'Loading Posts'
    })(SummaryList);
    return (
      <div>
        <AuthorProfile author={authorData} />
        <SummaryListWithData cardView={true} />;
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
const StAuthorInformation = styled.div``;
const StAuthorName = styled.h1`
  font-size: 36px;
  line-height:40px;
  letter-spacing: -0.93px;
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
  min-width:120px;
  min-height:120px;
  border-radius:100%
  border:1px solid #3d3d3d;
  padding:0;
  margin:0;
  margin-right:30px;
  background:#efefef;
`;
export default UserPage;
