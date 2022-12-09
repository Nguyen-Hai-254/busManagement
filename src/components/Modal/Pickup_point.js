import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditPickupPoint = ({ station_code, station_name, address, onHandleEdit }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/pickup_point/edit/${station_code}`, {
                station_name: editStation_name,
                address: editAddress
            })
            // notifyUpdate("success");
            setShow(false);
            onHandleEdit(station_code, editStation_name, editAddress);
        }
        catch (err) {
            // notifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editStation_name, setEditStation_name] = useState();
    const [editAddress, setEditAddress] = useState();

    const handleShow = () => {
        setShow(true);
        // reset();
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
                        UPDATE PICKUP POINT
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="4" md sm xs="4" >
                                    <label>Mã điểm đón</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={station_code}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="8" md sm xs="4" >
                                    <label>Tên điểm đón</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={station_name}
                                        onChange={(e) => { setEditStation_name(e.target.value) }}
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="12" md sm xs="4">
                                    <label>Địa chỉ</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={address}
                                        onChange={(e) => { setEditAddress(e.target.value) }}
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

export default ModalEditPickupPoint;