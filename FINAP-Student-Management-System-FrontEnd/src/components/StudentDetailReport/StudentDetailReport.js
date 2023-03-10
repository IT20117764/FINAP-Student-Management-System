import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import "../scss/main.scss"
import '../scss/comon.scss'

const StudentDetailReport = () => {

    const [students, setStudents] = useState([])
    const [subjectTs, setSubjectTs] = useState([])
    const [studentID, setStudentID] = useState(0)
    const [classroom, setClassroom] = useState("")
    const [contactPerson, setContactPerson] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [contactNo, setContactNo] = useState("")
    const [dOB, setDOB] = useState()

    const change = (e) => {

        if (e.target.id === 'studentID') {
            setStudentID(parseInt(e.target.value))
            studentReport(parseInt(e.target.value))
        }

    }

    const studentReport = async (studentID) => {
        try {
            const response = await axios.get(`http://localhost:4000/StudentReport/GetStudentReport?studentID=${studentID}`);
            setClassroom(response.data.result[0].classroom);
            setContactPerson(response.data.result[0].contactPerson);
            setEmailAddress(response.data.result[0].emailAddress);
            setContactNo(response.data.result[0].contactNo);
            setDOB(response.data.result[0].dob);
        }
        catch (error) {
            console.log(error);
        }

        try {
            const response = await axios.get(`http://localhost:4000/StudentReport/GetSubjectTeacher?studentID=${studentID}`);
            setSubjectTs(response.data.result);
        } catch (error) {
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

    useEffect(() => {
        getStudents()
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
                        <CardBody id="student_report_id">
                            <Form>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Student</Label>{" "}
                                                <select className='box' id="studentID" name="studentID" type="number" value={studentID} onChange={change} required defaultValue="">
                                                    <option value="">Find a Student</option>
                                                    {students.map((student) => (
                                                        <option key={student.studentID} value={student.studentID}>
                                                            {student.firstName}{" "}{student.lastName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Classroom</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="lastName" name="lastName" type="text" value={classroom} disabled />

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
                                                <Input id="contactPerson" name="contactPerson" type="text" value={contactPerson} disabled />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Email Address</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="emailAddress" name="emailAddress" type="text" value={emailAddress} disabled />

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>

                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Contact No.</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="contactNo" name="contactNo" type="text" value={contactNo} disabled />

                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Date Of Birth</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="emailAddress" name="emailAddress" type="text" value={dOB} disabled />
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                    <br/>
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Teachers And Subject Details
                        </CardHeader>
                        <CardBody id="student_details_id">
                            <FormGroup row id='frmGrp'>
                                <Col md="12" sm="12" xs="12">
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="main-table">
                                            <tbody>
                                                <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                    <th>Subject</th>
                                                    <th>Teacher</th>

                                                </tr>
                                                {subjectTs.map((subjectT) => (
                                                    <tr>
                                                        <td>{subjectT.subject}</td>
                                                        <td>{subjectT.teacher}</td>
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

export default StudentDetailReport
