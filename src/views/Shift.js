import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditShift from "components/Modal/ShiftModal";

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

const Shift = () => {

    const [dataShift, setDataShift] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/shift/get';

    const [No, setNo] = useState();
    const [start_time, setStart_time] = useState();
    const [finish_time, setFinish_time] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataShift = res && res.data ? res.data : [];
                setDataShift(dataShift);
                setLoading(false);
                setIsError(false);
                console.log(dataShift);
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

        axios.post("http://localhost:3001/shift/insert", {
            No: No,
            start_time: start_time,
            finish_time: finish_time
        })

        // alert("Successful Insert");
        let newShift = { No: No, ['START TIME']: start_time, ['FINISH TIME']: finish_time };
        setDataShift([...dataShift, newShift]);
    }

    const handleDelete = (No) => {
        axios.delete(`http://localhost:3001/shift/delete/${No}`)

        let curr = dataShift;
        curr = curr.filter(item => item.No !== No)
        setDataShift(curr);
    }

    const handleEdit = (No, start_time, finish_time) => {
        let curr = dataShift;
        let index = curr.findIndex(item => item.No === No);

        const newShift = { No: No, ['START TIME']: start_time, ['FINISH TIME']: finish_time};
        console.log(newShift);
        setDataShift(curr.map((curr, index1) => index1 === index ? newShift : curr));
    }

    return (
        <>
            <h3>Ca chạy</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>No</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setNo(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Thời gian bắt đầu chạy</label>
                            <Form.Control
                                type="time"
                                onChange={(e) => { setStart_time(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Thời gian dự kiến kết thúc</label>
                            <Form.Control
                                type="time"
                                onChange={(e) => { setFinish_time(e.target.value) }}
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
                        <th>No</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataShift && dataShift.length > 0 &&
                        dataShift.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.No}</td>
                                    <td>{item['START TIME']}</td>
                                    <td>{item['FINISH TIME']}</td>
                                    <td className="last_td">
                                        <ModalEditShift
                                            No={item.No}
                                            start_time={item['START TIME']}
                                            finish_time={item['FINISH TIME']}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item.No)
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

export default Shift;