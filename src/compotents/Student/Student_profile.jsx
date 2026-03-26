import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../API";
import { jwtDecode } from "jwt-decode";

function StudentProfile() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/stdlogin");
          return;
        }

        const decoded = jwtDecode(token);
        const tokenId = decoded.id;

        // لو جاي من URL استخدمه، غير كده استخدم التوكن
        const userId = paramId || tokenId;

        const res = await API.get(`/getonestudent/${userId}`, {
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

  if (!student) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow mx-auto p-4" style={{ maxWidth: "500px" }}>
        
        <img
          src={`http://localhost:5000/${student.profileimage}`}
          className="card-img-top mb-3"
          alt="student"
          style={{ height: "250px", objectFit: "cover" }}
        />


        <div className="card-body text-center">
          <h3>{student.name}</h3>

          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>University ID:</strong> {student.universityId}</p>
          <p><strong>Department:</strong> {student.department}</p>

          <div className="mt-4">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/stdupdate/${student._id}`)}
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

export default StudentProfile;