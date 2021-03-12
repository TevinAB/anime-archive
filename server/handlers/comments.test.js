const { editHandler, updateAndSaveDoc } = require('./helpers');

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

describe('UpdateAndSaveDoc tests', () => {
  let newData = 'new data'; //used to test update function
  let documentId = 123;
  let mockModel = {
    findById: jest.fn(() => {
      return mockDocument;
    }),
  };
  let mockDocument; //the document returned by the model
  let mockUpdateFunction = jest.fn((document) => (document.data = newData));

  //reset the document before each test
  beforeEach(() => {
    mockDocument = {
      data: 'old data',
      save: jest.fn(() => mockDocument),
    };
  });

  it('should update a document using the given update callback function', async () => {
    let updatedDocument = await updateAndSaveDoc(
      documentId,
      mockModel,
      mockUpdateFunction
    );

    expect(updatedDocument.data).toBe(newData);
  });

  it('should save the document', async () => {
    await updateAndSaveDoc(documentId, mockModel, mockUpdateFunction);

    expect(mockDocument.save.mock.calls.length).toBe(1);
  });

  it('should use the id to find the document', async () => {
    await updateAndSaveDoc(documentId, mockModel, mockUpdateFunction);

    expect(mockModel.findById).toBeCalledWith(documentId);
  });
});
