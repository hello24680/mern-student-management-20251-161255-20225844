const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Student = require('./Student');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/student_db')
    .then(() => console.log("Đã kết nối MongoDB thành công"))
    .catch(err => console.error("Lỗi kết nối MongoDB:", err));

// API GET danh sách học sinh
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API POST thêm học sinh mới
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        console.log('Đã thêm học sinh mới:', newStudent);
        res.status(201).json(newStudent);
    } catch (err) {
        console.error('Lỗi khi thêm học sinh:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// API GET lấy thông tin một học sinh theo ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API PUT cập nhật thông tin học sinh
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }
        console.log('Đã cập nhật học sinh:', updatedStudent);
        res.json(updatedStudent);
    } catch (err) {
        console.error('Lỗi khi cập nhật học sinh:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Route mặc định
app.get('/', (req, res) => {
    res.send('Student Management API is running');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
