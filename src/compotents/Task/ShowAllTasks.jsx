import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";

function ShowAllTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await API.get("/getAllTasks");
      setTasks(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Tasks</h2>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Student</th>
            <th>Project</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(t => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.Student_id?.name}</td>
              <td>{t.Project_id?.title}</td>
              <td>{t.status}</td>

              <td>
                <button className="btn btn-info btn-sm me-2"
                  onClick={() => navigate(`/TaskDetails/${t._id}`)}>
                  View
                </button>
                <button className="btn btn-info btn-sm m-2"
                  onClick={() => navigate(`/TaskDetails/${t._id}`)}>
                 Show   
                </button>
                <button className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/UpdateTask/${t._id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAllTasks;