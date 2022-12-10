import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditBusRoute from "components/Modal/Bus_RouteModal";

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

const Bus_Route = () => {

    const [dataBusRoute, setDataBusRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/bus_route/get';

    const [route_id, setRoute_id] = useState();
    const [break_time, setBreak_time] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataBusRoute = res && res.data ? res.data : [];
                setDataBusRoute(dataBusRoute);
                setLoading(false);
                setIsError(false);
                console.log(dataBusRoute);
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

        axios.post("http://localhost:3001/bus_route/insert", {
            route_id: route_id,
            break_time: break_time
        })

        // alert("Successful Insert");
        let newBusRoute = { ['ROUTE ID']: route_id, ['BREAK TIME']: break_time };
        setDataBusRoute([...dataBusRoute, newBusRoute]);
    }

    const handleDelete = (route_id) => {
        axios.delete(`http://localhost:3001/bus_route/delete/${route_id}`)

        let curr = dataBusRoute;
        curr = curr.filter(item => item['ROUTE ID'] !== route_id)
        setDataBusRoute(curr);
    }

    const handleEdit = (route_id, break_time) => {
        let curr = dataBusRoute;
        let index = curr.findIndex(item => item[`ROUTE ID`] === route_id);

        const newBusRoute = { ['ROUTE ID']: route_id, ['BREAK TIME']: break_time };

        setDataBusRoute(curr.map((curr, index1) => index1 === index ? newBusRoute : curr));
    }

    return (
        <>
            <h3>Tuyến xe</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
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
                            <label htmlFor="exampleInputEmail1">Thời gian giãn cách</label>
                            <Form.Control
                                type="time"
                                onChange={(e) => { setBreak_time(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="pl-1" md="2">
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
                        <th>Thời gian giãn cách</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataBusRoute && dataBusRoute.length > 0 &&
                        dataBusRoute.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ROUTE ID']}</td>
                                    <td>{item['BREAK TIME']}</td>
                                    <td className="last_td">
                                        <ModalEditBusRoute
                                            route_id={item['ROUTE ID']}
                                            break_time={item['BREAK TIME']}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ROUTE ID'])
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

export default Bus_Route;