import axios from "axios";
import React, { useState, useRef } from "react";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";


const ModalEditMonthly_Ticket = ({ ticketCode, route_id, price, register_date, expire_date, ID, onHandleEdit }) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3001/monthly_ticket/edit/${ticketCode}`, {
                route_id: editRouteId,
                price: editPrice,
                register_date: editRegisterDate,
                expire_date: editExpireDate,
                ID: editID
            })
            // register_datetifyUpdate("success");
            setShow(false);
            onHandleEdit(ticketCode, editRouteId, editPrice, editRegisterDate, editExpireDate, editID);
        }
        catch (err) {
            // register_datetifyUpdate("failed");
            console.log(err)
        }
    };

    const [show, setShow] = useState(false);
    const [editRouteId, setEditRouteId] = useState(route_id);
    const [editPrice, setEditPrice] = useState(price);
    const [editRegisterDate, seteditRegisterDate] = useState(register_date);
    const [editExpireDate, setEditExpireDate] = useState(expire_date);
    const [editID, setEditID] = useState(ID);

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
                        UPDATE MONTHLY TICKET
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Row>
                                <Col lg="4" md sm xs="4" >
                                    <label>Mã vé tháng</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={ticketCode}
                                        readOnly
                                    ></Form.Control>
                                </Col>
                                <Col lg="4" md sm xs="4" >
                                    <label>Thuộc tuyến</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={route_id}
                                        onChange={(e) => setEditRouteId(e.target.value)}
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
                            <Row>
                                <Col lg="6" md sm xs="4">
                                    <label>Ngày đăng kí</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={register_date}
                                        onChange={(e) => seteditRegisterDate(e.target.value)}
                                    ></Form.Control>
                                </Col>
                                <Col lg="6" md sm xs="4">
                                    <label>Ngày hết hạn</label>
                                    <Form.Control
                                        type="date"
                                        defaultValue={expire_date}
                                        onChange={(e) => setEditExpireDate(e.target.value)}
                                    ></Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" md sm xs="4">
                                    <label>Mã khách hàng</label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={ID}
                                        onChange={(e) => setEditID(e.target.value)}
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

export default ModalEditMonthly_Ticket;