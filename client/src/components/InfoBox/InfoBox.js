import React, { useEffect, useRef } from 'react';
import TextDisplay from '../TextDisplay';
import styles from './InfoBox.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function InfoBox(props) {
  const {
    imagePath,
    altText,
    title,
    bodyTexts,
    mainWrapperClass,
    imageClass,
    imgWrapperClass,
    currentIndex,
    activeIndex,
    ...rest
  } = props;

  const imageWrapperClasses = classNames(imgWrapperClass);
  const imageClasses = classNames(styles.img, imageClass);
  const mainWrapperClasses = classNames(
    styles.info_box_wrapper,
    mainWrapperClass
  );
  const wrapperRef = useRef(null); //used to focus the div when used in search results

  useEffect(() => {
    if (activeIndex === currentIndex) wrapperRef.current.focus();
  });

  return (
    <div ref={wrapperRef} className={mainWrapperClasses} {...rest}>
      <div className={imageWrapperClasses}>
        <img className={imageClasses} src={imagePath} alt={altText} />
      </div>
      <TextDisplay
        headerText={title}
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
  title: PropTypes.string,
  bodyTexts: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  currentIndex: PropTypes.number, //for navigating with keyboard in a search result list
  activeIndex: PropTypes.number, //for navigating with keyboard in a search result list
  imageClass: PropTypes.array,
  mainWrapperClass: PropTypes.array,
  imgWrapperClass: PropTypes.array,
};

InfoBox.defaultProps = {
  altText: '',
  bodyTexts: [],
};

export default InfoBox;
