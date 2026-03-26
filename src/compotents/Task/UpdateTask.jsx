import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";

function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Pending",
    Student_id: ""
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get(`/getoneTaskbyid/${id}`);

        const t = res.data.data;

        setTask({
          title: t.title || "",
          description: t.description || "",
          deadline: t.deadline ? t.deadline.split("T")[0] : "",
          status: t.status || "Pending",
          Student_id: t.Student_id?._id || t.Student_id || ""
        });

        const std = await API.get("/getAllstudent");
        setStudents(std.data.data);

      } catch (err) {
        console.log(err);
        alert("Error loading task");
      }
    };

    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/updatetask/${id}`, task);

      alert("Updated ✅");
      navigate(`/TaskDetails/${id}`); // أو أي صفحة عندك

    } catch (err) {
      console.log(err.response?.data);
      alert("Error ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Task</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">

        <input
          className="form-control mb-2"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />

        <input
          type="date"
          className="form-control mb-2"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
        />

        <select
          className="form-control mb-2"
          value={task.Student_id}
          onChange={(e) => setTask({ ...task, Student_id: e.target.value })}
        >
          <option value="">Select Student</option>
          {students.map(s => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          className="form-control mb-3"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>

        <button className="btn btn-primary  mx-auto w-75">
          Update Task
        </button>
       
        <button className="btn btn-success mt-3 mx-auto w-75"
          onClick={() => navigate("/ShowAllTasks")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateTask;