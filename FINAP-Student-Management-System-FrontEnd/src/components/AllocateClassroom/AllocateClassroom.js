import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Form } from 'reactstrap';
import "../scss/main.scss"
import axios from 'axios';
import '../scss/comon.scss'

const AllocateClassroom = () => {

    const [allocateClassroomID, setAllocateClassroomID] = useState(0)
    const [teacherID, setTeacherID] = useState(0)
    const [classroomID, setClassroomID] = useState(0)
    const [classrooms, setClassrooms] = useState([])
    const [teachers, setTeachers] = useState([])
    const [allocateClassrooms, setAllocateClassrooms] = useState([])

    const change = (e) => {

        if (e.target.id === 'classroomID') {
            setClassroomID(parseInt(e.target.value))
        }
        else if (e.target.id === 'teacherID') {
            setTeacherID(parseInt(e.target.value))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { teacherID, classroomID };
        try {
            const response = await axios.post("http://localhost:4000/AllocateClassroom/SaveAllocateClassroom", data);
            window.location.href = '/alloclass';
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (allocateSubject) => {
        setAllocateClassroomID(allocateSubject.allocateClassroomID)
        try {
            const response = await axios.delete("http://localhost:4000/AllocateClassroom/DeleteAllocateClassroom?allocateClassroomID=" + allocateClassroomID);
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const getAllocatedClass = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/AllocateClassroom/GetAllocateClassrooms?teacherID=${teacherID}`);
            setAllocateClassrooms(response.data.result);
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

    const getClass = async () => {
        try {
            const response = await axios.get('http://localhost:4000/Class/GetClasses');
            setClassrooms(response.data.result);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTeacher()
        getClass()
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
                            <CardBody id="teacher_input_criteria_id">

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
                                        <Button block className="btn btn-success" onClick={getAllocatedClass}>Save</Button>
                                    </Col>
                                </FormGroup>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card id='crd'>
                            <CardHeader id='crdHeader'>
                                Allocate Classrooms
                            </CardHeader>
                            <CardBody id="subject_input_criteria_id">

                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Class Room</Label> {" "}
                                                <select className='box' id="classroomID" name="classroomID" type="number" value={classroomID} onChange={change} required defaultValue="">
                                                    <option value="">Select a ClassRoom</option>
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
                                        <Button block className="btn btn-success" type='submit' >Allocate</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row id='frmGrp'>
                                    <Col md="12" sm="12" xs="12">
                                        <div style={{ overflowX: "auto" }}>
                                            <table className="allocate-table">
                                                <tbody>
                                                    <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                        <th>Classrooms</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    {allocateClassrooms.map((allocateClassroom) => (
                                                        <tr >
                                                            <td>{allocateClassroom.classroomName}</td>
                                                            <td><Button block className="btn btn-danger" onClick={(e) => handleDelete(allocateClassroom)}>Deallocate</Button></td>
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

export default AllocateClassroom
