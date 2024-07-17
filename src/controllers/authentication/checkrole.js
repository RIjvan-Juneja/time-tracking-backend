const db = require("../../models/index");
const Users = db.users;
const Roles = db.roles;
const { generalResponse } = require("../../helpers/response/general.response");
const { where } = require("sequelize");
const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");

exports.checkrole = async (req, res) => {

  try {
    const userId = req.body.user_id;
    const user = await Users.findByPk(userId, {
      where: { id: req.body.user_id },
      include: {
        model: Roles,
        where: {
          role_name: req.body.user_type
        }
      }
    });

    if (!user) {
      return generalResponse(res, false, 'User Not found', STATUS_MESSAGE.UNAUTHORIZED, false, STATUS_CODE.UNAUTHORIZED);
    }
    return generalResponse(res, true, 'User found', STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.SUCCESS);
  } catch (error) {
    return generalResponse(res, true, 'unexpected error', STATUS_MESSAGE.ERROR, false, STATUS_CODE.ERROR);
  }

}