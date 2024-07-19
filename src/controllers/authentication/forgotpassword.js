const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const bcrypt = require('bcryptjs');
const Users = db.users;
const { z } = require('zod');
const { sendEmail } = require("../../services/sendmail");

const generateOtpSchema = z.object({
  email: z.string().min(1).email(),
});

const verifyOtpSchema = z.object({
  email: z.string().min(1).email(),
  otp: z.string().min(6).max(6),
  password: z.string().min(5),
});

exports.generateOtp = async (req, res) => {
  try {
    generateOtpSchema.parse(req.body);

    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return generalResponse(res, null, 'User not found', STATUS_MESSAGE.NOT_FOUND, true, STATUS_CODE.NOT_FOUND)
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await Users.update({ otp }, { where: { email: req.body.email } });
    html = `
    <h2>Hi ${user.first_name},</h2>
    </br>
    <p>You requested a password reset for your Time Tracking account. Please use the following OTP to reset your password: ${otp}</p>
    `;

    // send otp in  mail 
    await sendEmail(req.body.email,'Time Tracking','forgot password',html);

    return generalResponse(res, { otp }, 'OTP sent successfully', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.SUCCESS);
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return generalResponse(res, error, 'Please Enter Valid Input', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
    }
    return generalResponse(res, null, 'Invalid request', STATUS_MESSAGE.BAD_REQUEST, true, STATUS_CODE.BAD_REQUEST)
  }
}

exports.verifyOtp = async (req, res) => {
  try {

    verifyOtpSchema.parse(req.body);

    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return generalResponse(res, null, 'User not found', STATUS_MESSAGE.NOT_FOUND, true, STATUS_CODE.NOT_FOUND)
    }

    if (user.otp != req.body.otp) {
      return generalResponse(res, null, 'Invalid OTP', STATUS_MESSAGE.UNAUTHORIZED, true, STATUS_CODE.UNAUTHORIZED)
    }

    const password = bcrypt.hashSync(req.body.password, 10);
    await Users.update({ password }, { where: { email: req.body.email } });

    return generalResponse(res, null, 'Password reset successful', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.SUCCESS);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return generalResponse(res, error, 'Please Enter Valid Input', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
    }
    console.error(error);
    return generalResponse(res, null, 'Invalid request', STATUS_MESSAGE.BAD_REQUEST, true, STATUS_CODE.BAD_REQUEST)
  }
}