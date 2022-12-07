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

const Pickup_point = () => {

    const [dataPickUpPoint, setDataPickUpPoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/api/pickup_point/get';

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

    return (
        <>
            <h3>Điểm đón khách</h3>
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
                            const date = new Date(item.Date)
                            return (
                                <tr key={index}>
                                    <td>{item['STATION CODE']}</td>
                                    <td>{item['STATION NAME']}</td>
                                    <td>{item['ADDRESS']}</td>
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

export default Pickup_point;