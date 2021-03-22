import React, { useState } from 'react';
import styles from './ToolTip.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function ToolTip(props) {
  const {
    children,
    text,
    placement,
    toolTipStyle,
    toolTipClass,
    containerStyle,
    containerClass,
    ...rest
  } = props;

  const [isHovering, setHovering] = useState(false);

  //Build the final class string for the tooltip
  let toolTipClasses = classNames(styles.tool_tip, {
    [styles.show_tool_tip]: isHovering,
    [styles.top]: placement === 'top',
    [styles.bottom]: placement === 'bottom',
    [styles.left]: placement === 'left',
    [styles.right]: placement === 'right',
    toolTipClass,
  });

  //Build class string for tool tip container
  let containerClasses = classNames(styles.tool_tip_wrapper, containerClass);

  return (
    <div
      className={containerClasses}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ ...containerStyle }}
      {...rest}
      data-testid='tool-container'
    >
      {children}
      <span
        aria-hidden='true'
        className={toolTipClasses}
        style={{ ...toolTipStyle }}
      >
        {text}
      </span>
    </div>
  );
}

ToolTip.defaultProps = {
  placement: 'bottom',
};

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
  placement: PropTypes.string,
  toolTipStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  toolTipClass: PropTypes.array,
  containerClass: PropTypes.array,
};

export default ToolTip;
