import renderer from 'react-test-renderer';
import React from 'react';
import PropTypes from 'prop-types';
import MyTestComponent from './defaultClassComponent';

jest.mock('react');
jest.mock('prop-types');

const renderTree = tree => renderer.create(tree);
describe('<MyTestComponent>', () => {
   
  it('should render component', () => {
    expect(renderTree(<MyTestComponent  
      magicNumber={/*  PropTypes.number.isRequired */} 
    />).toJSON()).toMatchSnapshot();
  });
  it('should render component with props', () => {
    expect(renderTree(<MyTestComponent  
      magicNumber={/*  PropTypes.number.isRequired */}  
      optional={/*  PropTypes.string */}  
      style={/*  React.CSSProperties */} 
    />).toJSON()).toMatchSnapshot();
  });
});