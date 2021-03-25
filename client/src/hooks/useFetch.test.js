import { render, cleanup, waitFor } from '@testing-library/react';
import useFetch from './useFetch';
import mockedAxios from 'axios';

afterEach(cleanup);
jest.mock('axios');

describe('tests the useFetch hook', () => {
  it('should fetch data', async () => {
    const mockedData = {
      data: [{ id: 1, text: 'data' }],
    };

    mockedAxios.get.mockResolvedValueOnce(mockedData);

    const { getByText } = render(<DummyComponent />);

    getByText('loading');

    await waitFor(() => {
      getByText(mockedData.data[0].text);
    });
  });
});

function DummyComponent() {
  const { data, isLoading } = useFetch('/');
  return <div>{isLoading ? 'loading' : data[0].text}</div>;
}
