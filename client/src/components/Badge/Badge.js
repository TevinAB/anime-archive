import React from 'react';
import styles from './Badge.module.scss';
import PropTypes from 'prop-types';

function Badge(props) {
  const { value, ...rest } = props;
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
