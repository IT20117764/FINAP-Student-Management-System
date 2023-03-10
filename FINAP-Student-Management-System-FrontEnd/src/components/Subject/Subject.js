import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Input, Form } from 'reactstrap';
import "../scss/main.scss"
import axios from 'axios';
import '../scss/comon.scss'

const Subject = () => {

    const [subjectName, setSubjectName] = useState("")
    const [subjectID, setSubjectID] = useState(0)
    const [subjects, setSubjects] = useState([])

    const change = (e) => {

        if (e.target.id === 'subjectName') {
            setSubjectName(e.target.value)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { subjectID, subjectName };
        try {
            const response = await axios.post("http://localhost:4000/Subject/SaveSubject", data);
            window.location.href = '/subject';
            console.log(response.data);
            alert('Saved!')
        }
        catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:4000/Subject/DeleteSubject?subjectID=" + subjectID);
            window.location.href = '/subject';
            alert('Delete Successful')
            console.log(response.data);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const reset = () => {
        setSubjectName("")
        setSubjectID(0)
    }

    const select = (classroom) => {
        setSubjectName(classroom.subjectName)
        setSubjectID(classroom.subjectID)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/Subject/GetSubjects')
            .then(response => {
                setSubjects(response.data.result)
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            <Navbar />
            <Row>
                <Col md="12" sm="12" xs="12">
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Subject Details
                        </CardHeader>
                        <CardBody id="subject_id">
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row id='frmGrp'>
                                    <Col md="6" sm="12" xs="12">
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Label>Subject Name</Label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" sm="12" xs="12">
                                                <Input id="subjectName" name="subjectName" type="text" value={subjectName} onChange={change} required />

                                            </Col>
                                        </Row>
                                    </Col>
                                </FormGroup >
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
                                </FormGroup >
                            </Form>
                        </CardBody>
                    </Card>
                    <br/>
                    <Card id='crd'>
                        <CardHeader id='crdHeader'>
                            Existing Subjects
                        </CardHeader>
                        <CardBody id="subject_details_id">
                            <FormGroup row id='frmGrp' >
                                <Col md="12" sm="12" xs="12">
                                    <div style={{ overflowX: "auto" }}>
                                        <table className="main-table">
                                            <tbody>
                                                <tr style={{ color: "white", backgroundColor: "#117811" }}>
                                                    <th>Subject Name</th>
                                                </tr>
                                                {subjects.map((subject) => (
                                                    <tr onClick={(e) => select(subject)}>
                                                        <td>{subject.subjectName}</td>
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

export default Subject
