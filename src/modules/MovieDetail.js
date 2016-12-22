import React from 'react';
import $ from 'jquery';

class MovieDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      movies: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  getItem(slug, items) {
    this.setState({
      movies: items,
    });
    for (const i of items) {
      if (i.slug === slug) {
        this.setState({
          movie: i,
        });
        return;
      }
    }
    return;
  }

  fetch() {
    const slug = this.props.params.slug;
    const url = '/movies.json';
    const obj = {
      url,
    };
    const xhr = $.ajax(obj);
    xhr.done(data =>
      this.getItem(slug, data)
    );
  }

  handleClickWatchList(movie, add) {
    const movies = this.state.movies;
    for (const m of movies) {
      if (m.title === movie.title) {
        m.watchlist = add;
      }
    }
    this.setState({
      movies,
    });
    // would then send this data to API
  }

  render() {
    const movie = this.state.movie;
    const handleClickWatchList = this.handleClickWatchList.bind(this);
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>
            {movie.title}
          </h3>
          <p>
            Year: {movie.title_year}
          </p>
          <p>
            Runtime: {movie.duration}
          </p>
          {movie.watchlist &&
            <div
              className="btn btn-default"
              onClick={() => handleClickWatchList(movie, false)}
            >
              Remove from Watch List
            </div>
          }
          {!movie.watchlist &&
            <div
              className="btn btn-default"
              onClick={() => handleClickWatchList(movie, true)}
            >
              Add to Watch List
            </div>
          }
          <div className="btn-group">
            <div className="btn btn-default">
              Preview
            </div>
            <div className="btn btn-default">
              <i className="fa fa-play" /> Play
            </div>
          </div>

        </div>
      </div>
    );
  }
}

MovieDetail.propTypes = {
  params: React.PropTypes.object,
};

export default MovieDetail;
