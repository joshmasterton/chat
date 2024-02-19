/* eslint-disable react/prop-types */
import React from 'react';
import '../style/Loading.scss';

function Loading({ circleBackground }) {
  // Render Loading
  return (
    <div id="loading">
      <div>
        <div />
        <div style={{ background: circleBackground }} />
      </div>
    </div>
  );
}

export default Loading;
