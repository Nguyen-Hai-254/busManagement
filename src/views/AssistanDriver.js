import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {
    Button,
    Form,
    Table,
    Row,
} from "react-bootstrap";

const AssitanDriver = () => {

    const [assistandriver, setAssistantDriver] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/assistandriver/get';
    const [employee, setEmployee] = useState([]);
    const [id, setId] = useState('');
    const [filteredEmployee, setFilteredEmployee] = useState([]);
    useEffect(() => {
        setLoading(true);
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataAssistant = res && res.data ? res.data : [];
                setAssistantDriver(dataAssistant);
                setLoading(false);
                setIsError(false);
                const ress = await axios.get('http://localhost:3001/employee/get');
                const data = await ress.data;
                setEmployee(data);
            }
            catch (e) {
                setIsError(true);
                setLoading(false);
            }
        }

        loadData();
    }, []);
    useEffect(() => {
        const filterEmployee = async() => {
            const employeeTemp = []
            employee.forEach((e) => {
                let exist = false;
                assistandriver.forEach((c) => {
                    if(c['ID_AD'] == e['ID']){
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
    }, [employee, assistandriver])
    console.log(filteredEmployee);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id) return
        axios.post("http://localhost:3001/assistandriver/insert", {
            id
        })
        let newAssistant = employee.filter(e => e['ID'] == id);
        setAssistantDriver(prev => [...prev, {
            ...newAssistant[0],
            ID_AD: id
        }])
        setId('');
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/assistandriver/delete/${id}`)

        let curr = assistandriver;
        curr = curr.filter(item => item['ID_AD'] != id)
        setAssistantDriver(curr);
    }
    return (
        <>
            <h3>Phụ xe </h3>
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
                        <th>Lương</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && assistandriver && assistandriver.length > 0 &&
                        assistandriver.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID_AD']}</td>
                                    <td>{item['FNAME']}</td>
                                    <td>{item['LNAME']}</td>
                                    <td>{item[`SALARY`]}</td>
                                    <td className="last_td">
                                        <Button
                                            className="ml-2"
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID_AD'])
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

export default AssitanDriver;