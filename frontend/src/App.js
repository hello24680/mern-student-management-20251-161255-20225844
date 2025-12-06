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

  // Edit mode states
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editClass, setEditClass] = useState('');

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Sort state
  const [sortAsc, setSortAsc] = useState(true);

  // API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(`${API_URL}/api/students`)
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

    axios.post(`${API_URL}/api/students`, newStudent)
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

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditName(student.name);
    setEditAge(student.age);
    setEditClass(student.class);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditAge('');
    setEditClass('');
  };

  const handleUpdateStudent = (id) => {
    const updatedStudent = {
      name: editName.trim(),
      age: Number(editAge),
      class: editClass.trim()
    };

    axios.put(`${API_URL}/api/students/${id}`, updatedStudent)
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        // Cập nhật danh sách học sinh
        setStudents(prev => prev.map(stu =>
          stu._id === id ? res.data : stu
        ));
        // Thoát chế độ chỉnh sửa
        handleCancelEdit();
        // Hiển thị thông báo thành công
        setSuccessMessage('Cập nhật học sinh thành công!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi cập nhật:", err);
        alert("Lỗi khi cập nhật học sinh: " + (err.response?.data?.error || err.message));
      });
  };

  const handleDelete = (id, name) => {
    if (!window.confirm(`Bạn có chắc muốn xóa học sinh "${name}"?`)) {
      return;
    }

    axios.delete(`${API_URL}/api/students/${id}`)
      .then(res => {
        console.log(res.data.message);
        // Xóa học sinh khỏi state
        setStudents(prevList => prevList.filter(s => s._id !== id));
        // Hiển thị thông báo thành công
        setSuccessMessage(`Đã xóa học sinh "${res.data.name}" thành công!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(err => {
        console.error("Lỗi khi xóa:", err);
        alert("Lỗi khi xóa học sinh: " + (err.response?.data?.error || err.message));
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

          {/* Search box */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Tìm kiếm theo tên..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort button */}
          <div className="sort-container">
            <button
              className="btn-sort"
              onClick={() => setSortAsc(prev => !prev)}
            >
              {sortAsc ? '⬆️ Sắp xếp A → Z' : '⬇️ Sắp xếp Z → A'}
            </button>
          </div>

          {(() => {
            // Filter students based on search term
            const filteredStudents = students.filter(s =>
              s.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Sort students by name
            const sortedStudents = [...filteredStudents].sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA < nameB) return sortAsc ? -1 : 1;
              if (nameA > nameB) return sortAsc ? 1 : -1;
              return 0;
            });

            return (
              <>
                {!loading && !error && students.length > 0 && sortedStudents.length === 0 && (
                  <p className="message">Không tìm thấy học sinh nào có tên "{searchTerm}"</p>
                )}

                {!loading && !error && sortedStudents.length > 0 && (
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Họ và Tên</th>
                        <th>Tuổi</th>
                        <th>Lớp</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStudents.map((student, index) => (
                        <tr key={student._id} className={editingId === student._id ? 'editing' : ''}>
                          <td>{index + 1}</td>

                          {editingId === student._id ? (
                            // Edit mode
                            <>
                              <td>
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={e => setEditName(e.target.value)}
                                  className="edit-input"
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  value={editAge}
                                  onChange={e => setEditAge(e.target.value)}
                                  className="edit-input"
                                  min="1"
                                  max="100"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  value={editClass}
                                  onChange={e => setEditClass(e.target.value)}
                                  className="edit-input"
                                />
                              </td>
                              <td>
                                <button
                                  onClick={() => handleUpdateStudent(student._id)}
                                  className="btn-save"
                                >
                                  Lưu
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="btn-cancel"
                                >
                                  Hủy
                                </button>
                              </td>
                            </>
                          ) : (
                            // View mode
                            <>
                              <td>{student.name}</td>
                              <td>{student.age}</td>
                              <td>{student.class}</td>
                              <td>
                                <button
                                  onClick={() => handleEditClick(student)}
                                  className="btn-edit"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => handleDelete(student._id, student.name)}
                                  className="btn-delete"
                                >
                                  Xóa
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export default App;
