import renderer from 'react-test-renderer';
import React from 'react';
import PropTypes from 'prop-types';
import { MyFComponent } from './functionalNamedComponent';

jest.mock('react');
jest.mock('prop-types');

const renderTree = tree => renderer.create(tree);
describe('<MyFComponent>', () => {
   
  it('should render component', () => {
    expect(renderTree(<MyFComponent 
    />).toJSON()).toMatchSnapshot();
  });
  it('should render component with props', () => {
    expect(renderTree(<MyFComponent  
      message={/*  PropTypes.string */} 
    />).toJSON()).toMatchSnapshot();
  });
});