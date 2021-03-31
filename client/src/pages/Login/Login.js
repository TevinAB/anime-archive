import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Login.module.scss';
import classNames from 'classnames';
import { checkTokenIntegrity } from '../../redux/auth';

function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const googleButtonClasses = classNames('g-signin2', styles.googleButton);

  window.onGoogleSignIn = function (googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    dispatch(checkTokenIntegrity(idToken));
  };

  return (
    <section className={styles.login_wrapper}>
      <h3>Connect with Google</h3>
      {isAuthenticated ? (
        <h5>Already logged in.</h5>
      ) : (
        <div
          className={googleButtonClasses}
          data-onsuccess='onGoogleSignIn'
        ></div>
      )}
    </section>
  );
}

export default Login;
