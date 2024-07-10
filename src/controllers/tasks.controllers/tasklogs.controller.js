const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const TaskLog = db.tasks_time_logs;
const { startOfDay, endOfDay, differenceInMinutes } = require('date-fns');
// console.log(db.tasks_time_logs);
// exports.getTasks = async (req, res) => {
//   try {
//     const userId = req.user;
//     if (req.params.id) {
//       const tasks = await Tasks.findOne({
//         where: { id: req.params.id, user_id: userId },
//         include: [{ model: Attachments }, { model : db.tasks }],
//       });
//       return generalResponse(res,tasks,null,STATUS_MESSAGE.SUCCESS,false,STATUS_CODE.FETCH);
//     } else {

//       const tasks = await Tasks.findAll({
//         where: { user_id: userId },
//         include: [{ model: Attachments }, { model : db.category }],
//       });
//       return generalResponse(res,tasks,null,STATUS_MESSAGE.SUCCESS,false,STATUS_CODE.FETCH);
//     }

//   } catch (error) {
//     console.log(error);
//     return rgeneralResponse(res,null,'Internal Server Error',STATUS_MESSAGE.ERROR,true,STATUS_CODE.ERROR)
//   }
// }


exports.addTaskTimeLog = async (req, res) => {
  console.log("called",req.body);
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
        return generalResponse(res, null, 'Task is already started', STATUS_MESSAGE.FAILED, true, STATUS_CODE.CONFLICT);
      }

      const payload = {
        user_id: userId,
        task_id: taskId,
        start_datetime: new Date(),
      };

      await TaskLog.create(payload);

      return generalResponse(res, null, 'Task started', STATUS_MESSAGE.SUCCESS, true, STATUS_CODE.CREATED);
    } else {
      const existingLog = await TaskLog.findOne({
        where: {
          task_id: taskId,
          user_id: userId,
          start_datetime: { [db.Sequelize.Op.gte]: startOfDay(new Date()) },
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
    console.log(error);
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR);
  }
}

exports.lastLog = async () => {

  try {
    const userId = req.user;
    const taskId = req.body.task_id;

    const lastLog = await TaskLog.findOne({
      where: {
        task_id: taskId,
        user_id: userId,
        end_datetime: null,
      },
      order: [['id', 'DESC']],
    });

    if (!lastLog) {
      return generalResponse(res, 'end', 'No active task found for this user and task', STATUS_MESSAGE.ERROR, true, STATUS_CODE.NOT_FOUND);
    } else {
      return generalResponse(res, 'start', null, STATUS_MESSAGE.SUCCESS, false, STATUS_CODE.FETCH);
    }

  } catch (error) {
    return generalResponse(res, null, 'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}

// Check if the last task log is a start
// const lastLog = await TaskLog.findOne({
//   where: {
//     task_id: taskId,
//     user_id: userId,
//     end_datetime: null,
//   },
//   order: [['id', 'DESC']],
// });

// if (lastLog) {
//   // If the last log is a start, return a message indicating that the task is already started
//   return generalResponse(res, null, 'Task is already started', STATUS_MESSAGE.FAILED, true, STATUS_CODE.CONFLICT);
// } else {
//   // If the last log is not a start, create a new start log
//   const payload = {
//     user_id: userId,
//     task_id: taskId,
//     start_datetime: new Date(),
//   };

