import React, { Component } from 'react';
import SummaryList from '../containers/SummaryList';
import AuthorProfile from '../containers/AuthorProfile';
import hasData from '../hoc/hasData';
import axios from 'axios';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      hasError: false,
      authorId: null
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { authorId: nextAuthor } = nextState;
    const { authorId } = this.state;

    return authorId !== nextAuthor;
  }
  componentDidMount() {
    const { authorNick } = this.props.match.params;
    const params = {
      username: authorNick
    };
    axios
      .get('http://localhost:8080/authors', { params })
      .then(({ data }) => {
        const { id } = data[0];
        this.setState({
          authorId: id,
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
  AuthorsProfileData = authorId => {
    return hasData({
      url: `http://localhost:8080/authors/${authorId}`,
      loadingMessage: 'Loading Author'
    })(AuthorProfile);
  };
  AuthorsLatestPosts = authorId => {
    return hasData({
      url: 'http://localhost:8080/articles',
      params: {
        _expand: ['genre', 'author'],
        authorId: authorId
      },
      loadingMessage: 'Loading Posts'
    })(SummaryList);
  };
  render() {
    const { loading, hasError, authorId } = this.state;
    if (authorId) {
      const AuthorProfileWithData = this.AuthorsProfileData(authorId);
      const SummaryListWithData = this.AuthorsLatestPosts(authorId);
      return (
        <div>
          <AuthorProfileWithData />
          <SummaryListWithData cardView={true} />
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
export default UserPage;
