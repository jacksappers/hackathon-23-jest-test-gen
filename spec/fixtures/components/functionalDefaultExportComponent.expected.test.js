import renderer from 'react-test-renderer';
import React from 'react';
import MyDefaultComponent from './functionalDefaultExportComponent';

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