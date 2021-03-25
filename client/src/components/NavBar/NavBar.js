import React, { useState } from 'react';
import styles from './NavBar.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Search from '../Search';
import IconButton from '../IconButton';

function NavBar(props) {
  const [showSearch, setShowSearch] = useState(false);

  const searchClasses = classNames(
    styles.search_container,
    showSearch ? styles.search_visible : ''
  );

  return (
    <>
      <header className={styles.header}>
        <h3 className={styles.logo}>AnimeArchive</h3>
        <Search id='search' rootClass={[searchClasses]} />
        <div className={styles.button_container}>
          {/**should only show on small screens */}
          <IconButton
            iconClass={[styles.md_icon, 'fas fa-search']}
            tooltip={'search'}
            ariaLabel={'search'}
            onClick={() => setShowSearch(!showSearch)}
            toolTipClass={[styles.search_button]}
          />

          <IconButton
            iconClass={[styles.md_icon, 'fas fa-cog']}
            tooltip={'settings'}
            ariaLabel={'settings'}
            onClick={() => console.log('clicked')}
          />
          {/**should show login/logout depending on auth state */}
          <IconButton
            iconClass={[styles.md_icon, 'fas fa-user']}
            tooltip={'login'}
            ariaLabel={'login'}
            onClick={() => console.log('clicked')}
          />
        </div>
      </header>
    </>
  );
}

export default NavBar;
