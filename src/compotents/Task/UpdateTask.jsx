import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";

function UpdateTask() {
  const { id } = useParams();

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
      const res = await API.get(`/getTask/${id}`);
      setTask({
        ...res.data.data,
        deadline: res.data.data.deadline?.split("T")[0]
      });

      const std = await API.get("/getAllstudent");
      setStudents(std.data.data);
    };

    fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/updateTask/${id}`, task);
    alert("Updated ✅");
  };

  return (
    <div className="container mt-4">
      <h2>Update Task</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })} />

        <textarea className="form-control mb-2" value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })} />

        <input type="date" className="form-control mb-2"
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })} />

        <select className="form-control mb-2"
          value={task.Student_id}
          onChange={(e) => setTask({ ...task, Student_id: e.target.value })}>
          {students.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <button className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
}

export default UpdateTask;