import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API";

function UpdateProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [supervisor, setSupervisor] = useState("");

    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [tasks, setTasks] = useState([]);

    // ================= FETCH =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [projRes, instRes, stdRes] = await Promise.all([
                    API.get(`/getoneProjectbyid/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    API.get("/getallinstructor", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    API.get("/getAllstudent", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                const project = projRes.data.data;

                // ================= FILL DATA =================
                setTitle(project.title);
                setDescription(project.description);
                setSupervisor(project.supervisor?._id || "");

                setInstructors(instRes.data.data);
                setStudents(stdRes.data.data);

                setSelectedStudents(project.students);

                // تحويل tasks عشان نخلي student = id فقط
                const formattedTasks = project.tasks.map(t => ({
                    title: t.title,
                    description: t.description,
                    deadline: t.deadline?.split("T")[0],
                    status: t.status,
                    student: typeof t.Student_id === "object"
                        ? t.Student_id?._id
                        : t.Student_id
                }));

                setTasks(formattedTasks);

            } catch (err) {
                console.log(err);
                alert("Error loading data");
            }
        };

        fetchData();
    }, [id]);

    // ================= STUDENTS =================
    const addStudent = (student) => {
        if (!selectedStudents.some(s => s._id === student._id)) {
            setSelectedStudents([...selectedStudents, student]);
        }
    };

    const removeStudent = (id) => {
        setSelectedStudents(selectedStudents.filter(s => s._id !== id));
    };

    const getStudentName = (id) => {
        const student = students.find(s => s._id === id);
        return student ? student.name : "No student";
    };

    // ================= TASKS =================
    const updateTaskField = (index, field, value) => {
        const updated = [...tasks];
        updated[index][field] = value;
        setTasks(updated);
    };

    const addTask = () => {
        setTasks([
            ...tasks,
            {
                title: "",
                description: "",
                deadline: "",
                status: "Pending",
                student: ""
            }
        ]);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentIds = selectedStudents.map(s => s._id);

        const formattedTasks = tasks.map(t => ({
            title: t.title,
            description: t.description,
            deadline: t.deadline,
            status: t.status,
            Student_id: t.student   // ✅ هنا التحويل
        }));

        try {
            await API.put(`/updateProject/${id}`, {
                title,
                description,
                supervisor,
                students: studentIds,
                tasks: formattedTasks
            });

            alert("Updated successfully ✅");
            navigate("/ShowAllprojects");

        } catch (err) {
            console.log(err.response?.data);
            alert("Error updating project ❌");
        }
    };

    // ================= UI =================
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Update Project</h2>

            <form onSubmit={handleSubmit} >
                <div className="row">

                    {/* LEFT */}
                    <div className="col-12 col-lg-6">

                        <div className="card p-3 mb-3">
                            <h5>Project Info</h5>

                            <input
                                className="form-control mb-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                className="form-control mb-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <select
                                className="form-control"
                                value={supervisor}
                                onChange={(e) => setSupervisor(e.target.value)}
                            >
                                <option value="">Select Instructor</option>
                                {instructors.map(i => (
                                    <option key={i._id} value={i._id}>{i.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="card p-3 mb-3">
                            <h5>Add Student</h5>

                            <select
                                className="form-control"
                                onChange={(e) => {
                                    const s = students.find(st => st._id === e.target.value);
                                    if (s) addStudent(s);
                                }}
                            >
                                <option value="">Select Student</option>
                                {students.map(s => (
                                    <option key={s._id} value={s._id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="card p-3">
                            <h5>Tasks</h5>

                            <button type="button" className="btn btn-success mb-2" onClick={addTask}>
                                + Add Task
                            </button>

                            {tasks.map((task, i) => (
                                <div key={i} className="border p-2 mb-2">

                                    <input
                                        className="form-control mb-1"
                                        value={task.title}
                                        onChange={(e) => updateTaskField(i, "title", e.target.value)}
                                        placeholder="Title"
                                    />

                                    <input
                                        className="form-control mb-1"
                                        value={task.description}
                                        onChange={(e) => updateTaskField(i, "description", e.target.value)}
                                        placeholder="Description"
                                    />

                                    <input
                                        type="date"
                                        className="form-control mb-1"
                                        value={task.deadline}
                                        onChange={(e) => updateTaskField(i, "deadline", e.target.value)}
                                    />

                                    <select
                                        className="form-control mb-1"
                                        value={task.student}
                                        onChange={(e) => updateTaskField(i, "student", e.target.value)}
                                    >
                                        <option value="">Assign Student</option>
                                        {selectedStudents.map(s => (
                                            <option key={s._id} value={s._id}>{s.name}</option>
                                        ))}
                                    </select>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm mt-1"
                                        onClick={() => deleteTask(i)}
                                    >
                                        Delete Task
                                    </button>
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="col-12 col-lg-6">

                        <div className="card p-3">
                            <h5>Selected Students</h5>

                            <table className="table">
                                <tbody>
                                    {selectedStudents.map(s => (
                                        <tr key={s._id}>
                                            <td>{s.name}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeStudent(s._id)}
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

                </div>

                <button className="btn btn-primary mt-3 mx-1 w-50">
                    Update Project
                </button>
                <button className="btn btn-success mt-3 mx-1 w-20"
                    onClick={() => navigate("/ShowAllprojects")}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default UpdateProject;