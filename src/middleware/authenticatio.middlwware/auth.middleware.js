const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const bcrypt = require('bcryptjs');


const authMiddleware = async (req, res, next) => {
  // const token = req.cookies.access_token;
  
  // if (!token) {
  //   return res.redirect('/login'); 
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Rijvan1116c');
  //   const user = await db.User.findByPk(decoded.id);
  //   const session_token = await db.Session.findOne({ where: { session_token : decoded.session_token } });
  //   if (user && session_token) {
  //     req.user = { id: decoded.id, userName: user.dataValues.first_name + ' ' + user.dataValues.last_name, session_token : decoded.session_token };
  //     next(); 
  //   } else {
  //     res.clearCookie('access_token');
  //     return res.redirect('/login'); 
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.clearCookie('access_token');
  //   return res.redirect('/login');
  // }
  req.user = 1
  next();
  
};

module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Assuming the token contains user information
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;
