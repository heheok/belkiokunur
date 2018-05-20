import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import GenrePage from '../pages/GenrePage';
import UserPage from '../pages/UserPage';
import ArticlePage from '../pages/ArticlePage';
import AddStoryPage from '../pages/AddStoryPage';
import EditStoryPage from '../pages/EditStoryPage';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/tur/:genreSlug" component={GenrePage} />
          <Route path="/@:authorNick" exact component={UserPage} />
          <Route
            path="/@:authorNick/:articleSlug"
            exact
            component={ArticlePage}
          />
          <Route
            path="/@:authorNick/:articleSlug/edit"
            component={EditStoryPage}
          />
          <Route path="/hikaye-ekle" component={AddStoryPage} />
        </Switch>
      </div>
    );
  }
}
