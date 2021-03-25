import React, { useState, useRef, useEffect } from 'react';
import useFetch from '../../hooks';
import styles from './Search.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import InfoBox from '../InfoBox';

const SEARCH_RESULTS_LIMIT = 10;

function Search(props) {
  const { rootClass } = props;

  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('anime');
  const [isInputFocus, setInputFocus] = useState(true);
  const [clickedAway, setClickedAway] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);

  const { data, isLoading } = useFetch(buildPath(searchType, searchText));

  const rootClasses = classNames(styles.main_wrapper, rootClass);

  useEffect(() => {
    window.addEventListener('mousedown', handleClickAway);

    return () => window.removeEventListener('mousedown', handleClickAway);
  }, []);

  //if the user clicked out of the search area
  const handleClickAway = (event) => {
    if (searchRef.current && searchRef.current.contains(event.target)) {
      setClickedAway(false); //clicked inside the area
    } else {
      setClickedAway(true); //clicked out of search area
      setActiveIndex(-1); //reset the active index of search item so focus isn't locked
    }
  };

  const handleKeyDown = (event) => {
    //increases the active index and moves down the result list
    if (event.key === 'ArrowDown') {
      //if its about to go out of bounds, start over
      activeIndex >= SEARCH_RESULTS_LIMIT - 1
        ? setActiveIndex(0)
        : setActiveIndex(activeIndex + 1);
    }

    if (event.key === 'ArrowUp') {
      activeIndex <= 0
        ? setActiveIndex(SEARCH_RESULTS_LIMIT - 1)
        : setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      onFocus={() => setInputFocus(true)}
      onBlur={() => setInputFocus(false)}
      className={rootClasses}
      ref={searchRef}
      onKeyDown={handleKeyDown}
    >
      {/** The search box, remember to add action path to form*/}
      <form method='get'>
        <div className={styles.search_wrapper}>
          <select
            aria-label='search type'
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option>anime</option>
            <option>character</option>
          </select>
          <input
            className={styles.searchBox}
            type='text'
            role='search'
            placeholder='Search...'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </form>

      <SearchResults
        isInputFocus={isInputFocus}
        isLoading={isLoading}
        data={data}
        validSearch={searchText.length > 2}
        showResults={isInputFocus || !clickedAway} //show results if in focus or isn't clicked out of
        activeIndex={activeIndex}
      />
    </div>
  );
}

function SearchResults(props) {
  const { isLoading, data, validSearch, showResults, activeIndex } = props;

  //display results if search text is valid and loading is finished
  const resultDisplayClasses = classNames(
    validSearch && !isLoading ? styles.results : styles.remove
  );

  //hide results footer if loading is finished or search is invalid
  const resultFooterClasses = classNames(
    isLoading && validSearch ? styles.results_footer : styles.remove
  );

  return (
    showResults && (
      <div className={styles.results_wrapper}>
        <div className={resultDisplayClasses}>
          {data.results &&
            data.results.map((item, index) => {
              return (
                <InfoBox
                  imageClass={[styles.img]}
                  key={item.mal_id}
                  imagePath={item.image_url}
                  onClick={() => console.log('clicked')}
                  //Data has different fields depending on resource type. Anime->title | Character->name
                  title={item.title || item.name}
                  tabIndex={0}
                  currentIndex={index}
                  activeIndex={activeIndex}
                />
              );
            })}
        </div>
        <div className={resultFooterClasses}>{isLoading && 'loading'}</div>
      </div>
    )
  );
}

Search.propTypes = {
  rootClass: PropTypes.array,
};

SearchResults.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  validSearch: PropTypes.bool.isRequired,
  showResults: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

//accepts the text in the search bar and use it to build a path to the api
function buildPath(type, text) {
  if (text.length < 3) return '';
  return `https://api.jikan.moe/v3/search/${type}?q=${text}&page=1&limit=${SEARCH_RESULTS_LIMIT}`;
}

export default Search;
