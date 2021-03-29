import React from 'react';
import useFetch from '../../hooks';
import styles from './Home.module.scss';
import AnimeCard from '../../components/AnimeCard';
import PropTypes from 'prop-types';

const TOP_ANIME = 'TOP_ANIME';
const TOP_ANIME_AIRING = 'TOP_ANIME_AIRING';
const TOP_CHARACTERS = 'TOP_CHARACTERS';
const RESPONSE_LIMIT = 16;

function Home(props) {
  const { history } = props;
  return (
    <main>
      <DisplaySection
        sectionTitle='Top Anime'
        sectionType={TOP_ANIME}
        history={history}
      />
      <DisplaySection
        sectionTitle='Top Anime Airing'
        sectionType={TOP_ANIME_AIRING}
        history={history}
      />
      <DisplaySection
        sectionTitle='Top Characters'
        sectionType={TOP_CHARACTERS}
        history={history}
      />
    </main>
  );
}

function DisplaySection(props) {
  const { sectionType, sectionTitle, history } = props;
  const { data, isLoading, error } = useFetch(getPath(sectionType));

  //If resource type is anime or anime character
  const isAnime = sectionType.toLowerCase().includes('anime');

  const loadingView = 'Loading...';

  const errorView = 'An error has occured';

  const items = data.results?.map((item) => {
    return (
      <AnimeCard
        key={item.mal_id}
        image={item.image_url}
        alt={item.title}
        title={item.title}
        badgeValue={item.rank}
        onClick={() =>
          history.push(
            `/information/${isAnime ? 'anime' : 'character'}/?id=${item.mal_id}`
          )
        }
        //different type has different field in json response so type check is needed
        //anime->score | characters->favorites
        score={
          isAnime ? `Score: ${item.score}` : `Favorites: ${item.favorites}`
        }
      />
    );
  });

  return (
    <section className={styles.section}>
      <h3>{sectionTitle}</h3>
      <div className={styles.item_container}>
        {isLoading ? loadingView : items}
        {!isLoading && error && errorView}
      </div>
    </section>
  );
}

DisplaySection.propTypes = {
  sectionType: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string.isRequired,
};

function getPath(sectionType) {
  switch (sectionType) {
    case TOP_ANIME:
      return `/api/anime/anime/${RESPONSE_LIMIT}`;

    case TOP_ANIME_AIRING:
      return `/api/anime/anime/${RESPONSE_LIMIT}/airing`;

    case TOP_CHARACTERS:
      return `/api/anime/characters/${RESPONSE_LIMIT}`;

    default:
      return `/api/anime/anime/${RESPONSE_LIMIT}`;
  }
}

export default Home;
