import React, { useState, useRef, useEffect } from 'react';
import styles from './AnimeCard.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Card from '../Card';
import CardContent from '../CardContent';
import Badge from '../Badge';

function AnimeCard(props) {
  const { badgeValue, image, alt, title, score, ...rest } = props;
  const cardClasses = classNames(styles.card);
  const details = useRef(null);
  const titleRef = useRef(null);
  const [bottom, setBottom] = useState(0);

  //This allows the detail section to animate robustly regradless of font-size
  useEffect(() => {
    const detailHeight = details.current.clientHeight;
    const titleHeight = titleRef.current.clientHeight;
    setBottom(-detailHeight + titleHeight);
  }, [details, titleRef]);

  return (
    <Card cardClass={[styles.card_wrapper]} {...rest}>
      <Badge value={badgeValue} badgeClass={[styles.badge]} />
      <CardContent rootClass={[cardClasses]}>
        <CardContent>
          <img className={styles.img} src={image} alt={alt} />
        </CardContent>
        <CardContent
          className={[styles.details_wrapper]}
          ref={details}
          style={{ bottom: bottom }}
        >
          <h2 className={styles.title} ref={titleRef}>
            {title}
          </h2>
          <p className={styles.details}>{score}</p>
        </CardContent>
      </CardContent>
    </Card>
  );
}

AnimeCard.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  score: PropTypes.string,
  badgeValue: PropTypes.number,
};

export default AnimeCard;
