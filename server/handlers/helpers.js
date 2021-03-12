async function editHandler(res, updateDoc, errorMsg) {
  try {
    const updatedDoc = await updateDoc();
    res.json(updatedDoc);
  } catch (error) {
    res.status(400).json({ msg: errorMsg });
  }
}

/**
 * Updates a document found using the document's Id and saves it to the database.
 * @param {*} docId - the id to use in finding a document
 * @param {*} model -  the model object of the document
 * @param {*} updateFunc - callback function to update the document's field(s)
 * @returns A promise that resolves to the updated document.
 */
function updateAndSaveDoc(docId, model, updateFunc) {
  if (!docId) throw TypeError('Document id cannot be null or undefined');

  if (!model) throw TypeError('Model cannot be null or undefined');

  if (typeof updateFunc !== 'function')
    throw TypeError('Update func must be an function.');

  return new Promise(async (resolve, reject) => {
    try {
      const document = await model.findById(docId);

      updateFunc(document);

      const updatedDoc = await document.save();
      resolve(updatedDoc);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { editHandler, updateAndSaveDoc };
