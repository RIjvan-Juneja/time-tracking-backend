const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const { fetchAllUsers } = require("../../repositories/userRepository");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await fetchAllUsers();
    return generalResponse(res, allUsers, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
  } catch (error) {
    console.error("Error fetching users:", error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}