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

const Route = () => {

    const [dataRoute, setDataRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/route/get';

    const [route_id, setRoute_id] = useState();
    const [station_code, setStation_code] = useState();
    const [order, setOrder] = useState();
    const [dataStationName, setDataStationName] = useState([]);


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataRoute = res && res.data ? res.data : [];
                setDataRoute(dataRoute);
                setLoading(false);
                setIsError(false);
                console.log(dataRoute);
            }
            catch (e) {
                setIsError(true);
                setLoading(false);
                console.log('error: ', e.message);
            }
        }

        loadData();

    }, [url]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/pickup_point/get')
                const dataStationName = res && res.data ? res.data : [];
                setDataStationName(dataStationName);
                console.log(dataStationName);
            }
            catch (e) {
                console.log('error: ', e.message);
            }
        }

        loadData();

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3001/route/insert", {
            route_id: route_id,
            station_code: station_code,
            order: order
        })

        const station = dataStationName.filter(item => item[`STATION CODE`] === station_code)
        console.log(station[0][`STATION NAME`]);
        let newRoute = { ['ROUTE ID']: route_id, ['STATION CODE']: station_code, [`STATION NAME`]: station[0][`STATION NAME`], [`ORDER`]: order };
        setDataRoute([...dataRoute, newRoute]);
    }

    const handleDelete = (route_id, station_code, order) => {
        axios.delete(`http://localhost:3001/route/delete/${route_id}/${station_code}/${order}`)

        let curr = dataRoute;
        curr = curr.filter(item => item['ROUTE ID'] !== route_id || item['STATION CODE'] !== station_code || item[`ORDER`] !== order)
        setDataRoute(curr);
    }

    return (
        <>
            <h3>Tuyến xe </h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="1">
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
                            <label htmlFor="exampleInputEmail1">Mã điểm đón</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setStation_code(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>Thứ tự</label>
                            <Form.Control
                                type="number"
                                onChange={(e) => { setOrder(e.target.value) }}
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
                        <th>Tuyến xe</th>
                        <th>Mã điểm đón</th>
                        <th>Tên trạm</th>
                        <th>Thứ tự</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataRoute && dataRoute.length > 0 &&
                        dataRoute.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item['STATION CODE']}</td>
                                    <td>{item['STATION NAME']}</td>
                                    <td>{item[`ORDER`]}</td>
                                    <td className="last_td">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ROUTE ID'], item['STATION CODE'], item[`ORDER`])
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

export default Route;