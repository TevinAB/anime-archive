import Container from './components/Container';
import IconButton from './components/IconButton';

function App() {
  return (
    <Container>
      <div>
        Hello
        <IconButton
          iconClass='fas fa-users'
          tooltip='profile'
          ariaLabel='profile'
          buttonType='submit'
          onClick={() => console.log('text')}
          iconStyle={{ color: '#999999' }}
        />
      </div>
    </Container>
  );
}

export default App;
