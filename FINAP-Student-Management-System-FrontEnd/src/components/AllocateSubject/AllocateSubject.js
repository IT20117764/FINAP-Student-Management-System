import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Form } from 'reactstrap';
import "../scss/main.scss"
import axios from 'axios';
import '../scss/comon.scss'

const AllocateSubject = () => {

    const [allocateSubjectID, setAllocateSubjectID] = useState(0)
    const [teacherID, setTeacherID] = useState(0)
    const [subjectID, setSubjectID] = useState(0)
    const [subjects, setSubjects] = useState([])
    const [teachers, setTeachers] = useState([])
    const [allocateSubjects, setAllocateSubjects] = useState([])

    const change = (e) => {

        if (e.target.id === 'subjectID') {
            setSubjectID(parseInt(e.target.value))
        }
        else if (e.target.id === 'teacherID') {
            setTeacherID(parseInt(e.target.value))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { teacherID, subjectID };
        try {
            const response = await axios.post("http://localhost:4000/AllocateSubject/SaveAllocateSubject", data);
            window.location.href = '/allosubject';
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (allocateSubject) => {
        setAllocateSubjectID(allocateSubject.allocateSubjectID)
        console.log(allocateSubjectID);
        try {
            const response = await axios.delete("http://localhost:4000/AllocateSubject/DeleteAllocateSubject?allocateSubjectID=" + allocateSubjectID);
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const getAllocatedSub = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/AllocateSubject/GetAllocateSubjects?teacherID=${teacherID}`);
            setAllocateSubjects(response.data.result);
        }
        catch (error) {
            console.log(error);
        }

    }

    const getTeacher = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Teacher/GetTeacher');
            setTeachers(response.data.result);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getSubject = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Subject/GetSubjects');
            setSubjects(response.data.result);
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getTeacher()
        getSubject()
    }, [])

    return (
        <div>
            <Navbar />
            <Row>
                <Col md="12" sm="12" xs="12">
                    <Form onSubmit={handleSubmit}>
                        <Card id='crd'>
                            <CardHeader id='crdHeader'>
                                Teacher Details
                            </CardHeader>
                            <CardBody id="teacher_id">
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Teacher</Label> {" "}
                                                <select className='box' id="teacherID" name="teacherID" type="number" value={teacherID} onChange={change} required defaultValue="">
                                                    <option value="">Select a Teacher</option>
                                                    {teachers.map((teacher) => (
                                                        <option key={teacher.teacherID} value={teacher.teacherID}>
                                                            {teacher.firstName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col className="offset-3" md="3" sm="3" xs="3" id='btn'>
                                        <Button block className="btn btn-success" onClick={getAllocatedSub}>Save</Button>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card id='crd'>
                            <CardHeader id='crdHeader'>
                                Allocate Subjects
                            </CardHeader>
                            <CardBody id="subject_id">
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Subject</Label> {" "}
                                                <select className='box' id="subjectID" name="subjectID" type="number" value={subjectID} onChange={change} required defaultValue="">
                                                    <option value="">Select a Subject</option>
                                                    {subjects.map((subject) => (
                                                        <option key={subject.subjectID} value={subject.subjectID}>
                                                            {subject.subjectName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col className="offset-3" md="3" sm="3" xs="3" id='btn'>
                                        <Button block className="btn btn-success" type='submit' >Allocate</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col md="12" sm="12" xs="12">
                                        <div style={{ overflowX: "auto" }}>
                                            <table className="allocate-table">
                                                <tbody>
                                                    <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                        <th>Subjects</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    {allocateSubjects.map((allocateSubject) => (
                                                        <tr >
                                                            <td>{allocateSubject.subjectName}</td>
                                                            <td><Button block className="btn btn-danger" onClick={(e) => handleDelete(allocateSubject)}>Deallocate</Button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default AllocateSubject
