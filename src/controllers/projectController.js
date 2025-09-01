import { validationResult } from 'express-validator';
import Project from '../models/Project.js';
import { logger } from '../config/logger.js';

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Private
export const getProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // Regular users can only see their own projects
    if (req.user.role === 'user') {
      filter.owner = req.user.id;
    }

    const total = await Project.countDocuments(filter);
    const projects = await Project.find(filter)
      .populate('owner', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get project by ID
// @route   GET /api/v1/projects/:id
// @access  Private
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('owner', 'name email');

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Regular users can only see their own projects
    if (req.user.role === 'user' && project.owner._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new project
// @route   POST /api/v1/projects
// @access  Private (Admin/Manager)
export const createProject = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    // Add owner to project data
    const projectData = {
      ...req.body,
      owner: req.user.id,
    };

    const project = await Project.create(projectData);
    const populatedProject = await Project.findById(project._id).populate('owner', 'name email');

    logger.info(`New project created: ${project.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      data: populatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private (Admin/Manager/Owner)
export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Check permissions: Admin, Manager, or Project Owner
    const canUpdate =
      req.user.role === 'admin' ||
      req.user.role === 'manager' ||
      project.owner.toString() === req.user.id;

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        error: 'Access denied',
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('owner', 'name email');

    logger.info(`Project updated: ${updatedProject.name} by ${req.user.email}`);

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private (Admin only)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    logger.info(`Project deleted: ${project.name} by ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
