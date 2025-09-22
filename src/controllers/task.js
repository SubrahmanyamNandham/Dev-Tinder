const Task = require('../models/task');

// CREATE
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ title, description, status });
    res.status(201).json({ data: task });
  } catch (err) {
    next(err);
  }
};

// READ (list + single)
exports.listTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const numericLimit = Math.min(parseInt(limit, 10), 100);
    const skip = (parseInt(page, 10) - 1) * numericLimit;

    const filter = {};
    if (status) filter.status = status;

    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(numericLimit)
      .select('title status createdAt')
      .lean();

    const total = await Task.countDocuments(filter);

    res.json({ data: tasks, meta: { total, page, limit: numericLimit } });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ data: task });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateTask = async (req, res, next) => {
  try {
    const updates = (({ title, description, status }) => ({ title, description, status }))(req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).lean();
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ data: task });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).lean();
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ data: null });
  } catch (err) {
    next(err);
  }
};
