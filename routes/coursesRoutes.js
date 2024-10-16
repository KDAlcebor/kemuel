const express = require ('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {getAllCourses, getCoursesById, createCourses, updateCourses, deleteCourses} = require('../controllers/coursesControllers');


const router = express.Router();

router.get('/', authenticateToken, getAllCourses);
router.get('/:id', authenticateToken, getCoursesById);
router.post('/', authenticateToken, createCourses);
router.put('/:id', authenticateToken, updateCourses);
router.delete('/:id', authenticateToken, deleteCourses);

module.exports = router;