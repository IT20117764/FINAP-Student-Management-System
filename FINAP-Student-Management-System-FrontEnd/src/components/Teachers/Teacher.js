import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { FormGroup, Row, Col, Card, CardHeader, CardBody, Button, Label, Input, Form } from 'reactstrap';
import axios from 'axios';
import "../scss/main.scss"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import '../scss/comon.scss'

const Teacher = () => {

  const [teacherID, setTeacherID] = useState(0)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [contactNo, setContactNo] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [teachers, setTeachers] = useState([])

  const change = (e) => {

    if (e.target.id === 'firstName') {
      setFirstName(e.target.value)
    }
    else if (e.target.id === 'lastName') {
      setLastName(e.target.value)
    }
    else if (e.target.id === 'contactNo') {
      setContactNo(e.target.value)
    }
    else if (e.target.id === 'emailAddress') {
      setEmailAddress(e.target.value)
    }
  }

  const reset = (e) => {
    setFirstName("")
    setLastName("")
    setContactNo("")
    setEmailAddress("")
    setTeacherID(0)
  }

  const handleSubmit = async () => {
    const data = { teacherID, firstName, lastName, contactNo, emailAddress };
    console.log(data);
    try {
      const response = await axios.post('http://localhost:4000/Teacher/SaveTeacher', data);
      window.location.href = '/teacher';
      console.log(response.data);
      alert('Saved!')
    }
    catch (error) {
      console.log(error.message);
    }
  };

  const valid = (e) => {
    e.preventDefault();
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete("http://localhost:4000/Teacher/DeleteTeacher?teacherID=" + teacherID);
      window.location.href = '/teacher';
      console.log(response.data);
      alert('Delete Successful')
    }
    catch (error) {
      console.log(error.message);
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

  const select = (teacher) => {
    setTeacherID(teacher.teacherID)
    setFirstName(teacher.firstName)
    setLastName(teacher.lastName)
    setContactNo(teacher.contactNo)
    setEmailAddress(teacher.emailAddress)
  }

  useEffect(() => {
    getTeacher();
  }, [])

  return (
    <div>
      <Navbar />
      <Row>
        <Col md="12" sm="12" xs="12">
          <Card id='crd'>
            <CardHeader id='crdHeader'>
              Teacher Details
            </CardHeader>
            <CardBody id="teacher_id">
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
                </FormGroup >
                <FormGroup row id='frmGrp'>
                  <Col md="6" sm="12" xs="12">
                    <Row>
                      <Col md="12" sm="12" xs="12">
                        <Label>Contact No.</Label>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" sm="12" xs="12">
                        <Input id="contactNo" name="contactNo" type="number" value={contactNo} onChange={change} required />

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
                        <Input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={change} required />

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
              Existing Teachers
            </CardHeader>
            <CardBody id="teacher_details_id">
              <FormGroup row id='frmGrp'>
                <Col md="12" sm="12" xs="12">
                  <div style={{ overflowX: "auto" }}>
                    <table className="main-table">
                      <tbody>
                        <tr style={{ color: "white", backgroundColor: "#117811" }}>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Contact No</th>
                          <th>Email Address</th>
                        </tr>
                        {teachers.map((teacher) => (
                          <tr onClick={(e) => select(teacher)}>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>{teacher.contactNo}</td>
                            <td>{teacher.emailAddress}</td>
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

export default Teacher
