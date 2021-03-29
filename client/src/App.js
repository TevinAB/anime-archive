import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <Router>
        <Route path='/' render={(props) => <NavBar {...props} />} />

        <Container containerClass={[styles.container]}>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} />} />
            <Route
              path='/search/:searchType'
              render={(props) => <SearchResults {...props} />}
            />

            <Route path='/information'>
              <div>Info</div>
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
