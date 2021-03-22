import InfoBox from './';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<InfoBox/>', () => {
  it('should render', () => {
    const title = 'Fate/Zero';
    const { getByText } = render(<InfoBox imagePath='/' headerText={title} />);

    getByText(title);
  });
});
