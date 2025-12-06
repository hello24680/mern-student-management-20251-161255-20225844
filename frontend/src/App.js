import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students')
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi fetch danh sách:", error);
        setError("Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.");
        setLoading(false);
      });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      name: name.trim(),
      age: Number(age),
      class: stuClass.trim()
    };

    axios.post('http://localhost:5000/api/students', newStudent)
      .then(res => {
        console.log("Đã thêm:", res.data);
        // Cập nhật danh sách học sinh
        setStudents(prev => [...prev, res.data]);
        // Xóa nội dung form
        setName('');
        setAge('');
        setStuClass('');
        // Hiển thị thông báo thành công
        setSuccessMessage('Thêm học sinh thành công!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi thêm:", err);
        alert("Lỗi khi thêm học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Quản lý Học sinh</h1>

        {/* Form thêm học sinh */}
        <div className="form-container">
          <h2>Thêm Học sinh Mới</h2>
          <form onSubmit={handleAddStudent} className="student-form">
            <div className="form-group">
              <label htmlFor="name">Họ và Tên:</label>
              <input
                type="text"
                id="name"
                placeholder="Nhập họ tên"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Tuổi:</label>
              <input
                type="number"
                id="age"
                placeholder="Nhập tuổi"
                value={age}
                onChange={e => setAge(e.target.value)}
                min="1"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="class">Lớp:</label>
              <input
                type="text"
                id="class"
                placeholder="Nhập lớp"
                value={stuClass}
                onChange={e => setStuClass(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-add">
              Thêm học sinh
            </button>
          </form>

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>

        {/* Danh sách học sinh */}
        <div className="list-container">
          <h2>Danh sách Học sinh</h2>

          {loading && <p className="message">Đang tải dữ liệu...</p>}

          {error && <p className="error">{error}</p>}

          {!loading && !error && students.length === 0 && (
            <p className="message">Chưa có học sinh nào trong danh sách.</p>
          )}

          {!loading && !error && students.length > 0 && (
            <table className="students-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và Tên</th>
                  <th>Tuổi</th>
                  <th>Lớp</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
