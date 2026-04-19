import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'ghost', 'icon']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;
