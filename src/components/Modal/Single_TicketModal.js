import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditSingleTicket = ({ type, route_id, price, onHandleEdit }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/single_ticket/edit/${type}/${route_id}`, {
                price: editPrice
            })
            // notifyUpdate("success");
            setShow(false);
            onHandleEdit(type, route_id, editPrice);
        }
        catch (err) {
            // notifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editPrice, setEditPrice] = useState(type);

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
                        UPDATE SINGLE TICKET
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="4" md sm xs="4" >
                                    <label>Loại vé</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={type}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="4" md sm xs="4" >
                                    <label>Thuộc tuyến</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={route_id}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="4" md sm xs="4">
                                    <label>Giá vé</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={price}
                                        onChange={(e) => setEditPrice(e.target.value)}
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

export default ModalEditSingleTicket;