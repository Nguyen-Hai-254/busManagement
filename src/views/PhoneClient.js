import { useEffect, useState } from "react";
import axios, { Axios } from "axios";

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

const PhoneClient = () => {

    const [dataPhoneClient, setDataPhoneClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/phoneclient/get';

    const [ID, setID] = useState();
    const [phone, setPhone] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataPhoneClient = res && res.data ? res.data : [];
                setDataPhoneClient(dataPhoneClient);
                setLoading(false);
                setIsError(false);
                console.log(dataPhoneClient);
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

        axios.post("http://localhost:3001/phoneclient/insert", {
            ID: ID,
            phone: phone
        })

        // alert("Successful Insert");
        let newPhoneClient = { ID: ID, PHONE: phone};
        setDataPhoneClient([...dataPhoneClient, newPhoneClient]);
    }

    const handleDelete = (ID, phone) => {
        axios.delete(`http://localhost:3001/phoneclient/delete/${ID}/${phone}`)

        let curr = dataPhoneClient;
        curr = curr.filter(item => item.ID !== ID || item.PHONE !== phone)
        setDataPhoneClient(curr);
    }

    return (
        <>
            <h3>Số điện thoại khách hàng</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Mã khách hàng</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setID(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Số điện thoại</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setPhone(e.target.value) }}
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
                        <th>Mã khách hàng</th>
                        <th>Số điện thoại</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataPhoneClient && dataPhoneClient.length > 0 &&
                        dataPhoneClient.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.PHONE}</td>
                                    <td className="last_td">
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.ID, item.PHONE)
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

export default PhoneClient;