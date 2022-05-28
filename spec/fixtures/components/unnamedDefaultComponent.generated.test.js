import renderer from 'react-test-renderer';
import React from 'react';
import PropTypes from 'prop-types';
import UnnamedDefaultComponent from './unnamedDefaultComponent';

jest.mock('react');
jest.mock('prop-types');

const renderTree = tree => renderer.create(tree);
describe('<UnnamedDefaultComponent>', () => {
   
  it('should render component', () => {
    expect(renderTree(<UnnamedDefaultComponent 
    />).toJSON()).toMatchSnapshot();
  });
  
});