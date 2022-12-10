import { useEffect, useState } from "react";
import axios from "axios";
import ModalEditPickupPoint from "components/Modal/Pickup_pointModal";

import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";

const Pickup_point = () => {

    const [dataPickUpPoint, setDataPickUpPoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const url = 'http://localhost:3001/pickup_point/get';

    const [station_code, setStation_code] = useState();
    const [station_name, setStation_name] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataPickUpPoint = res && res.data ? res.data : [];
                setDataPickUpPoint(dataPickUpPoint);
                setLoading(false);
                setIsError(false);
                console.log(dataPickUpPoint);
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
        axios.post("http://localhost:3001/pickup_point/insert", {
            station_code: station_code,
            station_name: station_name,
            address: address
        })

        // alert("Successful Insert");
        let newPickupPoint = { ['STATION CODE']: station_code, ['STATION NAME']: station_name, ADDRESS: address };
        setDataPickUpPoint([...dataPickUpPoint, newPickupPoint]);
    }

    const handleDelete = (station_code) => {
        axios.delete(`http://localhost:3001/pickup_point/delete/${station_code}`)

        let curr = dataPickUpPoint;
        curr = curr.filter(item => item['STATION CODE'] !== station_code)
        setDataPickUpPoint(curr);
    }

    const handleEdit = (station_code, station_name, address) => {
        let curr = dataPickUpPoint;
        let index = curr.findIndex(item => item[`STATION CODE`] === station_code);

        const newPickupPoint = { [`STATION CODE`]: station_code, [`STATION NAME`]: station_name, ADDRESS: address };

        setDataPickUpPoint(curr.map((curr, index1) => index1 === index ? newPickupPoint : curr));
    }

    return (
        <>
            <h3>Điểm đón khách</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Mã điểm đón</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setStation_code(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                        <Form.Group>
                            <label>Tên điểm đón</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setStation_name(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                        <Form.Group>
                            <label>Địa chỉ</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setAddress(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>

                    <Col className="pr-1" md="2">
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
                        <th>Mã điểm đón</th>
                        <th>Tên điểm đón khách</th>
                        <th>Địa chỉ</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataPickUpPoint && dataPickUpPoint.length > 0 &&
                        dataPickUpPoint.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['STATION CODE']}</td>
                                    <td>{item['STATION NAME']}</td>
                                    <td>{item['ADDRESS']}</td>
                                    <td className="last_td">
                                        <ModalEditPickupPoint
                                            station_code={item['STATION CODE']}
                                            station_name={item['STATION NAME']}
                                            address={item['ADDRESS']}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['STATION CODE'])
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

export default Pickup_point;