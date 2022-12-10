import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditSingleTicket from "components/Modal/Single_TicketModal";

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

const Single_Ticket = () => {

    const [dataSingleTicket, setDataSingleTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/single_ticket/get';

    const [type, setType] = useState();
    const [route_id, setRoute_id] = useState();
    const [price, setPrice] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataSingleTicket = res && res.data ? res.data : [];
                setDataSingleTicket(dataSingleTicket);
                setLoading(false);
                setIsError(false);
                console.log(dataSingleTicket);
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

        axios.post("http://localhost:3001/single_ticket/insert", {
            type: type,
            route_id: route_id,
            price: price
        })

        // alert("Successful Insert");
        let NewSingleTicket = { ['TYPE']: type, ['ROUTE ID']: route_id, ['PRICE']: price };
        setDataSingleTicket([...dataSingleTicket, NewSingleTicket]);
    }

    const handleDelete = (type, route_id) => {
        axios.delete(`http://localhost:3001/single_ticket/delete/${type}/${route_id}`)

        let curr = dataSingleTicket;
        curr = curr.filter(item => item.TYPE !== type || item['ROUTE ID'] !== route_id)
        setDataSingleTicket(curr);
    }

    const handleEdit = (type, route_id, price) => {
        let curr = dataSingleTicket;
        let index = curr.findIndex(item => item[`ROUTE ID`] === route_id && item.TYPE === type);

        const NewSingleTicket = { TYPE: type, ['ROUTE ID']: route_id, PRICE: price };
        console.log(NewSingleTicket);
        setDataSingleTicket(curr.map((curr, index1) => index1 === index ? NewSingleTicket : curr));
    }

    return (
        <>
            <h3>Vé ngày</h3>

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
                            <label htmlFor="exampleInputEmail1">Giá vé</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setPrice(e.target.value) }}
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
                        <th>Giá vé</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataSingleTicket && dataSingleTicket.length > 0 &&
                        dataSingleTicket.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['TYPE']}</td>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item['PRICE']}.000 đ/vé</td>
                                    <td className="last_td">
                                        <ModalEditSingleTicket
                                            type={item['TYPE']}
                                            route_id={item['ROUTE ID']}
                                            price={item['PRICE']}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.TYPE, item['ROUTE ID'])
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

export default Single_Ticket;