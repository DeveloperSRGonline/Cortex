const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');
const Auth = require('../middleware/Auth');

// All routes are protected by Clerk Auth
router.use(Auth);

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getProjects);
router.get('/:id', ProjectController.getProjectById);
router.patch('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

module.exports = router;
