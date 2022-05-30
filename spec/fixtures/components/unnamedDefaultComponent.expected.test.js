import renderer from 'react-test-renderer';
import React from 'react';
import UnnamedDefaultComponent from './unnamedDefaultComponent';

const renderTree = tree => renderer.create(tree);
describe('<UnnamedDefaultComponent>', () => {
  it('should render component', () => {
    expect(renderTree(<UnnamedDefaultComponent 
    />).toJSON()).toMatchSnapshot();
  });
  
});