import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Card(props) {
  const { cardClass, ...rest } = props;

  const cardClasses = classNames(cardClass);

  return <div className={cardClasses} {...rest} />;
}

Card.propTypes = {
  cardClass: PropTypes.array,
};

export default Card;
