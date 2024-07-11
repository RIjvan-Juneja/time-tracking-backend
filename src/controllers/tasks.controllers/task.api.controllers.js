const { STATUS_MESSAGE, STATUS_CODE } = require("../../helpers/constants/statuscode");
const { generalResponse } = require("../../helpers/response/general.response");
const db = require("../../models/index");
const Tasks = db.tasks;
const Attachments = db.attachments;

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user;
    if (req.params.id) {
      const tasks = await Tasks.findOne({
        where: { id: req.params.id, user_id: userId },
        include: [{ model: Attachments }, { model : db.tasks }, { model : db.tasks_time_logs }],
      });
      return generalResponse(res,tasks,null,STATUS_MESSAGE.SUCCESS,false,STATUS_CODE.FETCH);
    } else {

      const tasks = await Tasks.findAll({
        where: { user_id: userId },
        include: [{ model: Attachments }, { model : db.category }, { model : db.tasks_time_logs }],
      });
      return generalResponse(res,tasks,null,STATUS_MESSAGE.SUCCESS,false,STATUS_CODE.FETCH);
    }

  } catch (error) {
    console.log(error);
    return rgeneralResponse(res,null,'Internal Server Error',STATUS_MESSAGE.ERROR,true,STATUS_CODE.ERROR)
  }
}

exports.addTask = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const t = await db.sequelize.transaction();


  try {
    const userId = req.user;

    const payload = {
      tasksData: {
        user_id: userId,
        title: req.body.title || null,
        description: req.body.description || null,
        category_id: req.body.category || null,
      },

      attachments: {
        file_type: req.file.mimetype || "null",
        file_name: req.file.originalname || "null",
        path: req.file.path || "null",
      }
    }

    // add task   
    const taskInserted = await Tasks.create(payload.tasksData, { transaction: t });

    // add task id to attachments payload  for the attachment record
    payload.attachments.task_id = taskInserted.id;

    // add attachment with task id
    await Attachments.create(payload.attachments, { transaction: t });

    await t.commit();

    return generalResponse(res,null,'Task and Attachment added successfully',STATUS_MESSAGE.SUCCESS,true,STATUS_CODE.CREATED)

  } catch (error) {
    console.log(error);
    await t.rollback();
    return generalResponse(res,null,error,STATUS_MESSAGE.ERROR,true,STATUS_CODE.ERROR)
  }

}

exports.editTask = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const userId = req.user;
    const task_id = req.body.task_id || 0;

    const payload = {
      tasksData: {
        user_id: userId,
        title: req.body.title || null,
        description: req.body.description || null,
        category_id: req.body.category_id || null,
      },

      attachments: {
        task_id,
        file_type: req.body.file_type || "null",
        file_name: req.body.file_name || "null",
        path: req.body.file_url || "null",
      }
    }

    const hasTask = await Tasks.findOne({ where: { id: task_id, user_id: userId } });

    if (hasTask) {
      await Tasks.update(payload.tasksData, {
        where: {
          id: task_id,
        },
      }, { transaction: t });

      // Soft delete the attachment
      await Attachments.destroy({
        where: {
          task_id: task_id,
        },
      }, { transaction: t });

      await Attachments.create(payload.attachments, { transaction: t });

      await t.commit();

    } else {
      return res.send("Task Not Found")
    }

    return res.send("Task and Attachment added edited")

  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.send("error")
  }

}

exports.deleteTask = async (req, res) => {
  console.log("deleted Called");
  const t = await db.sequelize.transaction();

  try {
    const userId = req.user;
    const task_id = req.params.id || 0;

    const hasTask = await Tasks.findOne({ where: { id: task_id, user_id: userId } });

    if (hasTask) {
      await Tasks.destroy({
        where: {
          id: task_id,
        },
      }, { transaction: t });

      await Attachments.destroy({
        where: {
          task_id: task_id,
        },
      }, { transaction: t });

      await t.commit();

    } else {
      return generalResponse(res,null,'Data Not Found',STATUS_MESSAGE.NOT_FOUND,true,STATUS_CODE.NOT_FOUND)
    }
    
    return generalResponse(res,null,'Task and Attachment deleted',STATUS_MESSAGE.DELETED,true,STATUS_CODE.DELETE)

  } catch (error) {
    console.log(error);
    await t.rollback();
    return generalResponse(res,null,'Internal Server Error', STATUS_MESSAGE.ERROR, true, STATUS_CODE.ERROR)
  }
}

exports.getTasksByCategory = async (req, res) => {
  try {
    const userId = req.user;
    const category_id = req.params.id || 0;

    const tasks = await Tasks.findAll({
      where: { user_id: userId, category_id },
      include: [{ model: Attachments }],
    });

    return res.json(tasks);

  } catch (error) {
    console.log(error);
    return res.send("error")
  }
}

