import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks';
import styles from './SearchResults.module.scss';
import InfoBox from '../../components/InfoBox';
import ReactPaginate from 'react-paginate';

function SearchResults(props) {
  const { history } = props;
  const { searchType } = props.match.params;
  //url's query string
  const [queryString, setQueryString] = useState(window.location.search);

  useEffect(() => {
    //listen for change in url, returns a clean up function to unlisten
    return history.listen((location) => {
      setQueryString(location.search);
    });
  });

  const params = new URLSearchParams(queryString);
  const searchText = params.get('q');
  const pageNum = params.get('page');
  const apiPath = buildSearchPath(searchType, searchText, pageNum);

  const { data, isLoading } = useFetch(apiPath);

  const handlePageChange = (page) => {
    //weird glitch with page num starting from zero instead of 1 with pagination component
    let num = page.selected + 1;

    history.push(`/search/${searchType}/?q=${searchText}&page=${num}`);
  };

  const items = data?.results?.map((item) => {
    return (
      <InfoBox
        imageClass={[styles.img]}
        mainWrapperClass={[styles.info_box_wrapper]}
        key={item.mal_id}
        imagePath={item.image_url}
        onClick={() =>
          history.push(`/information/${searchType}/?id=${item.mal_id}`)
        }
        onKeyDown={(event) =>
          event.key === 'Enter' ? event.target.click() : ''
        }
        //Data has different fields depending on resource type. Anime->title | Character->name
        title={item.title || item.name}
        //Displays a synopsis with each search item if that field is available
        bodyTexts={[{ value: item.synopsis ? item.synopsis : '' }]}
        tabIndex={0}
        //to prevent it from going into focus immediately after loading.
        activeIndex={-99}
      />
    );
  });

  return (
    <section className={styles.section_wrapper}>
      <h1 className={styles.page_title}>Search Results</h1>
      <div className={styles.item_wrapper}>
        {isLoading ? 'loading...' : items}
      </div>
      <div className={styles.pagination_container}>
        <ReactPaginate
          containerClassName={styles.pagination}
          activeClassName={styles.active_page}
          pageCount={data?.last_page}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel='prev'
          nextLabel='next'
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

function buildSearchPath(searchType, searchText, pageNum) {
  return `https://api.jikan.moe/v3/search/${searchType}?q=${searchText}&page=${pageNum}`;
}

export default SearchResults;
