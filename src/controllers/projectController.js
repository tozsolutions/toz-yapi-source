const Project = require('../models/Project');
const logger = require('../config/logger');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res, next) => {
  try {
    const query = { isActive: true };

    // Filtering
    const {
      status, type, priority, city,
    } = req.query;
    if (status) query.status = status;
    if (type) query.type = type;
    if (priority) query.priority = priority;
    if (city) query['location.city'] = city;

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Sorting
    const sort = req.query.sort || '-createdAt';

    const projects = await Project.find(query)
      .populate('team.projectManager', 'name email')
      .populate('team.architect', 'name email')
      .populate('team.engineer', 'name email')
      .populate('team.contractor', 'name email')
      .populate('team.members.user', 'name email')
      .sort(sort)
      .limit(limit)
      .skip(startIndex);

    const total = await Project.countDocuments(query);

    // Pagination result
    const pagination = {};
    if (startIndex + limit < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      pagination,
      data: projects,
    });
  } catch (error) {
    logger.error('Get projects error:', error);
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('team.projectManager', 'name email phone company')
      .populate('team.architect', 'name email phone company')
      .populate('team.engineer', 'name email phone company')
      .populate('team.contractor', 'name email phone company')
      .populate('team.members.user', 'name email phone')
      .populate('notes.author', 'name email')
      .populate('documents.uploadedBy', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    logger.error('Get project error:', error);
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    // Add user as project manager if not specified
    if (!req.body.team) {
      req.body.team = { projectManager: req.user.id };
    } else if (!req.body.team.projectManager) {
      req.body.team.projectManager = req.user.id;
    }

    const project = await Project.create(req.body);

    const populatedProject = await Project.findById(project._id)
      .populate('team.projectManager', 'name email')
      .populate('team.architect', 'name email')
      .populate('team.engineer', 'name email')
      .populate('team.contractor', 'name email');

    logger.info(`New project created: ${project.name} by user: ${req.user.id}`);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: populatedProject,
    });
  } catch (error) {
    logger.error('Create project error:', error);
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Check if user is authorized to update (project manager or admin)
    if (project.team.projectManager.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this project',
      });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('team.projectManager', 'name email')
      .populate('team.architect', 'name email')
      .populate('team.engineer', 'name email')
      .populate('team.contractor', 'name email');

    logger.info(`Project updated: ${project.name} by user: ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    logger.error('Update project error:', error);
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Check if user is authorized to delete (project manager or admin)
    if (project.team.projectManager.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this project',
      });
    }

    // Soft delete - set isActive to false
    project.isActive = false;
    await project.save();

    logger.info(`Project deleted: ${project.name} by user: ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {},
    });
  } catch (error) {
    logger.error('Delete project error:', error);
    next(error);
  }
};

// @desc    Get project status
// @route   GET /api/projects/:id/status
// @access  Private
const getProjectStatus = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).select('status progress timeline');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        status: project.status,
        progress: project.progress,
        timeline: project.timeline,
      },
    });
  } catch (error) {
    logger.error('Get project status error:', error);
    next(error);
  }
};

// @desc    Update project status
// @route   PUT /api/projects/:id/status
// @access  Private
const updateProjectStatus = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Check if user is authorized to update status
    if (project.team.projectManager.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update project status',
      });
    }

    const { status, progress } = req.body;

    if (status) {
      project.status = status;

      // Auto-update timeline based on status
      if (status === 'construction' && !project.timeline.actualStartDate) {
        project.timeline.actualStartDate = new Date();
      } else if (status === 'completed' && !project.timeline.actualEndDate) {
        project.timeline.actualEndDate = new Date();
      }
    }

    if (progress) {
      project.progress = { ...project.progress, ...progress };
      project.progress.lastUpdate = new Date();
    }

    await project.save();

    logger.info(`Project status updated: ${project.name} to ${status} by user: ${req.user.id}`);

    res.status(200).json({
      success: true,
      message: 'Project status updated successfully',
      data: {
        status: project.status,
        progress: project.progress,
        timeline: project.timeline,
      },
    });
  } catch (error) {
    logger.error('Update project status error:', error);
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectStatus,
  updateProjectStatus,
};
