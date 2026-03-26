import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";
import { useNavigate } from "react-router-dom";
function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/getoneTaskbyid/${id}`).then(res => setTask(res.data.data));
  }, []);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>{task.title}</h2>

      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Deadline:</strong> {task.deadline?.split("T")[0]}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Student:</strong> {task.Student_id?.name}</p>
      <p><strong>Project:</strong> {task.Project_id?.title}</p>
    
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => navigate(`/UpdateTask/${id}`)}>
          Update
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/ShowAllTasks")}>
          Back to All Tasks
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;