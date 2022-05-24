import React from 'react';
import PropTypes from 'prop-types';

function MyDefaultComponent(props) {
  return <span>{props.message}</span>;
};
MyDefaultComponent.propTypes = {
  message: PropTypes.string
};
export default MyDefaultComponent;