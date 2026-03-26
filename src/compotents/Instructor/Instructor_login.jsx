import { useState } from "react";
import API from "../../API";

function Instructor_login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("/logininstructor", {
        email,
        password,
      });
  
      console.log(res.data);
  
      
      localStorage.setItem("token", res.data.token);
  
      alert("Instructor login successfully");
    } catch (err) {
      console.log(err);
      alert("Error login Instructor");
    }
  };

 

  return (
    <div className="container mt-5">
      <h2>Instructor  login</h2>

      <form onSubmit={handleSubmit}>

       

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

       

       

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>

      </form>
    </div>
  );
}

export default Instructor_login;