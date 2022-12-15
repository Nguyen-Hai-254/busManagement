import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import EmployeeModal from "components/Modal/EmployeeModal";
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
    Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Coordinator = () => {

    const [coordinator, setcoordinator] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/coordinator/get';
    const [employee, setEmployee] = useState([]);
    const [id, setId] = useState('');
    const [filteredEmployee, setFilteredEmployee] = useState([]);


    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataRoute = res && res.data ? res.data : [];
                setcoordinator(dataRoute);
                setLoading(false);
                setIsError(false);
                const ress = await axios.get('http://localhost:3001/employee/get');
                const data = await ress.data;
                setEmployee(data);
            }
            catch (e) {
                setIsError(true);
                setLoading(false);
                console.log('error: ', e.message);
            }
        }

        loadData();
    }, []);
    useEffect(() => {
        const filterEmployee = async() => {
            const employeeTemp = []
            employee.forEach((e) => {
                let exist = false;
                coordinator.forEach((c) => {
                    if(c['ID_C'] == e['ID']){
                        exist = true
                    }
                })
                if(!exist){
                    employeeTemp.push(e);
                }
            })
            if(employeeTemp.length > 0){
                setFilteredEmployee(employeeTemp)
            }
        };
        filterEmployee();
    }, [employee, coordinator])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id) return
        axios.post("http://localhost:3001/coordinator/insert", {
            id
        })
        let newCoordinator = employee.filter(e => e['ID'] == id);
        console.log(newCoordinator);
        setcoordinator(prev => [...prev, {
            ...newCoordinator[0],
            ID_C: id
        }])
        // setId('');
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/coordinator/delete/${id}`)

        let curr = coordinator;
        curr = curr.filter(item => item['ID_C'] != id)
        setcoordinator(curr);
    }
    return (
        <>
            <h3>ĐIỀU PHỐI VIÊN </h3>
            <Form>
                <Row>
                    <Col className="pr-1" md="1">
                            <label>Chọn NV</label>
                        <Form.Group>
                            <Form.Select className="form-control" onChange={(e) => setId(e.target.value)}>
                                {
                                    filteredEmployee.map((d) => {
                                        return <option value={d['ID']}>{`${d['FNAME']} ${d['LNAME']}`}</option>
                                    })
                                }
                            </Form.Select>
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
                        <th>Mã NV</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>Lương</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && coordinator && coordinator.length > 0 &&
                        coordinator.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID_C']}</td>
                                    <td>{item['FNAME']}</td>
                                    <td>{item['LNAME']}</td>
                                    <td>{item[`SALARY`]}</td>
                                    <td className="last_td">
                                        <Button
                                            className="ml-2"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID_C'])
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

export default Coordinator;