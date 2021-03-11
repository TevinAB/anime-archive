const { editHandler } = require('./comments');

describe('Edit handler tests', () => {
  let mockUpdateDoc = jest.fn(() => 'doc updated');
  let mockResponse;
  let errorMessage = 'error';

  //reset mockResponse before each test
  beforeEach(() => {
    mockResponse = {
      statusCode: null,
      json: jest.fn((obj) => obj),
      status: jest.fn((statusCode) => {
        mockResponse.statusCode = statusCode;
        return mockResponse;
      }),
    };
  });

  it('should call updateDoc() only once', async () => {
    await editHandler(mockResponse, mockUpdateDoc, errorMessage);

    expect(mockUpdateDoc.mock.calls.length).toBe(1);
  });

  it('should call response.json() only once for happy path', async () => {
    await editHandler(mockResponse, mockUpdateDoc, errorMessage);

    expect(mockResponse.json.mock.calls.length).toBe(1);
  });

  it('should call response.json() with the value from updateDoc()', async () => {
    await editHandler(mockResponse, mockUpdateDoc, errorMessage);

    expect(mockResponse.json).toBeCalledWith('doc updated');
  });

  it('should call response.status() only once for failing path', async () => {
    await editHandler(mockResponse, null, errorMessage);

    expect(mockResponse.status.mock.calls.length).toBe(1);
  });

  it('should have a status code of 400 for the failing path', async () => {
    await editHandler(mockResponse, null, errorMessage);

    expect(mockResponse.statusCode).toBe(400);
  });

  it('should call response.json() with the error message given for the failing path', async () => {
    await editHandler(mockResponse, null, errorMessage);

    expect(mockResponse.json).toBeCalledWith({ msg: errorMessage });
  });
});
