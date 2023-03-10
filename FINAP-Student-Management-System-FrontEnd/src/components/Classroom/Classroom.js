import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Input, Form } from 'reactstrap';
import "../scss/main.scss"
import axios from 'axios';
import '../scss/comon.scss'

const Classroom = () => {

    const [classroomName, setClassroomName] = useState("")
    const [classroomID, setClassroomID] = useState(0)
    const [classrooms, setClassrooms] = useState([])

    const change = (e) => {

        if (e.target.id === 'classroomName') {
            setClassroomName(e.target.value)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { classroomID, classroomName };
        try {
            const response = await axios.post("http://localhost:4000/Class/SaveClass", data);
            window.location.href = '/class';
            console.log(response.data);
            alert('Saved!')
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:4000/Class/DeleteClass?classID=" + classroomID);
            window.location.href = '/class';
            alert('Delete Successful')
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const reset = () => {
        setClassroomID(0)
        setClassroomName("")
    }

    const select = (classroom) => {
        setClassroomName(classroom.classroomName)
        setClassroomID(classroom.classroomID)
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
        getClass()
    }, [])

    return (
        <div>
            <Navbar />
            <Row>
                <Col md="12" sm="12" xs="12">
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Class Room Details
                        </CardHeader>
                        <CardBody id="classroom_id">
                            <Form id ='frm' onSubmit={handleSubmit}>
                                <FormGroup id='frmGrp' row>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Class Name</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="classroomName" name="classroomName" type="text" value={classroomName} onChange={change} required />

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
                            Existing Classrooms
                        </CardHeader>
                        <CardBody id="class_details_id">
                            <FormGroup row id='frmGrp'>
                                <Col md="12" sm="12" xs="12">
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="main-table">
                                            <tbody>
                                                <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                    <th>Class Room Name</th>
                                                </tr>
                                                {classrooms.map((classroom) => (
                                                    <tr onClick={(e) => select(classroom)}>
                                                        <td>{classroom.classroomName}</td>
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
        </div>
    )
}

export default Classroom
