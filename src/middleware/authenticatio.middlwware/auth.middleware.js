const jwt = require('jsonwebtoken');
const db = require('../../models/index');
const { generalResponse } = require('../../helpers/response/general.response');
const { STATUS_MESSAGE, STATUS_CODE } = require('../../helpers/constants/statuscode');
const logger = require("../../config/pino.config");

const authMiddleware = async (req, res, next) => {

  if (!req.headers.authorization) {
    return generalResponse(res, null, 'Token Not Found', STATUS_MESSAGE.UNAUTHORIZED, true, STATUS_CODE.UNAUTHORIZED)
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'Rijvan1116c');
    req.user = decoded.id
    next();

  } catch (error) {
    logger.error(error);
    return generalResponse(res, null, 'Token Expired or Server Error', STATUS_MESSAGE.UNAUTHORIZED, true, STATUS_CODE.UNAUTHORIZED)
  }

};

module.exports = authMiddleware;
