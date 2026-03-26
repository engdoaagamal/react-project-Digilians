import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";

function ShowAllprojects() {
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // ================= FETCH =================
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await API.get("/getAllProjects", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setProjects(res.data.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchProjects();
    }, []);

    // ================= DELETE =================
    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await API.delete(`/deleteProject/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProjects(projects.filter(p => p._id !== id));

        } catch (err) {
            console.log(err);
        }
    };

    // ================= FILTER =================
    const filteredProjects = projects.filter((p) => {
        const instructorName = p.supervisor?.name?.toLowerCase() || "";
        const studentsNames = p.students?.map(s => s.name.toLowerCase()).join(" ");

        return (
            instructorName.includes(search.toLowerCase()) ||
            studentsNames.includes(search.toLowerCase())
        );
    });

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Projects</h2>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/Createproject")}
                >
                    + Add Project
                </button>
            </div>

            {/* SEARCH */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by instructor or student name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* TABLE */}
            <div className="table-responsive">
                <table className="table table-bordered text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Project Name</th>
                            <th>Instructor</th>
                            <th># Students</th>
                            <th># Tasks</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.title}</td>

                                <td>{project.supervisor?.name}</td>

                                <td>{project.students?.length || 0}</td>

                                <td>{project.tasks?.length || 0}</td>

                                <td>{project.status || "N/A"}</td>

                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => navigate(`/UpdateProject/${project._id}`)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => navigate(`/ProjectDetails/${project._id}`)}
                                    >
                                        Show
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteProject(project._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default ShowAllprojects;