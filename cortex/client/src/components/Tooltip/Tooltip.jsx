import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

const Tooltip = ({ children, text, position = 'top' }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="tooltip-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`tooltip-box tooltip-${position}`}>
          {text}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

export default Tooltip;
