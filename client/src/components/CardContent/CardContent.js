import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CardContent = React.forwardRef(function CardContent(props, ref) {
  const { rootClass, ...rest } = props;

  const classes = classNames(rootClass);

  return <div className={classes} ref={ref} {...rest}></div>;
});

CardContent.propTypes = {
  rootClass: PropTypes.array,
};

export default CardContent;
