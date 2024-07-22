const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const bcrypt = require('bcryptjs');
const Users = db.users;
const Roles = db.roles;
const logger = require("../../config/pino.config");
const { z } = require('zod');

const registrationSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  mobile_number: z.string().min(10, { message: 'Mobile number should be 10 digits' }).max(10, { message: 'Mobile number should be 10 digits' }).regex(new RegExp(/^[0-9]+$/), 'Please Enter Only Number'),
  password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
  confirm_password: z.string().min(5, { message: 'Password should be at least 5 characters long' }),
}).refine((data) => data.password == data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
})

exports.registration = async (req, res) => {
  const { first_name, last_name, email, gender, mobile_number, password } = req.body;

  try {

    registrationSchema.parse(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);

    const simpleUser = await Roles.findOne({
      where: {
        role_name: 'user',
      },
      attributes: ['id']
    })

    await Users.create({
      role_id: simpleUser.id,
      first_name,
      last_name,
      email,
      gender,
      mobile_number,
      password: hashedPassword
    });
    return generalResponse(res, null, "Registration successfully", STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.CREATED)

  } catch (error) {
    if (error instanceof z.ZodError) {
      return generalResponse(res, error, 'Please Enter Valid Input', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
    }
    logger.error(error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }

}