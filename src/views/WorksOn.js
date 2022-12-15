import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import ModalEditWorksOn from "components/Modal/WorksOnModal";

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

const WorksOn = () => {

    const [dataDrive, setDataDrive] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const url = 'http://localhost:3001/works_on/get';

    const [id_driver, setId_driver] = useState();
    const [license_plate, setLicense_plate] = useState();
    const [ID_AD, setID_AD] = useState();


    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(url)
                const dataDrive = res && res.data ? res.data : [];
                setDataDrive(dataDrive);
                setLoading(false);
                setIsError(false);
                console.log(dataDrive);
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

        axios.post("http://localhost:3001/works_on/insert", {
            id_driver: id_driver,
            license_plate: license_plate,
            ID_AD: ID_AD
        })

        // alert("Successful Insert");
        let newDrive = { ['ID_DRIVER']: id_driver, ['LICENSE PLATE']: license_plate, ID_AD: ID_AD };
        setDataDrive([...dataDrive, newDrive]);
    }

    const handleDelete = (id_driver, license_plate) => {
        axios.delete(`http://localhost:3001/works_on/delete/${id_driver}/${license_plate}`)

        let curr = dataDrive;
        curr = curr.filter(item => item['ID_DRIVER'] !== id_driver || item['LICENSE PLATE'] !== license_plate)
        setDataDrive(curr);
    }

    const handleEdit = (id_driver, license_plate, ID_AD) => {
        console.log(id_driver);
        console.log(license_plate);
        console.log(ID_AD)
        let curr = dataDrive;
        let index = curr.findIndex(item => item['ID_DRIVER'] === id_driver && item['LICENSE PLATE']=== license_plate);

        const newDrive = { ['ID_DRIVER']: id_driver, ['LICENSE PLATE']: license_plate, ID_AD: ID_AD };
        console.log(newDrive);
        setDataDrive(curr.map((curr, index1) => index1 === index ? newDrive : curr));
    }

    return (
        <>
            <h3>Lái xe</h3>

            <Form>
                <Row>
                    <Col className="pr-1" md="2">
                        <Form.Group>
                            <label>Mã số tài xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setId_driver(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="px-1" md="2">
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
                            <label>Mã số phụ xe</label>
                            <Form.Control
                                type="text"
                                onChange={(e) => { setID_AD(e.target.value) }}
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
                        <th>Mã số tài xế</th>
                        <th>Biển số xe</th>
                        <th>Mã số phụ xe</th>
                    </tr>
                </thead>
                <tbody>
                    {isError === false && loading === false && dataDrive && dataDrive.length > 0 &&
                        dataDrive.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item['ID_DRIVER']}</td>
                                    <td>{item['LICENSE PLATE']}</td>
                                    <td>{item.ID_AD}</td>
                                    <td className="last_td">
                                        <ModalEditWorksOn
                                            id_driver={item['ID_DRIVER']}
                                            license_plate={item['LICENSE PLATE']}
                                            ID_AD={item.ID_AD}
                                            onHandleEdit={handleEdit}
                                        />
                                        <Button
                                            variant="danger"
                                            className="margin-left"
                                            size="sm"
                                            onClick={() => {
                                                handleDelete(item['ID_DRIVER'], item['LICENSE PLATE'])
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

export default WorksOn;