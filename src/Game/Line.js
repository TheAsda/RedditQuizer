import React from 'react';

export default props => {
  console.log(props);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{width: '100%', height: '100%'}}>
      <line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke="black" stroke-width="5" />
    </svg>
  );
};
