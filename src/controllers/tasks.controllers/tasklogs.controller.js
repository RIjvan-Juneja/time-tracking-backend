const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const TaskLog = db.tasks_time_logs;
const { Op } = require('sequelize');
const { startOfDay, startOfToday, endOfToday, endOfDay, differenceInMinutes } = require('date-fns');
const logger = require("../../config/pino.config");

exports.getLogsById = async (req,res) => {
  try {
    const task_id = req.params.id || 0;
    const user_id = req.user || 0;

    const todayStart = startOfToday();
    const todayEnd = endOfToday();

    const taskLogs = await TaskLog.findAll({
      where: {
        task_id,
        user_id,
        [Op.or]: [
          {
            start_datetime: {
              [Op.between]: [todayStart, todayEnd],
            },
          },
          {
            end_datetime: {
              [Op.between]: [todayStart, todayEnd],
            },
          },
          {
            [Op.and]: [
              {
                start_datetime: {
                  [Op.lte]: todayEnd,
                },
              },
              {
                end_datetime: {
                  [Op.is]: null,
                },
              },
            ],
          },
        ],
      },
    });
    return generalResponse(res, taskLogs, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);

  } catch (error) {
    console.error(error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}

exports.addTaskTimeLog = async (req, res) => {
  console.log("called", req.body);
  try {
    const userId = req.user;
    const taskId = req.body.task_id;
    const reqType = req.body.req_type;

    // console.log(userId,taskId,isStart);

    if (reqType === 'start') {
      const existingLog = await TaskLog.findOne({
        where: {
          task_id: taskId,
          user_id: userId,
          end_datetime: null,
        },
      });

      if (existingLog) {
        return generalResponse(res, null, 'Task is already started', STATUS_MESSAGE.ERROR, true, 400);
      }

      const payload = {
        user_id: userId,
        task_id: taskId,
        start_datetime: new Date(),
      };

      console.log(payload,"**************payload***********");

      await TaskLog.create(payload);

      return generalResponse(res, null, 'Task started', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.CREATED);
    } else {
      const existingLog = await TaskLog.findOne({
        where: {
          task_id: taskId,
          user_id: userId,
          start_datetime: { [db.Sequelize.Op.ne]: null },
          end_datetime: null,
        },
      });

      if (!existingLog) {
        return generalResponse(res, null, 'No active task found for this user and task', STATUS_MESSAGE.ERROR, true, STATUS_CODE.NOT_FOUND);
      }

      existingLog.end_datetime = new Date();
      existingLog.duration = differenceInMinutes(existingLog.end_datetime, existingLog.start_datetime);

      await existingLog.save();

      return generalResponse(res, null, 'Task ended', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.UPDATED);
    }
  } catch (error) {
    logger.error(error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR);
  }
}

exports.lastLog = async (req,res) => {

  try {
    const userId = req.user;
    const taskId = req.params.id || 0;

    const lastLog = await TaskLog.findOne({
      where: {
        task_id: taskId,
        user_id: userId,
        end_datetime: null,
      },
      order: [['id', 'DESC']],
    });

    if (lastLog) {
      return generalResponse(res, 'end', 'task is running', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.FETCH);
    } else {
      return generalResponse(res, 'start', 'task is paused', STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
    }

  } catch (error) {
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}

exports.runningTask = async (req,res) => {
  try {
    const userId = req.user;

    const runningTask = await TaskLog.findAll({
      where: {
        user_id: userId,
        end_datetime: null,
      }
    });

    if (runningTask) {
      return generalResponse(res, runningTask, null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
    } else {
      return generalResponse(res, [], 'No active task found for this user and task', STATUS_MESSAGE.ERROR, true, STATUS_CODE.NOT_FOUND);
    }
    
  } catch (error) {
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}
