import React, { Component } from 'react';
import SummaryList from '../containers/SummaryList';
import { apiGet } from '../utils/api';

class HomePage extends Component {
  state = {
    loading: false,
    hasError: false,
    articles: null
  };
  componentDidMount = async () => {
    const endPointResponse = await apiGet({
      endpoint: 'articles'
    });
    this.setState({
      loading: false,
      articles: endPointResponse.data ? endPointResponse.data.articles : null,
      hasError: endPointResponse.hasError
    });
  };
  render() {
    const { articles, loading, hasError } = this.state;
    return (
      <SummaryList loading={loading} hasError={hasError} data={articles} />
    );
  }
}
//
export default HomePage;
