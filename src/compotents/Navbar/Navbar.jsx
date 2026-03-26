import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03">
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand" to="/">Navbar</Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/Allstd">Students</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/stdregister">Register Student</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stdlogin">login Student</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/insregister">Register Instructor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/inslogin">login Instructor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Allins">Instructors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/instructor/profile">Profile Instructor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student/profile">Profile Student</Link>
            </li>
          
            
            <li className="nav-item">
               <Link  className="nav-link" to={`/Createproject`}>Create Project</Link>

            </li>
            <li className="nav-item">
               <Link  className="nav-link" to={`/ShowAllprojects`}>Show Projects</Link>

            </li>
            
            <li className="nav-item">
               <Link  className="nav-link" to={`/CreateTask`}>CreateTask</Link>

            </li>
            <li className="nav-item">
               <Link  className="nav-link" to={`/ShowAllTasks`}>ShowAllTasks</Link>

            </li>
            
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;