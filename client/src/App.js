import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavBar />
      <Container containerClass={styles.container}>
        <Router>
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} />} />

            <Route path='/information'>
              <div>Info</div>
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
