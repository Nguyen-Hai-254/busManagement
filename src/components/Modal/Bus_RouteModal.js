import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditBusRoute = ({ route_id, break_time, onHandleEdit }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/bus_route/edit/${route_id}`, {
                break_time: editBreak_time
            })
            // notifyUpdate("success");
            setShow(false);
            onHandleEdit(route_id, editBreak_time);
        }
        catch (err) {
            // notifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editBreak_time, setEditBreak_time] = useState(break_time);

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
                        UPDATE BUS ROUTE
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>Tuyến xe</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={route_id}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4" >
                                    <label>Thời gian giãn cách</label>
                                    <Form.Control
                                        type="time"
                                        defaultValue={break_time}
                                        onChange={(e) => setEditBreak_time(e.target.value)}
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

export default ModalEditBusRoute;