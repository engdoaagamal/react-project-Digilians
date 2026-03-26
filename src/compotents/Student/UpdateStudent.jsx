import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";

function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem("token");
    

      const res = await API.get(`/getonestudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setDepartment(res.data.data.department)
     
    };

    fetchStudent();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await API.put(`/updatestudent/${id}`, {
      name,
      email,
      department
    });

    alert("Updated");
    console.log("fom updating page "+`/student/profile/${id}`)
    navigate(`/student/profile/${id}`);
  };

  return (
    <div>
      <h2>Update Student</h2>

      <form onSubmit={handleUpdate}>
          {console.log(name+"  "+ department+"  "+email)}
      <input
          type="text"
          placeholder="Name"
          className="form-control mb-2" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

<input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

 {/* Department Select */}
 <select
          className="form-control mb-2"
          onChange={(e) => setDepartment(e.target.value)}
          value={department}
        >
          <option value="">Select Department</option>
          <option value="CS">Computer Science</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="IT">Information Technology</option>
        </select>


        <button type="submit" className="btn btn-primary m-2">Update</button>
        <button type="button" className="btn btn-info m-2" onClick={() => navigate("/Allstd")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateStudent;