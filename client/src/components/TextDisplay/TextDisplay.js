import React from 'react';
import styles from './TextDisplay.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function TextDisplay(props) {
  let { headerText, bodyTexts, headerStyle } = props;

  const headerClasses = classNames(styles.header);

  return (
    <div className={styles.main_wrapper}>
      <h2 className={headerClasses} style={headerStyle}>
        {headerText}
      </h2>
      {bodyTexts.map((obj, index) => {
        return (
          <div className={styles.body_text} key={index}>
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
  headerClass: PropTypes.array,
  headerStyle: PropTypes.object,
};

TextDisplay.defaultProps = {
  bodyTexts: [],
};

export default TextDisplay;
