const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllDepartment = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT department_id, department_code, department_name, user_id, created_at, updated_at FROM departments');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDepartmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT department_id, department_code, department_name, user_id, created_at, updated_at FROM departments WHERE department_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Department Where' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDepartment = async (req, res) => {
    const { department_code, department_name, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO departments (department_code, department_name, user_id) VALUES (?, ?, ?)', [department_code, department_name, user_id]);
        res.status(201).json({ ddepartment_id: result.insertId, department_code, departmentt_name, user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { department_code, department_name, user_id } = req.body;

    try {
        const [result] = await pool.query('UPDATE departments SET departmentt_code = ?, department_name = ?, user_id = ? WHERE dept_id = ?', [department_code, department_name, user_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department Gone HUHUHU' });
        }

        res.json({ message: 'Department Upgraded to max level' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM departments WHERE department_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department Where' });
        }

        res.json({ message: 'Department in the bag' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllDepartment, getDepartmentById, createDepartment, updateDepartment, deleteDepartment };