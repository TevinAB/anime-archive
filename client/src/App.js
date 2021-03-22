import Container from './components/Container';
import NavItem from './components/NavItem';

function App() {
  return (
    <Container>
      <div>Hello</div>
      <NavItem
        href='/'
        text='settings'
        iconClass={['fas fa-cog']}
        toolTip='settings'
      />
    </Container>
  );
}

export default App;
