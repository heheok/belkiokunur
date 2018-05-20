import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AuthorProfile from '../containers/AuthorProfile';
import { media } from '../utils/styles';
import { getReadTime } from '../utils/article';

const Article = ({ data: { title, text } }) => {
  return (
    <StArticle>
      <StArticleWrapper>
        <StArticleTitle>{title}</StArticleTitle>
        <StArticleBody dangerouslySetInnerHTML={{ __html: text }} />
      </StArticleWrapper>
    </StArticle>
  );
};

class ArticlePage extends Component {
  state = {
    loading: false,
    hasError: false,
    article: null
  };
  componentDidMount() {
    const { articleSlug } = this.props.match.params;
    const params = {
      slug: articleSlug,
      _expand: ['author', 'genre']
    };
    axios
      .get('http://localhost:8080/articles', { params })
      .then(({ data }) => {
        this.setState({
          article: data[0],
          loading: false,
          hasError: false
        });
      })
      .catch(error => {
        this.setState({
          hasError: true,
          loading: false
        });
      });
  }
  render() {
    const { loading, hasError, article } = this.state;
    if (article) {
      const readTimeInMinutes = getReadTime(article.text);
      return (
        <div>
          <AuthorProfile
            data={article.author}
            compact={true}
            publishDate={article.date}
            readTime={readTimeInMinutes}
            articleSlug={article.slug}
          />
          <Article data={article} />
        </div>
      );
    } else {
      return (
        <div>
          {loading && <span>loading</span>}
          {hasError && <span>error</span>}
        </div>
      );
    }
  }
}
export default ArticlePage;

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
