import React from 'react';
import './Spinner.scss';

const Spinner = ({ size = 'md' }) => {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-inner"></div>
    </div>
  );
};

export default Spinner;
