import React from 'react';
import {shallow} from 'enzyme';
import MovieDetail from '../src/modules/MovieDetail';

it('Should render the list view with search', () => {
  const component = shallow(
    <MovieDetail />
  );
});
