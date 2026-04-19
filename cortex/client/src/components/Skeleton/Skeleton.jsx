import React from 'react';
import './Skeleton.scss';

const Skeleton = ({ width, height, circle, className = '' }) => {
  const style = {
    width,
    height,
    borderRadius: circle ? '50%' : undefined
  };

  return (
    <div 
      className={`skeleton ${className}`} 
      style={style}
    ></div>
  );
};

export default Skeleton;
