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

const In_Route = () => {

    const [dataInRoute, setDataInRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/api/in_route/get';

    const [license_plate, setLicense_plate] = useState();
    const [route_id, setRoute_id] = useState();
    const [movement_direction, setMovement_direction] = useState();
    const [No, setNo] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataInRoute = res && res.data ? res.data : [];
                setDataInRoute(dataInRoute);
                setLoading(false);
                setIsError(false);
                console.log(dataInRoute);
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

        axios.post("http://localhost:3001/api/in_route/insert", {
            license_plate: license_plate,
            route_id: route_id,
            movement_direction: movement_direction,
            No: No
        })

        alert("Successful Insert");
        let newInRoute = { ['LICENSE PLATE']: license_plate, ['ROUTE ID']: route_id, ['MOVEMENT DIRECTION']: movement_direction, No: No };
        setDataInRoute([...dataInRoute, newInRoute]);
    }

    const handleDelete = (route_id, movement_direction, No) => {
        console.log(route_id);
        console.log(movement_direction);
        console.log(No);
        axios.delete(`http://localhost:3001/api/in_route/delete/${route_id}/${movement_direction}/${No}`)

        let curr = dataInRoute;
        curr = curr.filter(item => item['ROUTE ID'] !== route_id || item['MOVEMENT DIRECTION'] !== movement_direction || item.No !== No)
        setDataInRoute(curr);
    }

    return (
        <>
            <h3>Thuộc tuyến xe</h3>

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
                            <label>Tuyến xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setRoute_id(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Chiều di chuyển</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setMovement_direction(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Ca chạy</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setNo(e.target.value) }}
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
                        <th>Tuyến xe</th>
                        <th>Chiều di chuyển</th>
                        <th>Ca chạy</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataInRoute && dataInRoute.length > 0 &&
                        dataInRoute.map((item, index) => {
                            const date = new Date(item.Date)
                            return (
                                <tr key={index}>
                                    <td>{item['LICENSE PLATE']}</td>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item['MOVEMENT DIRECTION']}</td>
                                    <td>{item.No}</td>
                                    <td>
                                        <button onClick={() => {
                                            handleDelete(item['ROUTE ID'], item['MOVEMENT DIRECTION'], item.No)
                                        }}>Delete</button>
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

export default In_Route;