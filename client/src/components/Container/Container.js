import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Container.module.scss';

function Container(props) {
  const { children, containerClass, ...rest } = props;
  const classes = classNames(styles.container, containerClass);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

Container.propTypes = {
  containerClass: PropTypes.array,
};

export default Container;
