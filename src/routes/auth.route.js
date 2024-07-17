const express = require("express");
const { registration } = require("../controllers/authentication/registation.controller");
const { login } = require("../controllers/authentication/login.controller");
const { checkrole } = require("../controllers/authentication/checkrole");
const authRouter = express.Router();

authRouter.post('/api/registation', registration);
authRouter.post('/api/login', login);
authRouter.post('/api/checkrole', checkrole);


module.exports = authRouter;
