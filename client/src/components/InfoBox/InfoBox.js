import React from 'react';
import TextDisplay from '../TextDisplay';
import styles from './InfoBox.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function InfoBox(props) {
  const {
    imagePath,
    altText,
    headerText,
    bodyTexts,
    mainWrapperClass,
    imageClass,
    imgWrapperClass,
  } = props;

  const imageWrapperClasses = classNames(imgWrapperClass);
  const imageClasses = classNames(styles.img, imageClass);
  const mainWrapperClasses = classNames(
    styles.info_box_wrapper,
    mainWrapperClass
  );

  return (
    <div className={mainWrapperClasses}>
      <div className={imageWrapperClasses}>
        <img className={imageClasses} src={imagePath} alt={altText} />
      </div>
      <TextDisplay
        headerText={headerText}
        bodyTexts={bodyTexts}
        headerClass={[styles.title]}
        bodyClass={[styles.body]}
      />
    </div>
  );
}

InfoBox.propTypes = {
  imagePath: PropTypes.string.isRequired,
  altText: PropTypes.string,
  headerText: PropTypes.string,
  bodyTexts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  imageClass: PropTypes.array,
  mainWrapperClass: PropTypes.array,
  imgWrapperClass: PropTypes.array,
};

InfoBox.defaultProps = {
  altText: '',
  bodyText: [],
};

export default InfoBox;
