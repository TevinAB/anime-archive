import ToolTip from './';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

describe('<ToolTip />', () => {
  it('should show only on hover', async () => {
    let text = 'tooltip';
    const { getByText, queryByTestId } = render(<ToolTip text={text} />);
    let element = queryByTestId('tool-container');

    fireEvent.mouseEnter(element);
    getByText(text);

    fireEvent.mouseLeave(element);

    //This delays the test and allows 'unhover' to be done before checking
    setTimeout(() => {
      expect(getByText(text)).toBeNull();
    });
  });
});
