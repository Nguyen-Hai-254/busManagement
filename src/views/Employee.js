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
} from "react-bootstrap";

const Employee = () => {

    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/employee/get';

    const [id, setId] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [dob, setDob] = useState('');
    const [startDate, setStartDate] = useState('');
    const [salary, setSalary] = useState('');
    const [fetching, setFetching] = useState(false);


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataRoute = res && res.data ? res.data : [];
                setEmployee(dataRoute);
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
                // setDataStationName(dataStationName);
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
        axios.post("http://localhost:3001/employee/insert", {
            id,
            fname,
            lname,
            dob,
            startDate,
            salary
        })
       setEmployee(prev => [...prev, {
        ID: id,
        FNAME: fname,
        LNAME: lname,
        DOB: dob,
        STARTDATE: startDate,
        SALARY: salary
       }])
    }

    const handleDelete = (id, station_code, order) => {
        axios.delete(`http://localhost:3001/employee/delete/${id}`)

        let curr = employee;
        curr = curr.filter(item => item['ID'] !== id)
        setEmployee(curr);
    }
    const formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    }
    const handleEdit = (id, fname, lname, dob, startDate, salary) => {
        const editedEmployee = {
            ID: id,
            FNAME: fname,
            LNAME: lname,
            DOB: dob,
            STARTDATE: startDate,
            SALARY: salary
        }
        let newEmployess = []
        employee.forEach((e) => {
            if(e['ID'] === id){
                newEmployess.push(editedEmployee);
            }else{
                newEmployess.push(e)
            }
        })
        setEmployee(newEmployess)
    }
    return (
        <>
            <h3>Nhân Viên </h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="1">
                        <Form.Group>
                            <label>Mã nv</label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>setId(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
                        <Form.Group>
                            <label htmlFor="exampleInputEmail1">Họ</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>Tên</label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>setLname(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>DoB</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => setDob(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>Ngày bắt đầu</label>
                            <Form.Control
                                type="date"
                                onChange={(e) => setStartDate(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="1">
                        <Form.Group>
                            <label>Lương</label>
                            <Form.Control
                                type="number"
                                onChange={(e) => setSalary(e.target.value)}
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
                        <th>Mã NV</th>
                        <th>Họ</th>
                        <th>Tên</th>
                        <th>DOB</th>
                        <th>Ngày bắt đầu</th>
                        <th>Lương</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && employee && employee.length > 0 &&
                        employee.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID']}</td>
                                    <td>{item['FNAME']}</td>
                                    <td>{item['LNAME']}</td>
                                    <td>{formatDate(item[`DOB`])}</td>
                                    <td>{formatDate(item[`START DATE`])}</td>
                                    <td>{item[`SALARY`]}</td>
                                    <td className="last_td">
                                        <EmployeeModal
                                            id ={item['ID']}
                                            fname= {item['FNAME']}
                                            lname={item['LNAME']}
                                            dob={item['DOB']}
                                            startDate={item['START DATE']}
                                            salary = {item[`SALARY`]}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            className="ml-2"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID'])
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

export default Employee;