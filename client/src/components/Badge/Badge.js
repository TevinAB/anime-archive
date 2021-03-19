import React from 'react';
import classNames from 'classnames';
import styles from './Badge.module.scss';
import PropTypes from 'prop-types';

function Badge(props) {
  const { value, badgeClass, ...rest } = props;
  const badgeClasses = classNames(styles.badge, badgeClass);

  return (
    <span className={badgeClasses} {...rest}>
      {value}
    </span>
  );
}

Badge.propTypes = {
  value: PropTypes.string.isRequired,
  badgeClass: PropTypes.array,
};

export default Badge;
