import React from 'react';
import { Link } from 'react-router';
import { Typeahead } from 'react-bootstrap-typeahead';
import $ from 'jquery';
import { compareImdb, compareTitle, compareDate } from './Helpers';

class MovieList extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      items: [],
      moviesInPage: [],
      searchTerms: [],
      search: {
        value: '',
        valueLower: '',
      },
      sort: {
        name: 'desc',
        date: 'asc',
      },
      displayRange: {
        start: 0,
        end: 5,
      },
    };
  }

  componentDidMount() {
    this.fetch();
  }

  getMovieData(data) {
    const items = data;
    const movies = data;
    let searchTerms = new Set();
    for (const m of movies) {
      searchTerms.add(m.title);
      searchTerms.add(m.director_name);
      searchTerms.add(m.actor_1_name);
      searchTerms.add(m.actor_2_name);
    }
    searchTerms = Array.from(searchTerms);
    searchTerms.sort();
    this.setState({
      movies,
      items,
      searchTerms,
    });
    this.getMoviesInPage(data, null);
  }

  getMoviesInPage(movies, displayRange) {
    const moviesInPage = [];
    let start;
    let end;
    if (displayRange) {
      start = displayRange.start;
      end = displayRange.end;
      this.setState({
        displayRange,
      });
    } else {
      start = this.state.displayRange.start;
      end = this.state.displayRange.end;
    }
    for (let i = start; i < end; i += 1) {
      if (movies[i]) {
        moviesInPage.push(movies[i]);
      }
    }
    this.setState({
      moviesInPage,
    });
  }

  fetch() {
    const base = 'http://localhost:3000';
    const url = base + '/movies.json';
    const obj = {
      url,
    };
    const xhr = $.ajax(obj);
    xhr.done(data =>
      this.getMovieData(data)
    );
  }

  handleChangeTypeahead(e) {
    let movies = [];
    if (e.length > 0) {
      const s = e[0].trim();
      for (const m of this.state.movies) {
        if (m.title === s) {
          movies.push(m);
        } else if (m.director_name === s) {
          movies.push(m);
        } else if (m.actor_1_name === s) {
          movies.push(m);
        } else if (m.actor_2_name === s) {
          movies.push(m);
        }
      }
    } else {
      movies = this.state.items;
    }
    const displayRange = {
      start: 0,
      end: 5,
    };
    this.setState({
      movies,
    });
    this.getMoviesInPage(movies, displayRange);
  }

  handleClickImdb() {
    const movies = this.state.movies;
    movies.sort(compareImdb);
    const sort = this.state.sort;
    if (this.state.sort.imdb === 'asc') {
      sort.imdb = 'desc';
    } else {
      movies.reverse();
      sort.imdb = 'asc';
    }
    this.setState({
      movies,
    });
    const displayRange = {
      start: 0,
      end: 5,
    };
    this.getMoviesInPage(movies, displayRange);
  }

  handleClickName() {
    const movies = this.state.movies;
    movies.sort(compareTitle);
    const sort = this.state.sort;
    if (this.state.sort.name === 'asc') {
      sort.name = 'desc';
    } else {
      movies.reverse();
      sort.name = 'asc';
    }
    this.setState({
      movies,
    });
    const displayRange = {
      start: 0,
      end: 5,
    };
    this.getMoviesInPage(movies, displayRange);
  }

  handleClickDate() {
    const movies = this.state.movies;
    movies.sort(compareDate);
    const sort = this.state.sort;
    if (this.state.sort.date === 'asc') {
      sort.date = 'desc';
    } else {
      movies.reverse();
      sort.date = 'asc';
    }
    this.setState({
      movies,
    });
    const displayRange = {
      start: 0,
      end: 5,
    };
    this.getMoviesInPage(movies, displayRange);
  }

  handleClickNext() {
    if (this.state.lastPage) {
      return;
    }
    const displayRange = this.state.displayRange;
    displayRange.start += 5;
    displayRange.end += 5;
    const moviesInPage = [];
    const movies = this.state.movies;
    for (let i = displayRange.start; i < displayRange.end; i += 1) {
      if (movies[i]) {
        moviesInPage.push(movies[i]);
      } else {
        displayRange.end = i;
        this.setState({
          lastPage: true,
        });
      }
    }
    this.setState({
      moviesInPage,
      displayRange,
    });
  }

  handleClickPrev() {
    const displayRange = this.state.displayRange;
    if (displayRange.start === 0) {
      return;
    }
    displayRange.start -= 5;
    displayRange.end = displayRange.start + 5;
    const moviesInPage = [];
    const movies = this.state.movies;
    for (let i = displayRange.start; i < displayRange.end; i += 1) {
      if (movies[i]) {
        moviesInPage.push(movies[i]);
      }
    }
    this.setState({
      moviesInPage,
      displayRange,
      lastPage: false,
    });
  }


  render() {
    const handleChangeTypeahead = this.handleChangeTypeahead.bind(this);
    const handleClickName = this.handleClickName.bind(this);
    const handleClickDate = this.handleClickDate.bind(this);
    const handleClickImdb = this.handleClickImdb.bind(this);
    const handleClickNext = this.handleClickNext.bind(this);
    const handleClickPrev = this.handleClickPrev.bind(this);
    return (
      <div>

        <div className="row">
          <div id="search" className="col-md-12">
            <form>
              <Typeahead
                placeholder="Search"
                options={this.state.searchTerms}
                onChange={handleChangeTypeahead}
              />
            </form>
          </div>
        </div>

        { this.state.moviesInPage.length === 0 &&
          <div className="row">
            <div className="col-md-12">
              <i className="fa fa-spinner fa-spin fa-3x" />
            </div>
          </div>
        }

        { this.state.moviesInPage.length > 0 &&
          <div>
            <div className="row">
              <div id="sort" className="col-md-12">
                <hr />
                <div className="pull-right">
                  Sort:&nbsp;
                  <div className="btn-group">
                    <div
                      onClick={() => handleClickImdb()}
                      className="btn btn-default btn-sort"
                    >
                      IMDB
                    </div>
                    <div
                      onClick={() => handleClickName()}
                      className="btn btn-default btn-sort"
                    >
                      Name
                    </div>
                    <div
                      onClick={() => handleClickDate()}
                      className="btn btn-default btn-sort"
                    >
                      Date
                    </div>
                  </div>
                </div>
                {this.state.movies.length > 5 &&
                  <div className="pull-left">
                    {this.state.displayRange.start + 1} - {this.state.displayRange.end}
                    &nbsp;
                    Results of {this.state.movies.length}
                  </div>
                }
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <hr />
              </div>
              <div id="movies" className="col-md-12">
                {this.state.moviesInPage.map(m =>
                  <div key={m.slug}>
                    <div className="row">
                      <div className="col-md-4">
                        <strong>
                          <Link to={`/movie/${m.slug}`}>
                            {m.title}
                          </Link>
                          <div className="rating">
                            {m.imdb_score}
                          </div>
                        </strong>
                        <br />
                      </div>
                      <div className="col-md-3">
                        <p>
                          Language: {m.language}
                        </p>
                        <p>
                          Year: {m.title_year}
                        </p>
                        <p>
                          Runtime: {m.duration}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <p>
                          Director: {m.director_name}
                        </p>
                        <p>
                          Actor 1: {m.actor_1_name}
                        </p>
                        <p>
                          Actor 2: {m.actor_2_name}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 text-center">
                {this.state.movies.length > 5 &&
                  <div className="btn-group">
                    <div
                      onClick={() => handleClickPrev()}
                      className="btn btn-default btn-nav"
                    >
                      Prev
                    </div>
                    <div
                      onClick={() => handleClickNext()}
                      className="btn btn-default btn-nav"
                    >
                      Next
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default MovieList;
