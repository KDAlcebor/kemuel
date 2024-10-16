const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllCourses = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id, created_at, updated_at FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCoursesById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id, created_at, updated_at FROM courses WHERE course_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Course mo nawala' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCourses = async (req, res) => {
    const { course_code, course_name, user_id, dept_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO courses (course_code, course_name, user_id, dept_id) VALUES (?, ?, ?, ?)', [course_code, course_name, user_id, dept_id]);
        res.status(201).json({ course_id: result.insertId, course_code, course_name, user_id, dept_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCourses = async (req, res) => {
    const { id } = req.params;
    const { course_code, course_name, user_id, dept_id } = req.body;

    try {
        const [result] = await pool.query('UPDATE courses SET course_code = ?, course_name = ?, user_id = ?, dept_id = ? WHERE course_id = ?', [course_code, course_name, user_id, dept_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course updated, magdiwang ka!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourses = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course mo nagtago' });
        }

        res.json({ message: 'Course deleted successfully, Lets party party' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllCourses, getCoursesById, createCourses, updateCourses, deleteCourses };