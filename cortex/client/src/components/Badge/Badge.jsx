import React from 'react';
import PropTypes from 'prop-types';
import './Badge.scss';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'primary', 'secondary']),
  className: PropTypes.string,
};

export default Badge;
