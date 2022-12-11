import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditMonthlyTicketSalesman from "components/Modal/Monthly_Ticket_SalesmanModal";

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

const Monthly_Ticket_Salesman = () => {

    const [dataMTS, setDataMTS] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/monthly_ticket_salesman/get';

    const [ID_MTS, setID_MTS] = useState();
    const [branch, setBranch] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataMTS = res && res.data ? res.data : [];
                setDataMTS(dataMTS);
                setLoading(false);
                setIsError(false);
                console.log(dataMTS);
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

        axios.post("http://localhost:3001/monthly_ticket_salesman/insert", {
            ID_MTS: ID_MTS,
            branch: branch
        })

        // alert("Successful Insert");
        let newMTS = { ['ID MTS']: ID_MTS, BRANCH: branch };
        setDataMTS([...dataMTS, newMTS]);
    }

    const handleDelete = (ID_MTS, branch, No) => {
        axios.delete(`http://localhost:3001/monthly_ticket_salesman/delete/${ID_MTS}`)

        let curr = dataMTS;
        curr = curr.filter(item => item['ID MTS'] !== ID_MTS)
        setDataMTS(curr);
    }

    const handleEdit = (ID_MTS, branch) => {
        let curr = dataMTS;
        let index = curr.findIndex(item => item['ID MTS'] === ID_MTS);

        const newMTS = { ['ID MTS']: ID_MTS, BRANCH: branch };
        setDataMTS(curr.map((curr, index1) => index1 === index ? newMTS : curr));
    }

    return (
        <>
            <h3>Nhân viên bán vé tháng</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Mã nhân viên</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setID_MTS(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label>Chi nhánh</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setBranch(e.target.value) }}
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
                        <th>Mã nhân viên</th>
                        <th>Chi nhánh</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataMTS && dataMTS.length > 0 &&
                        dataMTS.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID MTS']}</td>
                                    <td>{item.BRANCH}</td>
                                    <td className="last_td">
                                        <ModalEditMonthlyTicketSalesman
                                            ID_MTS={item['ID MTS']}
                                            branch={item.BRANCH}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID MTS'])
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

export default Monthly_Ticket_Salesman;