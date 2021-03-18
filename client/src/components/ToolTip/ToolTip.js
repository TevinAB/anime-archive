import React, { useState } from 'react';
import styles from './ToolTip.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function ToolTip({
  children,
  text,
  placement,
  toolTipStyle,
  containerStyle,
  ...rest
}) {
  const [isHovering, setHovering] = useState(false);

  let toolTipClasses = classNames(styles.tool_tip, {
    [styles.show_tool_tip]: isHovering,
    [styles.top]: placement === 'top',
    [styles.bottom]: placement === 'bottom',
    [styles.left]: placement === 'left',
    [styles.right]: placement === 'right',
  });

  return (
    <div
      className={styles.tool_tip_wrapper}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ ...containerStyle }}
      {...rest}
      data-testid='tool-container'
    >
      {children}
      <span className={toolTipClasses} style={{ ...toolTipStyle }}>
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
};

export default ToolTip;
