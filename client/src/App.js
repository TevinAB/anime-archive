import Container from './components/Container';
import NavItem from './components/NavItem';
import IconButton from './components/IconButton';

function App() {
  const icon = (
    <IconButton
      iconClass={['fas fa-cog']}
      onClick={() => console.log('click')}
      tooltip='user'
    />
  );
  return (
    <Container>
      <div>Hello</div>
      <NavItem text='settings' icon={icon} />
    </Container>
  );
}

export default App;
