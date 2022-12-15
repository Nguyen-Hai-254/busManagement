import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import moment from "moment";

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

const Sold_Monthly_Ticket = () => {

    const [dataSMT, setDataSMT] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/sold_monthly_ticket/get';

    const [id_mts, setId_mts] = useState();
    const [ID, setID] = useState();
    const [buyDate, setBuyDate] = useState();
    const [buyTime, setBuyTime] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataSMT = res && res.data ? res.data : [];

                dataSMT.map(item => {
                    const date = new Date(item['BUY DATE']);
                    item['BUY DATE'] = moment.utc(date).format("YYYY-MM-DD")
                })

                setDataSMT(dataSMT);
                setLoading(false);
                setIsError(false);
                console.log(dataSMT);
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

        axios.post("http://localhost:3001/sold_monthly_ticket/insert", {
            id_mts: id_mts,
            ID: ID,
            buyDate: buyDate,
            buyTime: buyTime
        })

        // alert("Successful Insert");
        let newSMT = { ['ID MTS']: id_mts, ID: ID, ['BUY DATE']: buyDate + ' ' + buyTime };
        setDataSMT([...dataSMT, newSMT]);
    }

    const handleDelete = (id_mts, ID, buyDate) => {
        axios.delete(`http://localhost:3001/sold_monthly_ticket/delete/${id_mts}/${ID}/${buyDate}`)

        let curr = dataSMT;
        curr = curr.filter(item => item['ID MTS'] !== id_mts || item.ID !== ID || item['BUY DATE'] !== buyDate)
        setDataSMT(curr);
    }

    return (
        <>
            <h3>Đã bán vé tháng</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Mã nhân viên bán vé</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setId_mts(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label >Mã khách hàng</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setID(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày mua</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setBuyDate(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Giờ mua</label>
                            <Form.Control
                                type="time"
                                onChange={(e) => { setBuyTime(e.target.value) }}
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
                        <th>Mã nhân viên bán hàng</th>
                        <th>Mã khách hàng</th>
                        <th>Ngày mua</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataSMT && dataSMT.length > 0 &&
                        dataSMT.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID MTS']}</td>
                                    <td>{item.ID}</td>
                                    <td>{item['BUY DATE']}</td>
                                    <td className="last_td">
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID MTS'], item.ID, item['BUY DATE'])
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

export default Sold_Monthly_Ticket;