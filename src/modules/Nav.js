import React from 'react';
import { Link } from 'react-router';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Movies',
    };
  }
  render() {
    const containerType = this.props.containerType;
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className={containerType}>
          <div className="navbar-header">
            <Link to={'/'} className="navbar-brand" id="title">
              {this.state.title}
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  containerType: React.PropTypes.string,
};

export default Nav;
