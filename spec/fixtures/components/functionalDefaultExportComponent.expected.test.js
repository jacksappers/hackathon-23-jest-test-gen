import renderer from 'react-test-renderer';
import React from 'react';
import PropTypes from 'prop-types';
import MyDefaultComponent from './functionalDefaultExportComponent';

jest.mock('react');
jest.mock('prop-types');

const renderTree = tree => renderer.create(tree);
describe('<MyDefaultComponent>', () => {
   
  it('should render component', () => {
    expect(renderTree(<MyDefaultComponent 
    />).toJSON()).toMatchSnapshot();
  });
  it('should render component with props', () => {
    expect(renderTree(<MyDefaultComponent  
      message={/*  PropTypes.string */} 
    />).toJSON()).toMatchSnapshot();
  });
});