const Project = require('../models/Project');

exports.createProject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const clerkUserId = req.auth.userId;

    const project = new Project({
      name,
      description,
      clerkUserId,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const clerkUserId = req.auth.userId;
    const projects = await Project.find({ clerkUserId }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkUserId = req.auth.userId;

    const project = await Project.findOne({ _id: id, clerkUserId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkUserId = req.auth.userId;
    const { name, description, fileTree } = req.body;

    const project = await Project.findOneAndUpdate(
      { _id: id, clerkUserId },
      { name, description, fileTree },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const clerkUserId = req.auth.userId;

    const project = await Project.findOneAndDelete({ _id: id, clerkUserId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
};
