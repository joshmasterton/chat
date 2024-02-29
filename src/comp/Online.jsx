/* eslint-disable react/prop-types */
import React from 'react';
import '../style/Online.scss';

function Online({ obj }) {
  return (
    <div id="online">
      <div
        style={{
          background: obj.online
            ? 'rgba(20, 219, 27, 1)'
            : 'rgba(214, 15, 15, 1)',
        }}
      >
        <div
          style={{
            background: obj.online
              ? 'rgba(20, 219, 27, 1)'
              : 'rgba(214, 15, 15, 1)',
          }}
        />
        <div
          style={{
            background: obj.online
              ? 'rgba(20, 219, 27, 1)'
              : 'rgba(214, 15, 15, 1)',
          }}
        />
      </div>
    </div>
  );
}

export default Online;
