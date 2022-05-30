import renderer from 'react-test-renderer';
import React from 'react';
import { connect } from 'react-redux';
import { CallTimer } from './classComponent';

jest.mock('react-redux');

const renderTree = tree => renderer.create(tree);
describe('<CallTimer>', () => {
  it('should render component', () => {
    expect(renderTree(<CallTimer  
      magicNumber={/*  PropTypes.number.isRequired */} 
    />).toJSON()).toMatchSnapshot();
  });
  it('should render component with props', () => {
    expect(renderTree(<CallTimer  
      magicNumber={/*  PropTypes.number.isRequired */}  
      optional={/*  PropTypes.string */}  
      style={/*  React.CSSProperties */} 
    />).toJSON()).toMatchSnapshot();
  });
});