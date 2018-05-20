import React, { Component } from 'react';
import SummaryList from '../components/SummaryList';
import hasData from '../hoc/hasData';

class HomePage extends Component {
  render() {
    const SummaryListWithData = hasData({
      url: 'http://localhost:8080/articles',
      params: {
        _expand: ['genre', 'author']
      },
      loadingMessage: 'Loading Posts'
    })(SummaryList);
    return <SummaryListWithData />;
  }
}

export default HomePage;
