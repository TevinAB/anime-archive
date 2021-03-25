import React from 'react';
import Container from './components/Container';
import Search from './components/Search';

function App() {
  console.log('App re-rendered');
  return (
    <Container style={{ marginTop: '2rem' }}>
      <Search />
    </Container>
  );
}

export default App;
