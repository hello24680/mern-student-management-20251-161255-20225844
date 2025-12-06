import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>Danh sách Học sinh</h1>

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
  );
}

export default App;
