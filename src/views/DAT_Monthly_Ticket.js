import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import Moment from 'react-moment';

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
import moment from "moment";

const DAT_Monthly_Ticket = () => {

    const [dataDAT, setDataDAT] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/dat_monthly_ticket/get';

    const [ticketcode, setTicketcode] = useState();
    const [date, setDate] = useState();
    const [time, SetTime] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataDAT = res && res.data ? res.data : [];
                
                dataDAT.map(item => {
                    const date = new Date(item['DATE AND TIME']);
                    item['DATE AND TIME'] = moment.utc(date).format("YYYY-MM-DD hh:mm:ss ")
                })
                
                setDataDAT(dataDAT);
                setLoading(false);
                setIsError(false);
                console.log(dataDAT);
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

        axios.post("http://localhost:3001/dat_monthly_ticket/insert", {
            ticketcode: ticketcode,
            date: date,
            time: time
        })

        // alert("Successful Insert");
        let newDAT = { TICKETCODE: ticketcode, ['DATE AND TIME']: date + ' ' + time };
        setDataDAT([...dataDAT, newDAT]);
    }

    const handleDelete = (ticketcode, dateAndTime) => {
        axios.delete(`http://localhost:3001/dat_monthly_ticket/delete/${ticketcode}/${dateAndTime}`)

        let curr = dataDAT;
        curr = curr.filter(item => item.TICKETCODE !== ticketcode || item['DATE AND TIME'] !== dateAndTime)
        setDataDAT(curr);
    }

    return (
        <>
            <h3>Ngày và giờ sử dụng vé tháng</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>TICKETCODE</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setTicketcode(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày và giờ</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setDate(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày và giờ</label>
                            <Form.Control
                                type="time"
                                onChange={(e) => { SetTime(e.target.value) }}
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
                        <th>Ngày và giờ</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataDAT && dataDAT.length > 0 &&
                        dataDAT.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.TICKETCODE}</td>
                                    <td>{item['DATE AND TIME']}</td>
                                    <td className="last_td">
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.TICKETCODE, item['DATE AND TIME'])
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

export default DAT_Monthly_Ticket;