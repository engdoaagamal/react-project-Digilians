import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";
function CreateProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [supervisor, setSupervisor] = useState("");

    const [instructors, setInstructors] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [taskInput, setTaskInput] = useState({
        title: "",
        description: "",
        deadline: "",
        status: "Pending",
        student: "" // 👈 واحد بس
    });

    const [editingIndex, setEditingIndex] = useState(null);
    const navigate = useNavigate();
    // ================= FETCH =================
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [instRes, stdRes] = await Promise.all([
                    API.get("/getallinstructor", {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    API.get("/getAllstudent", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setInstructors(instRes.data.data);
                setStudents(stdRes.data.data);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

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
    const handleAddTask = () => {
        if (!taskInput.title) return;

        if (editingIndex !== null) {
            const updated = [...tasks];
            updated[editingIndex] = taskInput;
            setTasks(updated);
            setEditingIndex(null);
        } else {
            setTasks([...tasks, taskInput]);
        }

        setTaskInput({
            title: "",
            description: "",
            deadline: "",
            status: "Pending",
            student: ""
        });
    };

    const editTask = (index) => {
        setTaskInput(tasks[index]);
        setEditingIndex(index);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const assignStudentToTask = (taskIndex, studentId) => {
        const updated = [...tasks];
        updated[taskIndex].student = studentId; // 👈 واحد بس
        setTasks(updated);
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentIds = selectedStudents.map(s => s._id);

        try {
            await API.post("/createProject", {
                title,
                description,
                supervisor,
                students: studentIds,
                tasks
            });
          
            alert("Project created successfully");
            navigate("/ShowAllprojects");

        } catch (err) {
            console.log(err);
            alert("Error creating project");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Create Project</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">

                    {/* LEFT */}
                    <div className="col-12 col-lg-6">

                        <div className="card p-3 mb-3 shadow-sm">
                            <h5>Project Info</h5>

                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control mb-3"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <textarea
                                placeholder="Description"
                                className="form-control mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <select
                                className="form-control"
                                value={supervisor}
                                onChange={(e) => setSupervisor(e.target.value)}
                            >
                                <option value="">Select Instructor</option>
                                {instructors.map((inst) => (
                                    <option key={inst._id} value={inst._id}>
                                        {inst.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="card p-3 mb-3 shadow-sm">
                            <h5>Add Student</h5>

                            <select
                                className="form-control"
                                onChange={(e) => {
                                    const selected = students.find(
                                        s => s._id === e.target.value
                                    );
                                    if (selected) addStudent(selected);
                                }}
                            >
                                <option value="">Select Student</option>
                                {students.map((std) => (
                                    <option key={std._id} value={std._id}>
                                        {std.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="card p-3 shadow-sm">
                            <h5>Tasks</h5>

                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control mb-2"
                                value={taskInput.title}
                                onChange={(e) =>
                                    setTaskInput({ ...taskInput, title: e.target.value })
                                }
                            />

                            <textarea
                                placeholder="Description"
                                className="form-control mb-2"
                                value={taskInput.description}
                                onChange={(e) =>
                                    setTaskInput({ ...taskInput, description: e.target.value })
                                }
                            />

                            <input
                                type="date"
                                className="form-control mb-2"
                                value={taskInput.deadline}
                                onChange={(e) =>
                                    setTaskInput({ ...taskInput, deadline: e.target.value })
                                }
                            />

                            {/* <select
                                className="form-control mb-2"
                                value={taskInput.status}
                                onChange={(e) =>
                                    setTaskInput({ ...taskInput, status: e.target.value })
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="Done">Done</option>
                            </select> */}

                            {/* 👇 assign student */}
                            <select
                                className="form-control mb-2"
                                value={taskInput.student}
                                onChange={(e) =>
                                    setTaskInput({ ...taskInput, student: e.target.value })
                                }
                            >
                                <option value="">Assign Student</option>
                                {selectedStudents.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleAddTask}
                            >
                                {editingIndex !== null ? "Update" : "Add Task"}
                            </button>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="col-12 col-lg-6">

                        {/* Students */}
                        <div className="card p-3 mb-3 shadow-sm">
                            <h5>Selected Students</h5>

                            <table className="table table-bordered text-center">
                                <tbody>
                                    {selectedStudents.map((student) => (
                                        <tr key={student._id}>
                                            <td>{student.name}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeStudent(student._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tasks */}
                        <div className="card p-3 shadow-sm">
                            <h5>Tasks</h5>

                            <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Student</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.title}</td>
                                            <td>{getStudentName(task.student)}</td>
                                            <td>
                                                <button  type="button"
                                                    className="btn btn-info btn-sm me-2"
                                                    onClick={() => editTask(index)}
                                                >
                                                    Edit
                                                </button>
                                                <button  type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => deleteTask(index)}
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

                <button className="btn btn-primary mt-3 w-100">
                    Create Project
                </button>
            </form>
        </div>
    );
}

export default CreateProject;