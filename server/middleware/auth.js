const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID =
  '551677784136-vdhqs4kj3go0s4g04m36afqrlffrhv41.apps.googleusercontent.com';

/**
 * Used to determine if access is granted to secure routes by verifying a token
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
async function auth(request, response, next) {
  const client = new OAuth2Client(CLIENT_ID);
  const token = request.body.token;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload['email'];
    request.user = { email };
    next();
  } catch (error) {
    response.status(400).json({ msg: 'Token is invalid.', error });
  }
}

module.exports = { auth };
