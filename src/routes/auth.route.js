const express = require("express");
const { registration } = require("../controllers/authentication/registation.controller");
const { login } = require("../controllers/authentication/login.controller");
// const { checkrole } = require("../controllers/authentication/checkrole");
const { generateOtp, verifyOtp } = require("../controllers/authentication/forgotpassword");
const authRouter = express.Router();

authRouter.post('/api/registation', registration);
authRouter.post('/api/login', login);
authRouter.post('/api/generateotp', generateOtp);
authRouter.post('/api/verifyotp', verifyOtp);

module.exports = authRouter;
