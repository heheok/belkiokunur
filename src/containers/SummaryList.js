import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/styles';
import Article from '../components/ArticleSummary';

const SummaryList = ({ loading, hasError, data: articles, cardView }) => (
  <div>
    {loading && <span>loading</span>}
    {hasError && <span>error</span>}
    {!loading &&
      !hasError &&
      articles &&
      <StSummaryList>
        <StSummaryWrapper>
          {articles && articles.length > 0
            ? articles.map((article, index) => (
                <Article
                  key={`${article.id}-${index}`}
                  cardView={cardView}
                  article={article}
                />
              ))
            : <div>Yok... Bitti.</div>}
        </StSummaryWrapper>
      </StSummaryList>}

  </div>
);

const StSummaryList = styled.div`
  width:100%;
  padding:0px 10px
  display:flex;
  justify-content:center;
`;
const StSummaryWrapper = styled.div`
  margin-top:30px;
  width:700px;
  ${media.md`
    width:100%;
  `};
`;

export default SummaryList;
