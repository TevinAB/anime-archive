import IconButton from './';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('<IconButton/>', () => {
  it('should render and be clickable', () => {
    const handleClick = jest.fn();
    const { queryByTestId } = render(
      <IconButton
        iconClass='fas fa-users'
        onClick={handleClick}
        tooltip='tip'
      />
    );
    const element = queryByTestId('icon-button');
    fireEvent.click(element);

    expect(element).not.toBeNull();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
