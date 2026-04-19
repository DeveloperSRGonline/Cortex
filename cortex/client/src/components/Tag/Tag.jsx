import React from 'react';
import PropTypes from 'prop-types';
import './Tag.scss';

const Tag = ({ children, onRemove, className = '' }) => {
  return (
    <div className={`tag ${className}`}>
      <span className="tag-label">{children}</span>
      {onRemove && (
        <button className="tag-remove" onClick={onRemove}>
          &times;
        </button>
      )}
    </div>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default Tag;
