const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const { fetchAllUsers } = require("../../repositories/userRepository");
const db = require("../../models/index");
const { users, tasks, tasks_time_logs } = db;
const { Op } = require('sequelize');
const { startOfDay, endOfDay, eachMonthOfInterval, startOfMonth, endOfMonth } = require('date-fns');


exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await fetchAllUsers();
    return generalResponse(res, allUsers, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
  } catch (error) {
    console.error("Error fetching users:", error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}


exports.activeUsers = async (req, res) => {
  try {
    const today = new Date();
    const startOfDayToday = startOfDay(today);
    const endOfDayToday = endOfDay(today);

    const activeUsersCount = await tasks_time_logs.count({
      distinct: true,
      col: 'user_id',
      where: {
        [Op.or]: [
          { start_datetime: { [Op.between]: [startOfDayToday, endOfDayToday] } },
          { end_datetime: { [Op.between]: [startOfDayToday, endOfDayToday] } },
        ],
      },

    });

    return generalResponse(res, activeUsersCount, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
  } catch (error) {
    console.log(error);
    return generalResponse(res, 0, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
};

exports.userProgressChart = async (req, res) => {
  try {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);

    const months = eachMonthOfInterval({
      start: startOfYear,
      end: endOfYear,
    });

    const userStatsPromises = months.map(async (month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const userCount = await users.count({
        where: {
          created_at: {
            [Op.between]: [monthStart, monthEnd],
          },
        },
      });

      return {
        month: monthStart,
        userCount,
      };
    });

    const userStats = await Promise.all(userStatsPromises);

    return generalResponse(res,userStats,null,STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH)
  } catch (error) {
    console.log(error);
    return generalResponse(res, [], 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}