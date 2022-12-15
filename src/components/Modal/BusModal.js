import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditBus = ({ license_plate, type_of_bus, r_date, m_date, onHandleEdit }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/bus/edit/${license_plate}`, {
                type_of_bus: editType_of_bus,
                r_date: editR_date,
                m_date: editM_date
            })
            // m_datetifyUpdate("success");
            setShow(false);
            onHandleEdit(license_plate, editType_of_bus, editR_date, editM_date);
        }
        catch (err) {
            // m_datetifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editType_of_bus, setEditType_of_bus] = useState(type_of_bus);
    const [editR_date, setEditR_date] = useState(r_date);
    const [editM_date, setEditM_date] = useState(m_date);

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
                        UPDATE BUS
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>Biển số xe</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={license_plate}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4" >
                                    <label>Loại xe</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={type_of_bus}
                                        onChange={(e) => setEditType_of_bus(e.target.value)}
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" md sm xs="4">
                                    <label>Ngày đăng kí xe</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={r_date}
                                        onChange={(e) => setEditR_date(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Ngày hết hạn bảo trì</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={m_date}
                                        onChange={(e) => setEditM_date(e.target.value)}
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

export default ModalEditBus;