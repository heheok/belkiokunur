import React, { Component } from 'react';
import SummaryList from '../containers/SummaryList';
import { apiGet } from '../utils/api';

class GenrePage extends Component {
  state = {
    loading: false,
    hasError: false,
    articles: null
  };
  getAtriclesByGenre = async genreSlug => {
    const endPointResponse = await apiGet({
      endpoint: `articles-in/${genreSlug}`
    });
    this.setState({
      loading: false,
      articles: endPointResponse.data ? endPointResponse.data.articles : null,
      hasError: endPointResponse.hasError
    });
  };
  componentWillReceiveProps(nextProps) {
    const { genreSlug: previousGenreSlug } = this.props.match.params;
    const { genreSlug: nextGenreSlug } = nextProps.match.params;
    if (previousGenreSlug !== nextGenreSlug) {
      this.getAtriclesByGenre(nextGenreSlug);
    }
  }
  componentDidMount() {
    const { genreSlug } = this.props.match.params;
    this.getAtriclesByGenre(genreSlug);
  }
  render() {
    const { articles, loading, hasError } = this.state;
    return (
      <SummaryList loading={loading} hasError={hasError} data={articles} />
    );
  }
}
export default GenrePage;
