import renderer from 'react-test-renderer';
import React from 'react';
import { MyFComponent } from './functionalNamedComponent';

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