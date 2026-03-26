import { useEffect, useState } from "react";
import API from "../../API";
import { useNavigate } from "react-router-dom";
function Allinstructor() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();






  // ✅ DELETE FUNCTION HERE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/deleteinstructor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

        const res = await API.get("/getallinstructor");

        setData(res.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="container mt-4">
      <h2 className="mb-4">Instructors</h2>

      <div className="row">
        {data.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow">

              {/* Image */}
              <img
                src={`http://localhost:5000/${item.profileimage}`}
                className="card-img-top"
                alt="Instructor"
                style={{ height: "200px", objectFit: "cover" }}
              />
              {/* {console.log(item.profileimage)} */}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <p className="card-text">
                  <strong>Email:</strong> {item.email}
                </p>

               
                <p className="card-text">
                  <strong>Specialization:</strong> {item.specialization}
                </p>
                <button
                  className="btn btn-warning m-1"
                  onClick={() => navigate(`/insupdate/${item._id}`)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger m-1"
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

export default Allinstructor;