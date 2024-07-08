const db = require("../../models/index");
const Tasks = db.tasks;
const Attachments = db.attachments;

exports.getTasks = async (req, res) => {
  try {
    const userId = req.user;
    if (req.params.id) {
      const tasks = await Tasks.findOne({
        where: { id: req.params.id, user_id: userId },
        include: [{ model: Attachments }],
      });
      return res.json(tasks);
    } else {

      const tasks = await Tasks.findAll({
        where: { user_id: userId },
        include: [{ model: Attachments }],
      });
      return res.json(tasks);
    }

  } catch (error) {
    console.log(error);
    return res.send("error")
  }
}

exports.addTask = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const userId = req.user;

    const payload = {
      tasksData: {
        user_id: userId,
        title: req.body.title || null,
        description: req.body.description || null,
        category_id: req.body.category_id || null,
      },

      attachments: {
        file_type: req.body.file_type || "null",
        file_name: req.body.file_name || "null",
        path: req.body.file_url || "null",
      }
    }

    // add task   
    const taskInserted = await Tasks.create(payload.tasksData, { transaction: t });

    // add task id to attachments payload  for the attachment record
    payload.attachments.task_id = taskInserted.id;

    // add attachment with task id
    await Attachments.create(payload.attachments, { transaction: t });

    await t.commit();

    return res.send("Task and Attachment added successfully")

  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.send("error")
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
    console.log(hasTask);

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
      return res.send("Task Not Found")
    }

    return res.send("Task and Attachment deleted")

  } catch (error) {
    console.log(error);
    await t.rollback();
    return res.send("error")
  }
}

