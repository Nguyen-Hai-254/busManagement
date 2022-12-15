import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const EmployeeModal = ({ id, fname, lname, dob, startDate, salary, onHandleEdit}) => {
    const [idEdit, setIdEdit] = useState(id);
    const [fnameEdit, setFnameEdit] = useState(fname);
    const [lnameEdit, setLnameEdit] = useState(lname);
    const [dobEdit, setDobEdit] = useState(dob);
    const [startDateEdit, setStartDateEdit] = useState(startDate);
    const [salaryEdit, setSalaryEdit] = useState(salary);
    const [show, setShow] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/employee/edit/${id}`, {
                idEdit,
                fnameEdit,
                lnameEdit,
                dobEdit,
                startDateEdit,
                salaryEdit
            })
            // DOBtifyUpdate("success");
            onHandleEdit(idEdit, fnameEdit, lnameEdit, dobEdit, startDateEdit, salaryEdit);
            setShow(false);
        }
        catch (err) {
            // DOBtifyUpdate("failed");
            console.log(err)
        }
    };
    const handleShow = () => {
        setShow(true);
    };
    const buttonAddClose = {
        display: "grid",
        justifyContent: "end",
        paddingRight: "0",
        paddingLeft: "0",
    };

    const titleAdd = {
        marginTop: "0",
    };

    return (
        <>
            <Button
                id="update-penalty-btn"
                type="button"
                variant="primary"
                onClick={handleShow}
                className="position-action-delete"
                size="sm"
            >
                <i className="fas fa-pen-square"></i>
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={titleAdd} className="text-primary modal-title h4">
                        UPDATE EMPLOYEE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>Mã khách hàng</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={id}
                                        readOnly
                                        onChange={(e) => setIdEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Họ</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={fname}
                                        onChange = {(e) => setFnameEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Tên</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={lname}
                                        onChange={(e) => setLnameEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>DOB</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={dob}
                                        onChange = {(e) => setDobEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Start Date</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={startDate}
                                        onChange = {(e) => setStartDateEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Lương</label>
                                    <Form.Control
                                        type="number"
                                        defaultValue={salary}
                                        onChange={(e) => setSalaryEdit(e.target.value)}
                                    ></Form.Control>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Container style={{ marginTop: "25px" }}>
                            <Row>
                                <Col lg="4" md sm xs="4" ></Col>
                                <Col lg="4" md sm xs="4" style={buttonAddClose}>
                                    <Button
                                        id='update-btn'
                                        type="submit"
                                        className="btn-fill btn-wd"
                                        variant="primary"
                                        onClick={(e) => onSubmit(e)}
                                    >
                                        Update
                                    </Button>
                                </Col>
                                <Col lg="4" md sm xs="4" style={buttonAddClose}>
                                    <Button
                                        className="btn-fill btn-wd"
                                        variant="secondary"
                                        onClick={() => setShow(false)}>
                                        Close
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeeModal;