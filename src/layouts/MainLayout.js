import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Header from '../components/Header';
import HomePage from '../pages/HomePage';
import GenrePage from '../pages/GenrePage';
import UserPage from '../pages/UserPage';
import ArticlePage from '../pages/ArticlePage';
import AddStoryPage from '../pages/AddStoryPage';
import EditStoryPage from '../pages/EditStoryPage';

export default function MainLayout() {
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
        <PrivateRoute
          path="/@:authorNick/:articleSlug/edit"
          component={EditStoryPage}
        />
        <PrivateRoute path="/hikaye-ekle" component={AddStoryPage} />
      </Switch>
    </div>
  );
}
