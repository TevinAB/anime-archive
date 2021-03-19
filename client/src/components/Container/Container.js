import React from 'react';
import styles from './Container.module.scss';

function Container(props) {
  const { children, ...rest } = props;

  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  );
}

export default Container;
