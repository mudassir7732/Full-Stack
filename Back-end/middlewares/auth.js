// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;

// const authenticate = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.status(403).json({ message: 'Token required' });
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticate;


const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({ message: 'Token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // Extract the user's role from the decoded token
    const { role } = decodedToken;
    // Attach the role to the request object for further use
    req.userRole = role;
    next();
  });
};

module.exports = authenticate;
