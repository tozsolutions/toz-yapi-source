const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/auth');
const projectController = require('../controllers/projectController');

// GET /api/projects - Get all projects
router.get('/', auth, projectController.getProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', auth, projectController.getProject);

// POST /api/projects - Create new project
router.post('/', auth, projectController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', auth, projectController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', auth, projectController.deleteProject);

// GET /api/projects/:id/status - Get project status
router.get('/:id/status', auth, projectController.getProjectStatus);

// PUT /api/projects/:id/status - Update project status
router.put('/:id/status', auth, projectController.updateProjectStatus);

module.exports = router;
