import Container from './components/Container';
import TextDisplay from './components/TextDisplay';

function App() {
  // const bodyTexts = [
  //   { key: 'Episodes', value: '26' },
  //   { key: 'Popularity', value: '9.87' },
  //   { key: 'Status', value: 'Finished' },
  //   { key: 'Duration', value: '23 min. per ep' },
  // ];

  const bodyTexts = [
    {
      value: `In the dawn of the 21st century, magic, long thought to be folklore and fairy tales, has become a systematized technology and is taught as a technical skill. In First High School, the institution for magicians, students are segregated into two groups based on their entrance exam scores: "Blooms," those who receive high scores, are assigned to the First Course, while "Weeds" are reserve students assigned to the Second Course.

  Mahouka Koukou no Rettousei follows the siblings, Tatsuya and Miyuki Shiba, who are enrolled in First High School. Upon taking the exam, the prodigious Miyuki is placed in the First Course, while Tatsuya is relegated to the Second Course. Though his practical test scores and status as a "Weed" show him to be magically inept, he possesses extraordinary technical knowledge, physical combat capabilities, and unique magic techniques—making Tatsuya the irregular at a magical high school.`,
    },
  ];

  return (
    <Container>
      <TextDisplay
        headerText='The Irregular at Magic High School'
        bodyTexts={bodyTexts}
      />
    </Container>
  );
}

export default App;
