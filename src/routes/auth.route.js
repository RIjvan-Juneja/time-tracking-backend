const express = require("express");
const { registration } = require("../controllers/authentication/registation.controller");
const { login } = require("../controllers/authentication/login.controller");
const authRouter = express.Router();

authRouter.post('/api/registation', registration);
authRouter.post('/api/login', login);

module.exports = authRouter;
