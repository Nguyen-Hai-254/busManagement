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

const Driver = () => {

    const [driver, setDriver] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/driver/get';
    const [employee, setEmployee] = useState([]);
    const [id, setId] = useState('');
    const [cl, setCl] = useState('');
    const [filteredEmployee, setFilteredEmployee] = useState([]);
    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataRoute = res && res.data ? res.data : [];
                console.log(dataRoute);
                setDriver(dataRoute);
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
                driver.forEach((c) => {
                    if(c['ID_DRIVER'] == e['ID']){
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
    }, [employee, driver])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id) return
        axios.post("http://localhost:3001/driver/insert", {
            id,
            cl
        })
        let newDeriver = employee.filter(e => e['ID'] == id);
        setDriver(prev => [...prev, {
            ...newDeriver[0],
            LICENSE_CLASS: cl,
            ID_DRIVER: id
        }])
        setId('');
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/driver/delete/${id}`)

        let curr = driver;
        curr = curr.filter(item => item['ID_DRIVER'] != id)
        setDriver(curr);
    }
    return (
        <>
            <h3>Lái xe </h3>
            <Form>
                <Row>
                    <div className="pr-1" style={{width: '100%', display: 'flex'}}>
                        <div>
                            <label>Chọn NV</label>
                            <Form.Select className="form-control" style={{width: 200}} onChange={(e) => setId(e.target.value)}>
                                {
                                    filteredEmployee.map((d) => {
                                        return <option value={d['ID']}>{`${d['FNAME']} ${d['LNAME']}`}</option>
                                    })
                                }
                            </Form.Select>
                        </div>
                        <div className="mx-2">
                            <label>LICENSE CLASS</label>
                            <input type="text" required class="form-control" style={{width: 200}} onChange={(e) => setCl(e.target.value)}/>
                        </div>
                        <Button
                            className="btn-fill pull-right repairSubmit"
                            type="submit"
                            variant="info"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </Button>
                    </div>
                </Row>
            </Form>

            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        <th>Mã NV</th>
                        <th>Tên</th>
                        <th>Họ</th>
                        <th>bằng hạng</th>
                        <th>Lương</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && driver && driver.length > 0 &&
                        driver.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID_DRIVER']}</td>
                                    <td>{item['FNAME']}</td>
                                    <td>{item['LNAME']}</td>
                                    <td>{item['LICENSE_CLASS']}</td>
                                    <td>{item[`SALARY`]}</td>
                                    <td className="last_td">
                                        <Button
                                            className="ml-2"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID_DRIVER'])
                                            }}><i className="fas fa-trash"></i>
                                        </Button>
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

export default Driver;