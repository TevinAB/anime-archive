import React from 'react';
import styles from './TextDisplay.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function TextDisplay(props) {
  const {
    headerText,
    bodyTexts,
    headerStyle,
    headerClass,
    bodyClass,
    wrapperClass,
    ...rest
  } = props;

  const headerClasses = classNames(styles.header, headerClass);
  const bodyClasses = classNames(styles.body_text, bodyClass);
  const wrapperClasses = classNames(styles.main_wrapper, wrapperClass);

  return (
    <div className={wrapperClasses} {...rest}>
      <h2 className={headerClasses} style={headerStyle}>
        {headerText}
      </h2>
      {bodyTexts.map((obj, index) => {
        return (
          <div className={bodyClasses} key={index}>
            {obj.key && <span className={styles.dark}>{obj.key}: </span>}
            {obj.value && <span className={styles.value}>{obj.value}</span>}
          </div>
        );
      })}
    </div>
  );
}

TextDisplay.propTypes = {
  headerText: PropTypes.string,
  bodyTexts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  wrapperClass: PropTypes.array,
  headerClass: PropTypes.array,
  headerStyle: PropTypes.object,
  bodyClass: PropTypes.array,
};

TextDisplay.defaultProps = {
  bodyTexts: [],
};

export default TextDisplay;
