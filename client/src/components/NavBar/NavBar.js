import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Search from '../Search';
import IconButton from '../IconButton';
import { signOut } from '../../redux/auth';

function NavBar(props) {
  const { history } = props;
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const searchClasses = classNames(
    styles.search_container,
    showSearch ? styles.search_visible : ''
  );

  return (
    <>
      <header role='banner' className={styles.header}>
        <Link to='/' className={styles.link}>
          <h3 className={styles.logo}>AnimeArchive</h3>
        </Link>

        <Search id='search' rootClass={[searchClasses]} history={history} />
        <div className={styles.button_container}>
          {/**should only show on small screens */}
          <IconButton
            iconClass={[styles.md_icon, 'fas fa-search']}
            tooltip={'search'}
            ariaLabel={'search'}
            onClick={() => setShowSearch(!showSearch)}
            toolTipClass={[styles.search_button]}
          />
          {/**should show login/logout depending on auth state */}
          {!isAuthenticated ? (
            <IconButton
              iconClass={[styles.md_icon, 'fas fa-sign-in-alt']}
              tooltip={'login'}
              ariaLabel={'login'}
              onClick={() => (window.location = '/login')}
            />
          ) : (
            <IconButton
              iconClass={[styles.md_icon, 'fas fa-sign-out-alt']}
              tooltip={'logout'}
              ariaLabel={'logout'}
              onClick={() => {
                var auth2 = window.gapi.auth2.getAuthInstance();
                auth2.signOut();
                dispatch(signOut());
              }}
            />
          )}
        </div>
      </header>
    </>
  );
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NavBar;
