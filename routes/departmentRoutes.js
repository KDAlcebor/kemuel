const express = require ('express');
const authenticateToken = require('../middlewares/authMiddleware');
const {getAllDepartment, getDepartmentById, createDepartment, updateDepartment, deleteDepartment} = require('../controllers/departmentController');


const router = express.Router();

router.get('/', authenticateToken, getAllDepartment);
router.get('/:id', authenticateToken, getDepartmentById);
router.post('/', authenticateToken, createDepartment);
router.put('/:id', authenticateToken, updateDepartment);
router.delete('/:id', authenticateToken, deleteDepartment);

module.exports = router;