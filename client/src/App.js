import React from 'react';
import styles from './App.module.scss';
import Container from './components/Container';
import AnimeCard from './components/AnimeCard';

function App() {
  return (
    <Container style={{ marginTop: '2rem' }}>
      <AnimeCard
        image='https://cdn.myanimelist.net/images/anime/8/41125.jpg?s=78a6e73a2cd5856b28d8c182cd5a1a22'
        alt='fate/zero'
        title='Fate/Zero'
        score='Score: 9.7'
        badgeValue='1'
      />
    </Container>
  );
}

export default App;
