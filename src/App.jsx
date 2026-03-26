import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Layout from './compotents/Layout/Layout';
import Home from './compotents/Home/Home'
import NotFound from './compotents/NotFound/NotFound'
import AllStudent from './compotents/Student/AllStudent'
import Student_register from './compotents/Student/Student_register'
import Student_Login from './compotents/Student/Student_Login'
import UpdateStudent from './compotents/Student/UpdateStudent'
import Instructor_register from './compotents/Instructor/Instructor_register'
import Instructor_login from './compotents/Instructor/Instructor_login'
import Student_profile from './compotents/Student/Student_profile'
import Allinstructor from './compotents/Instructor/Allinstructor'
import Instructor_update from './compotents/Instructor/Instructor_update'
import StudentProfile from './compotents/Student/Student_profile'
import InstructorProfile from './compotents/Instructor/Instructor_Profile'
import Createproject from './compotents/Project/Create_project'
import ShowAllprojects from './compotents/Project/ShowAll'
import UpdateProject from './compotents/Project/UpdateProject'
import ProjectDetails from './compotents/Project/ProjectDetails'
import CreateTask from './compotents/Task/CreateTask'
import ShowAllTasks from './compotents/Task/ShowAllTasks'
import UpdateTask from './compotents/Task/UpdateTask'
import TaskDetails from './compotents/Task/TaskDetails'

// import { getUserRole } from "./utils/auth";

// const role = getUserRole();
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="Allstd" element={<AllStudent />} />

            <Route path="stdregister" element={<Student_register />} />
            <Route path="stdlogin" element={<Student_Login />} />
            {/* {role === "student" && <Route path="stdupdate/:id" element={<UpdateStudent />} />}

            {role === "student" && <Route path="stdprofile/:id" element={<Student_profile />} />} */}
            {/* <Route path="profile/:id" element={<Profile />} /> */}
            <Route path="stdupdate/:id" element={<UpdateStudent />} />
            <Route path="insregister" element={<Instructor_register />} />
            <Route path="inslogin" element={<Instructor_login />} />
            <Route path="Allins" element={<Allinstructor />} />
            <Route path="insupdate/:id" element={<Instructor_update />} />

    
            <Route path="student/profile" element={<StudentProfile />} />
<Route path="student/profile/:id" element={<StudentProfile />} />            <Route path="instructor/profile/:id" element={<InstructorProfile />} />
<Route path="instructor/profile/" element={<InstructorProfile />} />            <Route path="instructor/profile/:id" element={<InstructorProfile />} />    
<Route path="instructor/profile/:id" element={<InstructorProfile />} />            <Route path="instructor/profile/:id" element={<InstructorProfile />} />
    

<Route path="Createproject" element={<Createproject />} />            <Route path="instructor/profile/:id" element={<InstructorProfile />} />

<Route path="ShowAllprojects" element={<ShowAllprojects />} /> 
<Route path="UpdateProject/:id" element={<UpdateProject />} /> 
<Route path="ProjectDetails/:id" element={<ProjectDetails />} /> 


<Route path="CreateTask" element={<CreateTask />} />            <Route path="instructor/profile/:id" element={<InstructorProfile />} />

<Route path="ShowAllTasks" element={<ShowAllTasks />} /> 
 <Route path="UpdateTask/:id" element={<UpdateTask />} /> 
<Route path="TaskDetails/:id" element={<TaskDetails />} /> 


    <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </BrowserRouter>
      {/* <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section> */}
    </>
  )
}

export default App
