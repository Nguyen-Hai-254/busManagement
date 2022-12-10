import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Monthly_TicketModal from "components/Modal/Monthly_TicketModal";

import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

const Monthly_Ticket = () => {

    const [dataMonthlyTicket, setDataMonthlyTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/monthly_ticket/get';

    const [ticketCode, setTicketCode] = useState();
    const [route_id, setRoute_id] = useState();
    const [price, setPrice] = useState();
    const [register_date, setRegister_date] = useState();
    const [expire_date, setExpire_date] = useState();
    const [ID, setID] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataMonthlyTicket = res && res.data ? res.data : [];
                setDataMonthlyTicket(dataMonthlyTicket);
                setLoading(false);
                setIsError(false);
                console.log(dataMonthlyTicket);
            }
            catch (e) {
                setIsError(true);
                setLoading(false);
                console.log('error: ', e.message);
            }
        }

        loadData();

    }, [url]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/monthly_ticket/insert", {
            ticketCode: ticketCode,
            route_id: route_id,
            price: price,
            register_date: register_date,
            expire_date: expire_date,
            ID: ID
        })

        // alert("Successful Insert");
        let newTicketCode = { ['TICKETCODE']: ticketCode, ['ROUTE ID']: route_id, PRICE: price, ['REGISTER DATE']: register_date, ['EXPIRE DATE']: expire_date, ID: ID };
        setDataMonthlyTicket([...dataMonthlyTicket, newTicketCode]);
    }

    const handleDelete = (ticketCode) => {
        axios.delete(`http://localhost:3001/monthly_ticket/delete/${ticketCode}`)

        let curr = dataMonthlyTicket;
        curr = curr.filter(item => item.TICKETCODE !== ticketCode)
        setDataMonthlyTicket(curr);
    }

    const handleEdit = (ticketCode, route_id, price, register_date, expire_date, ID) => {
        let curr = dataMonthlyTicket;
        let index = curr.findIndex(item => item.TICKETCODE === ticketCode);

        const newTicketCode = { TICKETCODE: ticketCode, ['ROUTE ID']: route_id, PRICE: price, ['REGISTER DATE']: register_date, ['EXPIRE DATE']: expire_date, ID: ID };
        console.log(newTicketCode);
        setDataMonthlyTicket(curr.map((curr, index1) => index1 === index ? newTicketCode : curr));
    }

    return (
        <>
            <h3>Vé tháng</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>TICKETCODE</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setTicketCode(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>Tuyến xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setRoute_id(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Giá vé</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setPrice(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày đăng kí</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setRegister_date(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày hết hạn</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setExpire_date(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Mã khách hàng</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setID(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Button
                            className="btn-fill pull-right repairSubmit"
                            type="submit"
                            variant="info"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        <th>TICKETCODE</th>
                        <th>Tuyến xe</th>
                        <th>Giá vé</th>
                        <th>Ngày đăng kí</th>
                        <th>Ngày hết hạn</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataMonthlyTicket && dataMonthlyTicket.length > 0 &&
                        dataMonthlyTicket.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['TICKETCODE']}</td>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item.PRICE}</td>
                                    <td>{item['REGISTER DATE']}</td>
                                    <td>{item['EXPIRE DATE']}</td>
                                    <td>{item.ID}</td>
                                    <td className="last_td">
                                        <Monthly_TicketModal
                                            ticketCode={item['TICKETCODE']}
                                            route_id={item['ROUTE ID']}
                                            price={item.PRICE}
                                            register_date={item['REGISTER DATE']}
                                            expire_date={item['EXPIRE DATE']}
                                            ID={item.ID}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.TICKETCODE)
                                            }}><i className="fas fa-trash"></i></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {loading &&
                        <tr>
                            <td>Loading data....</td>
                        </tr>
                    }
                    {isError &&
                        <tr>
                            <td>Error....</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    );
}

export default Monthly_Ticket;