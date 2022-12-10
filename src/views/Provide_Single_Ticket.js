import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditProvideSingleTicket from "components/Modal/Provide_Single_TicketModel";

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

const Provide_Single_Ticket = () => {

    const [dataProvideSingleTicket, setDataProvideSingleTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/provide_single_ticket/get';

    const [type, setType] = useState();
    const [route_id, setRoute_id] = useState();
    const [license_plate, setLicense_plate] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataProvideSingleTicket = res && res.data ? res.data : [];
                // dataProvideSingleTicket = dataProvideSingleTicket.map(item => item.DATE = item.DATE.getDate())
                setDataProvideSingleTicket(dataProvideSingleTicket);
                setLoading(false);
                setIsError(false);
                console.log(dataProvideSingleTicket);
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

        axios.post("http://localhost:3001/provide_single_ticket/insert", {
            type: type,
            route_id: route_id,
            license_plate: license_plate,
            date: date,
            amount: amount
        })

        // alert("Successful Insert");
        let newProvideSingleTicket = { TYPE: type, ['ROUTE ID']: route_id, ['LICENSE PLATE']: license_plate, DATE: date, AMOUNT: amount };
        setDataProvideSingleTicket([...dataProvideSingleTicket, newProvideSingleTicket]);
    }

    const handleDelete = (type, route_id, license_plate, date) => {
        axios.delete(`http://localhost:3001/provide_single_ticket/delete/${type}/${route_id}/${license_plate}/${date}`)

        let curr = dataProvideSingleTicket;
        curr = curr.filter(item => item.TYPE !== type || item['ROUTE ID'] !== route_id || item['LICENSE PLATE'] !== license_plate || item.date !== date)
        setDataProvideSingleTicket(curr);
    }

    const handleEdit = (type, route_id, license_plate, date, amount) => {
        let curr = dataProvideSingleTicket;
        let index = curr.findIndex(item => item.TYPE === type && item[`ROUTE ID`] === route_id && item[`LICENSE PLATE`] === license_plate && item.date === date);

        const newProvideSingleTicket = { TYPE: type, ['ROUTE ID']: route_id, ['LICENSE PLATE']: license_plate, DATE: date, AMOUNT: amount };
        console.log(newProvideSingleTicket);
        setDataProvideSingleTicket(curr.map((curr, index1) => index1 === index ? newProvideSingleTicket : curr));
    }

    return (
        <>
            <h3>Đã bán vé ngày</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Loại vé</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setType(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Tuyến xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setRoute_id(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Biến số xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setLicense_plate(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày bán</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setDate(e.target.value)}}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Số lượng</label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setAmount(e.target.value) }}
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
                        <th>Loại vé</th>
                        <th>Tuyến xe</th>
                        <th>Biển số xe</th>
                        <th>Ngày bán</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataProvideSingleTicket && dataProvideSingleTicket.length > 0 &&
                        dataProvideSingleTicket.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.TYPE}</td>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item['LICENSE PLATE']}</td>
                                    <td>{item.DATE}</td>
                                    <td>{item.AMOUNT}</td>
                                    <td className="last_td">
                                        <ModalEditProvideSingleTicket
                                            type={item.TYPE}
                                            route_id={item['ROUTE ID']}
                                            license_plate={item['LICENSE PLATE']}
                                            date={item.date}
                                            amount={item.amount}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.TYPE, item['ROUTE ID'], item['LICENSE PLATE'], item.DATE)
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

export default Provide_Single_Ticket;