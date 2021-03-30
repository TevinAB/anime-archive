import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Information from './pages/Information';

function App() {
  return (
    <>
      <Router>
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
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
