import { useEffect, useState } from "react";
import axios from "axios";

import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

const Hai = () => {

    const [dataInRoute, setDataInRoute] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/api/in_route/get';

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

    return (
        <>
            <h3>Thuộc tuyến xe</h3>
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
                                    {/* <ModalUpdatePenalty
                                        LICENSE PLATE = {item['LICENSE PLATE']}
                                        ROUTE ID = {item['ROUTE ID']}
                                        MOVEMENT DIRECTION = {item['MOVEMENT DIRECTION']}
                                        No = {item.No}
                                    /> */}
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

export default Hai;