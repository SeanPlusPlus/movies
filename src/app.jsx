import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import Nav from './modules/Nav';
import MovieList from './modules/MovieList';
import MovieDetail from './modules/MovieDetail';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      containerType: 'container', // optionally add -fluid
    };
  }
  render() {
    return (
      <div>
        <Nav location={this.props.location} containerType={this.state.containerType} />
        <div className={this.state.containerType}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MovieList} />
      <Route path="/movie/:slug" component={MovieDetail} />
    </Route>
  </Router>
), document.getElementById('app'));
