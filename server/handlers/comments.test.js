const { editHandler } = require('./comments');

describe('Edit handler', () => {
  let mockUpdateDoc = jest.fn(() => 'doc updated');
  let mockResponse = {
    statusCode: null,
    json: jest.fn((obj) => obj),
    status: jest.fn((statusCode) => {
      this.statusCode = statusCode;
      return this;
    }),
  };

  //reset mockResponse before each test

  it('ensures that the update doc function is called once', () => {
    editHandler(mockResponse, mockUpdateDoc, 'error');

    //expects mockUpdateDoc to be called once
    expect(mockUpdateDoc.mock.calls.length).toBe(1);
  });
});
