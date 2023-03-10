import React from 'react'
import './Navbar.css'
import './NavBar.scss'

const Navbar = () => {
    return (
        <div>
            <nav>
            {/* <div className="logo">
                <h2>Student Management System</h2>
            </div> */}
            <ul className="menu">
                <li><a href="/">Students</a></li>
                <li><a href="/class">ClassRoom</a></li>
                <li><a href="/teacher">Teachers</a></li>
                <li><a href="/subject">Subject</a></li>
                <li><a href="/allosubject">AllocateSubject</a></li>
                <li><a href="/alloclass">AllocateClassRoom</a></li>
                <li><a href="/studereport">StudentDetailReport</a></li>
            </ul>
            </nav>
        </div>
    )
}

export default Navbar
