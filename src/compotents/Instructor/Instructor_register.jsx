




import { useState } from "react";
import API from "../../API";

function Instructor_register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [specialization, setSpecialization] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
     
    formData.append("specialization", specialization);
    formData.append("profileimage", file); // must match backend

    try {
      const res = await API.post("/registerinstructor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      alert("Instructor registered successfully");
    } catch (err) {
      console.log(err);
      alert("Error registering Instructor");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Student Register</h2>

      <form onSubmit={handleSubmit}>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="form-control mb-2"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        

        {/* specialization Select */}
        <select
          className="form-control mb-2"
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="CS">Computer Science</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="IT">Information Technology</option>
        </select>

        {/* Image Upload */}
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>

      </form>
    </div>
  );
}

export default Instructor_register;