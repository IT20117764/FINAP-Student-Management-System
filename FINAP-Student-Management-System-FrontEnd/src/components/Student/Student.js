import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Input, Form } from 'reactstrap';
import "../scss/main.scss"
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import moment from 'moment';
//import './student.css'
//import '../scss/student.scss'
import '../scss/comon.scss'

const Student = () => {

    const [studentID, setStudentID] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [dateofbirth, setDateofbirth] = useState(Date)
    const [age, setAge] = useState(0)
    const [classroomID, setClassroomID] = useState(0)
    const [classrooms, setClassrooms] = useState([])
    const [students, setStudents] = useState([])

    const change = (e) => {

        if (e.target.id === 'firstName') {
            setFirstName(e.target.value)
        }
        else if (e.target.id === 'lastName') {
            setLastName(e.target.value)
        }
        else if (e.target.id === 'contactPerson') {
            setContactPerson(e.target.value)
        }
        else if (e.target.id === 'contactNo') {
            setContactNo(e.target.value)
        }
        else if (e.target.id === 'emailAddress') {
            setEmailAddress(e.target.value)
        }
        else if (e.target.id === 'dateofbirth') {
            setDateofbirth(e.target.value)
            ageCalculate(e.target.value)
        }
        else if (e.target.id === 'classroomID') {
            setClassroomID(parseInt(e.target.value))
        }

    }

    const ageCalculate = (date) => {
        const today = new Date();
        const birthdateObj = new Date(date);
        let age = today.getFullYear() - birthdateObj.getFullYear();
        setAge(age);
    }

    const valid = (e) => {
        e.preventDefault();
        debugger;
        if (contactNo.length === 10) {
            handleSubmit();
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Enter Valid Phone Number',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
    }


    const handleSubmit = async () => {
        const data = { studentID, firstName, lastName, contactPerson, contactNo, emailAddress, dateofbirth, classroomID };
        console.log(data);
        try {
            const response = await axios.post("http://localhost:4000/Student/SaveStudent", data);
            console.log(response.data);
            window.location.href = '/';
            alert('Saved!')
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async () => {
        console.log(studentID);
        try {
            const response = await axios.delete("http://localhost:4000/Student/DeleteStudent?studentID=" + studentID);
            console.log(response.data);
            window.location.href = '/';
            alert('Delete Successful')
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const getClasses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Class/GetClasses');
            setClassrooms(response.data.result);
        }
        catch (error) {
            console.log(error);
        }

    }

    const getStudents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Student/GetStudents');
            setStudents(response.data.result);
        }
        catch (error) {
            console.log(error);
        }

    }

    const reset = () => {
        setStudentID(0)
        setFirstName("")
        setLastName("")
        setContactPerson("")
        setContactNo("")
        setEmailAddress("")
        setDateofbirth("")
        setClassroomID(0)
        setAge("")
    }

    const select = (student) => {
        setStudentID(student.studentID)
        setFirstName(student.firstName)
        setLastName(student.lastName)
        setContactPerson(student.contactPerson)
        setContactNo(student.contactNo)
        setEmailAddress(student.emailAddress)
        setDateofbirth(moment(student.dateofbirth).format('YYYY-MM-DD'))
        ageCalculate(student.dateofbirth)
        setClassroomID(student.classroomID)
    }

    useEffect(() => {
        getClasses();
        getStudents();
    }, [])

    return (
        <div>
            <Navbar />
            <Row>
                <Col md="12" sm="12" xs="12">
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Student Details
                        </CardHeader>
                        <CardBody id="student_id">
                            <Form id ='frm' onSubmit={valid}>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>First Name</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="firstName" name="firstName" type="text" value={firstName} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Last Name</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="lastName" name="lastName" type="text" value={lastName} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Contact Person</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="contactPerson" name="contactPerson" type="text" value={contactPerson} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Contact No</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="contactNo" name="contactNo" type="number" value={contactNo} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Email Address</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Date of Birth</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="dateofbirth" name="dateofBirth" type="date" value={dateofbirth} onChange={change} max={new Date().toISOString().split("T")[0]} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Age</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="age" name="age" type="text" readOnly value={age} onChange={change} />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="6" sm="12" xs="12">
                                                <Label>Class Room</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6" sm="12" xs="12">
                                                <select className='box' id="classroomID" name="classroomID" type="number" value={classroomID} onChange={change} required defaultValue="">
                                                    <option value="">Select a Classroom</option>
                                                    {classrooms.map((classroom) => (
                                                        <option key={classroom.classroomID} value={classroom.classroomID}>
                                                            {classroom.classroomName}
                                                        </option>
                                                    ))}
                                                </select>

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col className="offset-3" md="3" sm="3" xs="3" id='btn'>
                                        <Button block className="btn btn-success mr-2" type='submit' >Add/Update</Button>
                                    </Col>
                                    <Col md="3" sm="3" xs="3">
                                        <Button block className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                                    </Col>
                                    <Col md="3" sm="3" xs="3">
                                        <Button block className="btn btn-warning" onClick={reset}>Reset</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    <br/>
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Existing Students
                        </CardHeader>
                        <CardBody id="student_details_id">
                            <FormGroup id='frmGrp' row>
                                <Col md="12" sm="12" xs="12">
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="main-table">
                                            <tbody>
                                                <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Contact Person</th>
                                                    <th>Contact No.</th>
                                                    <th>Email Address</th>
                                                    <th>Classroom</th>
                                                </tr>
                                                {students.map((student) => (
                                                    <tr onClick={(e) => select(student)}>
                                                        <td>{student.firstName}</td>
                                                        <td>{student.lastName}</td>
                                                        <td>{student.contactPerson}</td>
                                                        <td>{student.contactNo}</td>
                                                        <td>{student.emailAddress}</td>
                                                        <td>{student.classroomName}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}

export default Student
