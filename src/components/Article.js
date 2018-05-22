import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/styles';

const Article = props => {
  const { article } = props;
  return (
    <StArticle>
      <StArticleWrapper>
        <StArticleTitle>{article.title}</StArticleTitle>
        <StArticleBody dangerouslySetInnerHTML={{ __html: article.text }} />
      </StArticleWrapper>
    </StArticle>
  );
};

const StArticle = styled.div`
  width:100%;
  padding:0px 10px;
  margin-top:20px;
  display:flex;
  justify-content:center;
`;
const StArticleWrapper = styled.div`
  width:700px;
  ${media.md`
    width:100%;
  `};
`;
const StArticleTitle = styled.h1`
  font-size:42px;
  line-height: 1.04;
    letter-spacing: -.015em;
    padding-top: 5px!important;
`;
const StArticleBody = styled.div`
  font-size:21px;
  line-height: 1.5;
  letter-spacing: -.003em;
  padding-bottom:40px;
  & b{
    font-weight:600;
  }
`;

export default Article;
