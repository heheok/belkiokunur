import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import TiThumbsOk from 'react-icons/lib/ti/thumbs-ok';

const ArticleSummary = ({
  cardView,
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
    <StSummary cardView={cardView}>
      <StSummaryBody>
        {!cardView &&
          <StSummaryCategory to={`/tur/${genreSlug}`}>
            {genreName}
          </StSummaryCategory>}
        {cardView &&
          <StSummaryInformation cardView={cardView}>
            <StAuthorInformation>
              <StSummaryAuthorName to={`/@${authorNick}`}>
                {authorName}
              </StSummaryAuthorName>
              <StSummaryDate>
                {`${date} - 10 dk. okuma`}
              </StSummaryDate>
            </StAuthorInformation>
          </StSummaryInformation>}
        <StSummaryClickable to={`/@${authorNick}/${slug}`}>
          <StSummaryTitle>
            {title}
          </StSummaryTitle>
          <StReactMarkdown source={text} />
        </StSummaryClickable>
      </StSummaryBody>
      {!cardView &&
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
        </StSummaryInformation>}
    </StSummary>
  );
};

const StSummary = styled.div`

  width:100%;
  padding: ${props => (props.cardView ? '23px' : '30px 0px')};
  border-radius: ${props => (props.cardView ? '5px' : '0px')};
  border-width: ${props => (props.cardView ? '1px' : '0px 0px 1px 0px')};
  border-color: #dfdfdf;
  border-style: solid
  margin-bottom: ${props => (props.cardView ? '25px' : '0px')};
  box-shadow: ${props => (props.cardView ? '0 1px 4px rgba(0, 0, 0, 0.1)' : '0px')};
  
`;

const StSummaryInformation = styled.footer`
  width:100%;
  height:30px;
  display:flex;
  justify-content:space-between;
  margin-bottom: ${props => (props.cardView ? '20px' : '0px')};
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
const StSummaryBody = styled.div``;

const StSummaryClickable = styled(Link)` `;

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
