import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";
function AllStudent() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();






  // ✅ DELETE FUNCTION HERE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/deletestudent/${id}`);

      alert("Deleted successfully");

      // remove from UI
      setData(data.filter((item) => item._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/getAllstudent");

        setData(res.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="container mt-4">
      <h2 className="mb-4">Students</h2>

      <div className="row">
        {data.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow">

              {/* Image */}
              <img
                src={`http://localhost:5000/${item.profileimage}`}
                className="card-img-top"
                alt="student"
                style={{ height: "200px", objectFit: "cover" }}
              />
              {/* {console.log(item.profileimage)} */}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <p className="card-text">
                  <strong>Email:</strong> {item.email}
                </p>

                <p className="card-text">
                  <strong>University ID:</strong> {item.universityId}
                </p>

                <p className="card-text">
                  <strong>Department:</strong> {item.department}
                </p>
                <button
                  className="btn btn-warning"
                  onClick={() => navigate(`/stdupdate/${item._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllStudent;