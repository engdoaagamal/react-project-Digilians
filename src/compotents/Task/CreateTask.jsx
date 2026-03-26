import { useEffect, useState } from "react";
import API from "../../API";

function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Pending",
    Project_id: "",
    Student_id: ""
  });

  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const [projRes, stdRes] = await Promise.all([
        API.get("/getAllProjects", { headers: { Authorization: `Bearer ${token}` } }),
        API.get("/getAllstudent", { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setProjects(projRes.data.data);
      setStudents(stdRes.data.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/createTask", task);
      alert("Task created ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Title"
          onChange={(e) => setTask({ ...task, title: e.target.value })} />

        <textarea className="form-control mb-2" placeholder="Description"
          onChange={(e) => setTask({ ...task, description: e.target.value })} />

        <input type="date" className="form-control mb-2"
          onChange={(e) => setTask({ ...task, deadline: e.target.value })} />

        <select className="form-control mb-2"
          onChange={(e) => setTask({ ...task, Project_id: e.target.value })}>
          <option>Select Project</option>
          {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
        </select>

        <select className="form-control mb-2"
          onChange={(e) => setTask({ ...task, Student_id: e.target.value })}>
          <option>Select Student</option>
          {students.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <button className="btn btn-success w-100">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;