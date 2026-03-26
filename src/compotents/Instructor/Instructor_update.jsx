import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";

function Instructor_update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem("token");
    

       const res = await API.get(`/getoneinstructor/${id}`
       , {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
      });

      setName(res.data.data.name);
      setEmail(res.data.data.email);
      setSpecialization(res.data.data.specialization)
     
    };

    fetchStudent();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await API.put(`/updateinstructor/${id}`, {
      name,
      email,
      specialization
    });

    alert("Updated");
    navigate(`/instructor/profile/${id}`);
  };

  return (
    <div>
      <h2>Update Student</h2>

      <form onSubmit={handleUpdate}>
          {console.log(name+"  "+ specialization+"  "+email)}
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
          onChange={(e) => setSpecialization(e.target.value)}
          value={specialization}
        >
          <option value="">Select Department</option>
          <option value="CS">Computer Science</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="IT">Information Technology</option>
        </select>


        <button type="submit" className="btn btn-primary m-2">Update</button>
        <button type="button" className="btn btn-info m-2" onClick={() => navigate("/Allins")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Instructor_update;