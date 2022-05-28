import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class CallTimer extends React.PureComponent {
  static getDerivedStateFromProps(nextProps) {
   
  }

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

CallTimer.propTypes = {
  magicNumber: PropTypes.number.isRequired,
  optional: PropTypes.string,
  style: React.CSSProperties,
};

CallTimer.defaultProps = {
  optional: 'nothing'
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(CallTimer);
