import React from 'react';
import {shallow} from 'enzyme';
import Nav from '../src/modules/Nav';

it('Should render the nav', () => {
  const component = shallow(
    <Nav />
  );
});
