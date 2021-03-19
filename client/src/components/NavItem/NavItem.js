import React from 'react';
import styles from './NavItem.module.scss';

function NavItem(props) {
  const { href, text, icon } = props;
  return (
    <div>
      {icon}
      <a href={href}>{text}</a>
    </div>
  );
}

export default NavItem;
