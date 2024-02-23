/* eslint-disable react/prop-types */
import React from 'react';
import '../style/MovingBackground.scss';

function MovingBackground({
  getFriendshipColor,
  friendStatus,
  position,
  height,
  width,
  index,
  borderRadius,
}) {
  return (
    <header
      className="rotate"
      style={{
        position, width: '100%', borderRadius,
      }}
    >
      <div
        style={{
          background: getFriendshipColor(friendStatus),
          position,
          width,
          height,
          animation: 'infinite rotate 4s linear',
          animationDelay: `${(index + 1) * 200}ms`,
        }}
      />
    </header>
  );
}

export default MovingBackground;
