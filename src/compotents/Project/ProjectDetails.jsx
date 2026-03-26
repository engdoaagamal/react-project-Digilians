import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/getoneProjectbyid/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching project");
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{project.title}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Supervisor:</strong> {project.supervisor?.name}</p>
      <p>
        <strong>Students:</strong>{" "}
        {project.students.map(s => s.name).join(", ")}
      </p>

      <h4 className="mt-4">Tasks</h4>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline</th>
            <th>Status</th>
            {/* <th>Student</th> */}
          </tr>
        </thead>
        <tbody>
          {project.tasks.map((task, idx) => (
            <tr key={idx}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.deadline?.split("T")[0]}</td>
              <td>{task.status}</td>
              {/* <td>
                {typeof task.student === "string"
                  ? project.students.find(s => s._id === task.student)?.name || "No student"
                  : task.student?.name || "No student"}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => navigate(`/updateProject/${id}`)}>
          Update
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/ShowAllprojects")}>
          Back to All Projects
        </button>
      </div>
    </div>
  );
}

export default ProjectDetails;