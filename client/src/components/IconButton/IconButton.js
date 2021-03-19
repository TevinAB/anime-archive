import React from 'react';
import ToolTip from '../ToolTip';
import styles from './IconButton.module.scss';
import PropTypes from 'prop-types';

function IconButton(props) {
  const {
    iconClass,
    tooltip,
    buttonType,
    onClick,
    ariaLabel,
    iconStyle,
  } = props;

  return (
    <ToolTip containerStyle={{ display: 'inline-block' }} text={tooltip}>
      <button
        className={styles.button}
        tabIndex={0}
        type={buttonType}
        aria-label={ariaLabel}
        onClick={onClick}
        data-testid='icon-button'
      >
        <i className={iconClass} style={{ ...iconStyle }}></i>
      </button>
    </ToolTip>
  );
}

IconButton.propTypes = {
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  buttonType: PropTypes.string,
  iconStyle: PropTypes.object,
};

IconButton.defaultProps = {
  buttonType: 'button',
};

export default IconButton;
