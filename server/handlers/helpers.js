/**
 * Updates a document using the updateDoc function and handles response.
 * @param {*} res The response object
 * @param {*} updateDoc A function to update the document
 * @param {*} errorMsg An error message to respond with.
 */
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

/**
 * Builds the comment list structure.
 * @param {*} sortedComments All the comments for a page, sorted by date or likes.
 * @returns A new array of all the comments in the correct order.
 */
function buildCommentList(sortedComments) {
  if (!sortedComments instanceof Array)
    new TypeError('sortedComments must be an array');

  //root comments are comments that have no root comment
  const rootComments = sortedComments.filter(
    (comment) => comment.rootComment === null
  );
  const result = [];

  //recursive function
  function build(array) {
    for (let index = 0; index < array.length; index++) {
      result.push(array[index]);

      //this comment has replies.
      if (array[index].replies.length > 0) {
        //build an array of comment objects using the ids from the replies array
        const commentObjs = [];

        array[index].replies.forEach((id) => {
          commentObjs.push(
            sortedComments.find((comment) => comment._id === id)
          );
        });

        //recursive call
        build(commentObjs);
      }
    }
  }

  build(rootComments);

  return result;
}

module.exports = { editHandler, updateAndSaveDoc, buildCommentList };
