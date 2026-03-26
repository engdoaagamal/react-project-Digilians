import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../API";

function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

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
    </div>
  );
}

export default TaskDetails;