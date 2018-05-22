import React, { Component } from 'react';
import AuthorProfile from '../containers/AuthorProfile';
import Article from '../components/Article';
import { getReadTime } from '../utils/article';
import { apiGet } from '../utils/api';

class ArticlePage extends Component {
  state = {
    loading: false,
    hasError: false,
    article: null
  };
  componentDidMount = async () => {
    const { articleSlug } = this.props.match.params;
    const endPointResponse = await apiGet({
      endpoint: `article/${articleSlug}`
    });
    this.setState({
      loading: false,
      article: endPointResponse.data ? endPointResponse.data.article : null,
      hasError: endPointResponse.hasError
    });
  };
  render() {
    const { loading, hasError, article } = this.state;
    if (article) {
      const readTimeInMinutes = article ? getReadTime(article.text) : '...';
      return (
        <div>
          <AuthorProfile
            loading={loading}
            hasError={hasError}
            data={article.author}
            compact={true}
            publishDate={article.date}
            readTime={readTimeInMinutes}
            articleSlug={article.slug}
          />
          <Article article={article} />
        </div>
      );
    } else {
      return (
        <div>
          {loading && <span>Loading</span>}
          {hasError && <span>Has Error</span>}
        </div>
      );
    }
  }
}
export default ArticlePage;
