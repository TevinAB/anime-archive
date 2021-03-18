import React from 'react';
import styles from './Container.module.scss';

function Container({ children, ...rest }) {
  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  );
}

export default Container;
