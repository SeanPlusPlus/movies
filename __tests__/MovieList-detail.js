import React from 'react';
import {shallow} from 'enzyme';
import MovieList from '../src/modules/MovieList';

it('Should render the detail views', () => {
  const component = shallow(
    <MovieList />
  );
});
