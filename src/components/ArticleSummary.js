import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { getCategoryName } from '../utils/category';
import TiThumbsOk from 'react-icons/lib/ti/thumbs-ok';

const ArticleSummary = ({
  article: {
    id,
    title,
    text,
    slug,
    author: { username: authorNick, fullname: authorName },
    date,
    genre: { name: genreName, slug: genreSlug }
  }
}) => {
  return (
    <StSummary>
      <StSummaryBody>
        <StSummaryCategory to={`/tur/${genreSlug}`}>
          {genreName}
        </StSummaryCategory>
        <StSummaryClickable href={`/@${authorNick}/${slug}`}>
          <StSummaryTitle>
            {title}
          </StSummaryTitle>
          <StReactMarkdown source={text} />
        </StSummaryClickable>
      </StSummaryBody>
      <StSummaryInformation>
        <StAuthorInformation>
          <StSummaryAuthorName to={`/@${authorNick}`}>
            {authorName}
          </StSummaryAuthorName>
          <StSummaryDate>
            {`${date} - 10 dk. okuma`}
          </StSummaryDate>
        </StAuthorInformation>
        <StSummaryStats>
          <TiThumbsOk />
        </StSummaryStats>
      </StSummaryInformation>
    </StSummary>
  );
};

const StSummary = styled.div`
  width:100%;
  padding:30px 0px;
  border-bottom:1px solid #dfdfdf;
`;

const StSummaryInformation = styled.footer`
  width:100%;
  height:30px;
  display:flex;
  justify-content:space-between;
`;
const StSummaryStats = styled.div`
  color:${props => props.theme.secondaryText};
  font-size:30px;
  display:flex;
  align-items:center;
`;
const StAuthorInformation = styled.div``;
const StSummaryAuthorName = styled(Link)`
  color:${props => props.theme.primaryText};
  font-size:16px;
  font-weight:400;
`;
const StSummaryDate = styled.div`
  font-size:14px;
  color:${props => props.theme.secondaryText};
`;
const StSummaryBody = styled.div`
  margin-top:20px;
`;
const StSummaryClickable = styled.a` `;

const StSummaryTitle = styled.h3`
  font-size:24px;
  line-height:28px;
  font-weight:bold;
  color:${props => props.theme.logoColor};
  padding:0px;
  margin:0px;
  margin-bottom:10px;
`;
const StReactMarkdown = styled(ReactMarkdown)`
  font-size:16px;
  padding:0;
  margin:0;
  margin-bottom:10px;
  color:${props => props.theme.secondaryText};
`;

const StSummaryCategory = styled(Link)`
  font-size:15px;
  line-height:20px;
  color:${props => props.theme.secondaryText};
  text-transform:uppercase;
  cursor:pointer;
  &:hover{
    color:${props => props.theme.primaryText};
    text-decoration:underline;
  }
`;
export default ArticleSummary;
