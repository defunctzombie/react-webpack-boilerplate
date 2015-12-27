import React from 'react';

import Widget from './Widget.jsx';

export default React.createClass({
  displayName: 'App',
  render() {
    return (
      <div>
        <h1>The App!</h1>
        <Widget />
      </div>
    );
  },
});
