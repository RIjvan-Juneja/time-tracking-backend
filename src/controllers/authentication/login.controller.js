const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const bcrypt = require('bcryptjs');
const Users = db.users;
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const logger = require("../../config/pino.config");

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be at least 6 characters long" })
});

exports.login = async (req, res) => {
  try {

    loginSchema.parse(req.body);

    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email }, include: { model: db.roles } });
    if (!user) {
      return generalResponse(res, null, 'Invalid email or password', STATUS_MESSAGE.UNAUTHORIZED, true, STATUS_CODE.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {

      await db.login_logs.create({ email, status: 'failed' });

      return generalResponse(res, null, 'Invalid email or password', STATUS_MESSAGE.UNAUTHORIZED, true, STATUS_CODE.UNAUTHORIZED)
    }

    await db.login_logs.create({ email, status: 'success' });

    const token = jwt.sign({ id: user.id, roleId: user.role_id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    return generalResponse(res, { name: user.first_name, role: user.role.role_name, token }, 'Login successful', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.SUCCESS);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return generalResponse(res, error, 'Please Enter Valid Input', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
    }
    logger.error(error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)

  }
}