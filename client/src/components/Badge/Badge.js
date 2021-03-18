import React from 'react';
import styles from './Badge.module.scss';
import PropTypes from 'prop-types';

function Badge({ value, ...rest }) {
  return (
    <span className={styles.badge} {...rest}>
      {value}
    </span>
  );
}

Badge.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Badge;
