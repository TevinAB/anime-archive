import React from 'react';
import Container from './components/Container';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '2rem' }}></Container>
    </>
  );
}

export default App;
