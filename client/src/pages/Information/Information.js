import React from 'react';
import useFetch from '../../hooks';
import styles from './Information.module.scss';
import TextDisplay from '../../components/TextDisplay';

function Information(props) {
  const { searchType } = props.match.params;

  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('id');

  const { data, isLoading, error } = useFetch(buildApiPath(searchType, itemId));
  const standardData = normalizeData(data);

  return (
    <article className={styles.main_wrapper}>
      {isLoading ? (
        'loading...'
      ) : error ? (
        'error, refresh page'
      ) : (
        <>
          <section className={styles.left_content}>
            <img
              className={styles.info_img}
              src={standardData.image_url}
              alt={standardData.title}
            />
            <TextDisplay
              wrapperClass={[styles.text_display]}
              headerText={standardData.title}
              bodyTexts={standardData.details}
            />
          </section>
          <section className={styles.right_content}>
            <TextDisplay
              wrapperClass={[styles.text_display]}
              headerText='About'
              bodyTexts={[{ value: standardData.about }]}
            />
          </section>
        </>
      )}
    </article>
  );
}

function buildApiPath(searchType, itemId) {
  return `https://api.jikan.moe/v3/${searchType}/${itemId}`;
}

//The data returned is different depending on the search type(anime|character)
//This function converts the data to a standard type.
function normalizeData(data) {
  if (!data.mal_id) return {};

  const resourceType = data.synopsis ? 'anime' : 'character';

  const finalData = {};
  finalData.image_url = data.image_url;
  finalData.details = [];

  switch (resourceType) {
    case 'anime':
      finalData.title = data.title;
      finalData.about = data.synopsis;
      finalData.details.push({ key: 'Episodes', value: data.episodes });
      finalData.details.push({ key: 'Status', value: data.status });
      finalData.details.push({ key: 'Aired', value: data.aired.string });
      finalData.details.push({ key: 'Duration', value: data.duration });
      finalData.details.push({ key: 'Rating', value: data.rating });
      finalData.details.push({ key: 'Score', value: data.score });
      finalData.details.push({ key: 'Rank', value: data.rank });
      //build a string of genre names
      const genres = data.genres
        .map((obj) => {
          return obj.name;
        })
        .join(', ');
      finalData.details.push({ key: 'Genres', value: genres });
      break;

    case 'character':
      finalData.title = data.name;
      finalData.about = data.about;
      finalData.details.push({
        key: 'Member Favorites',
        value: data.member_favorites,
      });
      break;

    default:
      break;
  }
  return finalData;
}

export default Information;
