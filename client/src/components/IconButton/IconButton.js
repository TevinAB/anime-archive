import React from 'react';
import ToolTip from '../ToolTip';
import styles from './IconButton.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function IconButton(props) {
  const {
    iconClass,
    tooltip,
    toolTipClass,
    buttonType,
    buttonClass,
    onClick,
    ariaLabel,
  } = props;

  const toolTipClasses = classNames(toolTipClass);
  const buttonClasses = classNames(styles.button, buttonClass);
  const iconClasses = classNames(iconClass);

  return (
    <ToolTip containerClasses={toolTipClasses} text={tooltip}>
      <button
        className={buttonClasses}
        tabIndex={0}
        type={buttonType}
        aria-label={ariaLabel}
        onClick={onClick}
        data-testid='icon-button'
      >
        <i className={iconClasses}></i>
      </button>
    </ToolTip>
  );
}

IconButton.propTypes = {
  iconClass: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
  tooltipClass: PropTypes.array,
  ariaLabel: PropTypes.string,
  buttonType: PropTypes.string,
  buttonClass: PropTypes.array,
};

IconButton.defaultProps = {
  buttonType: 'button',
};

export default IconButton;
