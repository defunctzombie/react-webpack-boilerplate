import React from 'react';

const style = {
  border: 'solid 1px black',
  padding: 5,
};

export default React.createClass({
  displayName: 'Widget',
  propTypes: {
    children: React.PropTypes.node,
  },
  render() {
    return (
      <span style={style}>Widget</span>
    );
  },
});
