const { STATUS_MESSAGE, STATUS_CODE } = require('../../helpers/constants/statuscode');
const { generalResponse } = require('../../helpers/response/general.response');
const { users, roles } = require('../../models/index');

const isPermission = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const userId = req.user;
      const user = await users.findByPk(userId, {
        include: {
          model: roles,
        }
      });

      if (!user) {
        return generalResponse(res, null, 'User Not Found', STATUS_MESSAGE.UNAUTHORIZED, false, STATUS_CODE.UNAUTHORIZED)
      }

      if (!requiredPermissions.includes(user.role.role_name)) {
        return generalResponse(res, null, 'Unauthorized User', STATUS_MESSAGE.UNAUTHORIZED, false, STATUS_CODE.UNAUTHORIZED)
      }

      next();
    } catch (error) {
      console.error(error);
      return generalResponse(res, null, 'Internal server error', STATUS_MESSAGE.ERROR, false, STATUS_CODE.ERROR)
    }
  };
};

module.exports = isPermission;
