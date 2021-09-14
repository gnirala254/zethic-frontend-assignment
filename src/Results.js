import React from 'react';

function Result({ results }) {
  return (
    <div>
      {results.map((el) => (
        <p key={Math.random()}>{el}</p>
      ))}
    </div>
  );
}

export default Result;
