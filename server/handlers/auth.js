module.exports = {
  signInHandler: (request, response) => {
    //get the email that was attached by the middleware
    const { email } = request.user;

    response.json({ email });
  },
};
