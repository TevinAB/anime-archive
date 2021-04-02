import React from 'react';
import { Provider } from 'react-redux';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Information from './pages/Information';
import Login from './pages/Login';
import store from './redux/store';
import CommentBox from './components/CommentBox';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Route path='/' render={(props) => <NavBar {...props} />} />

          <Container containerClass={[styles.container]} role='main'>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} />} />

              <Route
                path='/search/:searchType'
                render={(props) => <SearchResults {...props} />}
              />

              <Route
                path='/information/:searchType'
                render={(props) => <Information {...props} />}
              />

              <Route
                exact
                path='/login'
                render={(props) => <Login {...props} />}
              />
              <Route path='/commentsDev'>
                <CommentBox
                  likes={'1,200'}
                  username='Tevin Banton'
                  imageUrl='https://lh3.googleusercontent.com/a-/AOh14GgGicxP3fkRpTXGPMhSF6q0w0CrXI3uQeOI85q3=s96-c'
                  commentBody='comment section passes a function to commentBox and addComment which is called when
                  a user presses the POST button.'
                />
              </Route>
            </Switch>
          </Container>
        </Provider>
      </Router>
    </>
  );
}

export default App;
