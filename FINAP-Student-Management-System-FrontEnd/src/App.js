import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AllocateClassroom from "./components/AllocateClassroom/AllocateClassroom";
import AllocateSubject from "./components/AllocateSubject/AllocateSubject";
import Classroom from "./components/Classroom/Classroom";
import Student from "./components/Student/Student";
import StudentDetailReport from "./components/StudentDetailReport/StudentDetailReport";
import Subject from "./components/Subject/Subject";
import Teacher from "./components/Teachers/Teacher";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Student />} />
        <Route path="/class" element={<Classroom />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/allosubject" element={<AllocateSubject />} />
        <Route path="/alloclass" element={<AllocateClassroom />} />
        <Route path="/studereport" element={<StudentDetailReport />} />
      </Routes>
    </Router>
  );
}

export default App;
