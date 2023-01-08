import React from 'react';

const WarnMessage = ({ message }) => {
  return (
    <div>
      {message === '' ? (
        <div className="invisible">O</div>
      ) : (
        <div className="text-red">{message}</div>
      )}
    </div>
  );
};

export default WarnMessage;
