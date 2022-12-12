import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditClient from "components/Modal/ClientModal";
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

const Client = () => {

    const [dataClient, setDataClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/client/get';

    const [ID, setID] = useState();
    const [name, setName] = useState();
    const [DOB, setDOB] = useState();
    const [address, setAddress] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataClient = res && res.data ? res.data : [];

                dataClient.map(item => {
                    const date = new Date(item.DOB);
                    item.DOB = moment.utc(date).format("YYYY-MM-DD")
                })

                setDataClient(dataClient);
                setLoading(false);
                setIsError(false);
                console.log(dataClient);
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
        console.log(ID);
        console.log(name);
        console.log('dob', DOB);
        console.log(address);

        axios.post("http://localhost:3001/client/insert", {
            ID: ID,
            name: name,
            DOB: DOB,
            address: address
        })

        // alert("Successful Insert");
        let newClient = { ID: ID, NAME: name, DOB: DOB, ADDRESS: address };
        setDataClient([...dataClient, newClient]);
    }

    const handleDelete = (ID) => {
        axios.delete(`http://localhost:3001/client/delete/${ID}`)

        let curr = dataClient;
        curr = curr.filter(item => item.ID !== ID)
        setDataClient(curr);
    }

    const handleEdit = (ID, name, DOB, address) => {
        let curr = dataClient;
        let index = curr.findIndex(item => item.ID === ID);

        const newClient = { ID: ID, NAME: name, DOB: DOB, ADDRESS: address };
        console.log(newClient);
        setDataClient(curr.map((curr, index1) => index1 === index ? newClient : curr));
    }

    return (
        <>
            <h3>Thông tin khách hàng</h3>

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
                            <label>Họ và tên</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setName(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày sinh</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setDOB(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Địa chỉ</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setAddress(e.target.value) }}
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
                        <th>Họ và tên</th>
                        <th>Ngày sinh</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataClient && dataClient.length > 0 &&
                        dataClient.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.NAME}</td>
                                    <td>{item.DOB}</td>
                                    <td>{item.ADDRESS}</td>
                                    <td className="last_td">
                                        <ModalEditClient
                                            ID={item.ID}
                                            name={item.NAME}
                                            DOB={item.DOB}
                                            address={item.ADDRESS}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.ID)
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

export default Client;