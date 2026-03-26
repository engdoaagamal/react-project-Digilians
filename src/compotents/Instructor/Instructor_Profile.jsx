import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";
import { jwtDecode } from "jwt-decode";

function InstructorProfile() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [instructor, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/inslogin");
          return;
        }

        const decoded = jwtDecode(token);
        const tokenId = decoded.id;

        // لو جاي من URL استخدمه، غير كده استخدم التوكن
        const userId = paramId || tokenId;

        const res = await API.get(`/getoneinstructor/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudent(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudent();
  }, [paramId, navigate]);

  if (!instructor) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto p-4" style={{ maxWidth: "500px" }}>
        
        <img
          src={`http://localhost:5000/${instructor.profileimage}`}
          className="card-img-top mb-3"
          alt="instructor"
          style={{ height: "250px", objectFit: "cover" }}
        />


        <div className="card-body text-center">
          <h3>{instructor.name}</h3>

          <p><strong>Email:</strong> {instructor.email}</p>
        
          <p><strong>Specialization:</strong> {instructor.specialization}</p>
           

          <div className="mt-4">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/insupdate/${instructor._id}`)}
            >
              Update
            </button>

            <button
              className="btn btn-secondary m-2"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfile;