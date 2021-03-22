import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavItem.module.scss';
import classNames from 'classnames';
import IconButton from '../IconButton';

function NavItem(props) {
  const { href, text, iconClass, toolTip } = props;

  const iconClasses = classNames(iconClass);

  return (
    <a className={styles.link} href={href} aria-label={text}>
      <IconButton iconClass={[iconClasses, styles.md_icon]} tooltip={toolTip} />
    </a>
  );
}

NavItem.propTypes = {
  href: PropTypes.string.isRequired,
  iconClass: PropTypes.array.isRequired,
  toolTip: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default NavItem;
