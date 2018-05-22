import React, { Component } from 'react';
import SummaryList from '../containers/SummaryList';
import AuthorProfile from '../containers/AuthorProfile';
import { apiGet } from '../utils/api';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {
        loading: true,
        hasError: false,
        data: null
      },
      articles: {
        loading: false,
        hasError: false,
        data: null
      }
    };
  }
  getAuthorData = async authorSlug => {
    const endPointResponse = await apiGet({
      endpoint: `author/${authorSlug}`
    });
    this.setState({
      author: {
        loading: false,
        data: endPointResponse.data ? endPointResponse.data.author : null,
        hasError: endPointResponse.hasError
      }
    });
  };
  getArticlesByAuthor = async authorSlug => {
    const endPointResponse = await apiGet({
      endpoint: `articles-by/${authorSlug}`
    });
    this.setState({
      articles: {
        loading: false,
        data: endPointResponse.data ? endPointResponse.data.articles : null,
        hasError: endPointResponse.hasError
      }
    });
  };
  componentDidMount = async () => {
    const { authorNick } = this.props.match.params;
    await this.getAuthorData(authorNick);
    await this.getArticlesByAuthor(authorNick);
  };

  render() {
    const { author, articles } = this.state;
    return (
      <div>
        <AuthorProfile
          loading={author.loading}
          hasError={author.hasError}
          data={author.data}
        />
        <SummaryList
          loading={articles.loading}
          hasError={articles.hasError}
          data={articles.data}
          cardView={true}
        />
      </div>
    );
  }
}
export default UserPage;
