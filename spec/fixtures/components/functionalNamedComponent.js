import React from 'react';
import PropTypes from 'prop-types';

export function MyFComponent(props) {
  return <span>{props.message}</span>;
};
MyFComponent.propTypes = {
  message: PropTypes.string
};