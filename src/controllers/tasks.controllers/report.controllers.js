const { startOfDay, startOfMonth,subDays, startOfYear, endOfDay, endOfMonth, endOfYear, format } = require('date-fns');
const db = require("../../models/index");
const { Op } = require('sequelize');
const { generalResponse } = require('../../helpers/response/general.response');
const { STATUS_MESSAGE, STATUS_CODE } = require('../../helpers/constants/statuscode');
const tasks = db.tasks;
const tasks_time_logs = db.tasks_time_logs;

exports.reportData = async (req, res) => {
  try {
    const reportType = req.body.reportType;
    const userId = req.user;
    let startDate, endDate;

    switch (reportType) {
      case 'day':
        startDate = startOfDay(new Date());
        endDate = endOfDay(new Date());
        break;
      case 'month':
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case 'year':
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
      default:
        throw new Error('Invalid report type');
    }

    const reportData = await tasks.findAll({
      where: { user_id: userId },
      include: [{
        model: tasks_time_logs,
        where: {
          start_datetime: {
            [Op.between]: [startDate, endDate]
          }
        },
        required: true
      },
      {
        model: db.category,
        attributes: ['name']
      }
      ]
    });

    const formattedReport = reportData.map(task => ({
      id: task.id,
      category_name: task.category.name,
      title: task.title,
      totalHours: task.tasks_time_logs.reduce((acc, log) => acc + log.duration, 0)
    }));

    return generalResponse(res, formattedReport, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);

  } catch (error) {
    console.error('Error generating report:', error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}

exports.daycompare = async (req, res) => {
  const userId = req.user;

  try {
    const today = new Date();
    const yesterday = subDays(today, 1);

    const todayTasks = await tasks.count({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [startOfDay(today), endOfDay(today)]
        }
      }
    });

    const yesterdayTasks = await tasks.count({
      where: {
        user_id: userId,
        created_at: {
          [Op.between]: [startOfDay(yesterday), endOfDay(yesterday)]
        }
      }
    });

    console.log(todayTasks,yesterdayTasks);

    res.json({
      todayTasks,
      yesterdayTasks
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
}