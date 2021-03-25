import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavItem.module.scss';
import classNames from 'classnames';
import IconButton from '../IconButton';

function NavItem(props) {
  const { text, iconClass, toolTip, onClick } = props;

  const iconClasses = classNames(iconClass);

  return (
    <IconButton
      iconClass={[iconClasses, styles.md_icon]}
      tooltip={toolTip}
      ariaLabel={text}
      onClick={onClick}
    />
  );
}

NavItem.propTypes = {
  iconClass: PropTypes.array.isRequired,
  toolTip: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavItem;
