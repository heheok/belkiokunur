import React, { Component } from 'react';
import SummaryList from '../components/SummaryList';
import { getCategoryId } from '../utils/category';
import hasData from '../hoc/hasData';

class GenrePage extends Component {
  shouldComponentUpdate(nextProps) {
    const { genreSlug: nextSlug } = nextProps.match.params;
    const { genreSlug } = this.props.match.params;
    return nextSlug !== genreSlug;
  }
  render() {
    const { genreSlug } = this.props.match.params;
    const { id: categoryId } = getCategoryId(genreSlug);
    const SummaryListWithData = hasData({
      url: `http://localhost:8080/articles`,
      params: {
        genreId: categoryId,
        _expand: ['genre', 'author']
      },
      loadingMessage: 'Loading Posts'
    })(SummaryList);
    return <SummaryListWithData />;
  }
}
export default GenrePage;
