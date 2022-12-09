import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditShift = ({ No, start_time, finish_time, onHandleEdit }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(editStart_time);
        console.log(editFinish_time);
        try {
            axios.put(`http://localhost:3001/shift/edit/${No}`, {
                start_time: editStart_time,
                finish_time: editFinish_time
                
            })
            // notifyUpdate("success");
            setShow(false);
            onHandleEdit(No, editStart_time, editFinish_time);
        }
        catch (err) {
            // notifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editStart_time, setEditStart_time] = useState(start_time);
    const [editFinish_time, setEditFinish_time] = useState(finish_time);

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
                        UPDATE SHIFT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="6" md sm xs="4" >
                                    <label>No</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={No}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4" >
                                    <label>Thời gian bắt đầu</label>
                                    <Form.Control
                                        type="time"
                                        defaultValue={start_time}
                                        onChange={(e) => setEditStart_time(e.target.value)}
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" md sm xs="4">
                                    <label>Thời gian kết thúc</label>
                                    <Form.Control
                                        type="time"
                                        defaultValue={finish_time}
                                        onChange={(e) => setEditFinish_time(e.target.value)}
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

export default ModalEditShift;