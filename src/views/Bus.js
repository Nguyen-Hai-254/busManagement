import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditBus from "components/Modal/BusModal";
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

const Bus = () => {

    const [dataBus, setDataBus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/bus/get';

    const [license_plate, setLicense_plate] = useState();
    const [type_of_bus, setType_of_bus] = useState();
    const [r_date, setR_date] = useState();
    const [m_date, setM_date] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataBus = res && res.data ? res.data : [];

                dataBus.map(item => {
                    const date = new Date(item['REGISTRATION DATE']);
                    item['REGISTRATION DATE'] = moment.utc(date).format("YYYY-MM-DD");
                    const date2 = new Date(item['MAINTENANCE TIME']);
                    item['MAINTENANCE TIME'] = moment.utc(date).format("YYYY-MM-DD");
                })

                setDataBus(dataBus);
                setLoading(false);
                setIsError(false);
                console.log(dataBus);
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

        axios.post("http://localhost:3001/bus/insert", {
            license_plate: license_plate,
            type_of_bus: type_of_bus,
            r_date: r_date,
            m_date: m_date
        })

        // alert("Successful Insert");
        let newBus = { ['LICENSE PLATE']: license_plate, ['TYPE OF BUS']: type_of_bus, ['REGISTRATION DATE']: r_date, ['MAINTENANCE TIME']: m_date };
        setDataBus([...dataBus, newBus]);
    }

    const handleDelete = (license_plate) => {
        axios.delete(`http://localhost:3001/bus/delete/${license_plate}`)

        let curr = dataBus;
        curr = curr.filter(item => item['LICENSE PLATE'] !== license_plate )
        setDataBus(curr);
    }

    const handleEdit = (license_plate, type_of_bus, r_date, m_date) => {
        let curr = dataBus;
        let index = curr.findIndex(item => item[`LICENSE PLATE`] === license_plate);

        const newBus = { ['LICENSE PLATE']: license_plate, ['TYPE OF BUS']: type_of_bus, ['REGISTRATION DATE']: r_date, ['MAINTENANCE TIME']: m_date };
        console.log(newBus);
        setDataBus(curr.map((curr, index1) => index1 === index ? newBus : curr));
    }

    return (
        <>
            <h3>Xe Bus</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Biển số xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setLicense_plate(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Loại xe</label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setType_of_bus(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Ngày đăng kí xe</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setR_date(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ngày hết hạn bảo trì</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => { setM_date(e.target.value) }}
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
                        <th>Biển số xe</th>
                        <th>Loại xe</th>
                        <th>Ngày đăng kí xe</th>
                        <th>Ngày hết hạn bảo trì</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataBus && dataBus.length > 0 &&
                        dataBus.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['LICENSE PLATE']}</td>
                                    <td>{item['TYPE OF BUS']}</td>
                                    <td>{item['REGISTRATION DATE']}</td>
                                    <td>{item['MAINTENANCE TIME']}</td>
                                    <td className="last_td">
                                        <ModalEditBus
                                            license_plate={item['LICENSE PLATE']}
                                            type_of_bus={item['TYPE OF BUS']}
                                            r_date={item['REGISTRATION DATE']}
                                            m_date={item['MAINTENANCE TIME']}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['LICENSE PLATE'])
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

export default Bus;
