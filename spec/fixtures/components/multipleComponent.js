import React from 'react';
import PropTypes from 'prop-types';

export function SmallComponent(props) {
  return <small>{props.children}</small>;
}

export default class MyTestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     demo: true
    };
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  tick = () => {
    if (!this.mounted) return;
  };

  render() {
    return (
      <span>test {this.props.optional} {this.props.magicNumber}</span>
    );
  }
}

MyTestComponent.propTypes = {
  magicNumber: PropTypes.number.isRequired,
  optional: PropTypes.string,
  style: React.CSSProperties,
};

MyTestComponent.defaultProps = {
  optional: 'nothing'
};
