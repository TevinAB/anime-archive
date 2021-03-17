import DataFetch from './DataFetch';
import { render, cleanup, waitFor } from '@testing-library/react';
import mockedAxios from 'axios';

jest.mock('axios');

afterEach(cleanup);

describe('<DataFetch />', () => {
  it('should pass data to the rendered prop', async () => {
    const result = {
      data: [{ id: 1, text: 'data' }],
    };

    const props = {
      path: '/',
      render: jest.fn((data) => <div />),
    };

    mockedAxios.get.mockResolvedValueOnce(result);

    render(<DataFetch {...props} />);

    await waitFor(() =>
      expect(props.render).toHaveBeenCalledWith([{ id: 1, text: 'data' }])
    );
  });
});
