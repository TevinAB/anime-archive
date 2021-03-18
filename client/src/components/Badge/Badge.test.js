import Badge from './';
import { render, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Badge />', () => {
  it('should render badge with the given value', () => {
    const value = '12';
    const { getByText } = render(<Badge value={value} />);

    getByText(value);
  });
});
