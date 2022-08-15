import axios from "axios";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import EmployeeRow from "../component/employeeRow";
import Search from "../component/search";

const headers = ["id", "name", "email", "department", "employment", "document"];
const defaultState = { id: "", password: "" };
export default function HR() {
    const [employees, setEmployees] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [err, setErr] = useState("");
    const [user, setUser] = useState(defaultState);
    const [keyword, setKeyword] = useState("");
    const [searchTarget, setTarget] = useState("");
    const fetch = (token) => {
        axios
            .get("/api/hr", {
                headers: {
                    Authorization: token,
                },
            })
            .then((result) => {
                setEmployees(result.data);
            })
            .catch((err) => {
                //localStorage.removeItem("token");
                console.log(err);
                setIsLogin(false);
            });
    };

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const login = () => {
        axios
            .post("/api/hr", user)
            .then((res) => {
                localStorage.setItem("token", res.data);
                fetch(res.data);
                setIsLogin(true);
            })
            .catch((err) => {
                localStorage.removeItem("token");
                setErr(err.response.data);
                console.log(err);
            });
    };

    useEffect(() => {
        setErr("");
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
            fetch(token);
        }
    }, []);

    const filterCallBack = (employee) => {        
        if (searchTarget=="") return JSON.stringify(employee).includes(keyword);
        return employee[searchTarget].includes(keyword);
    };

    if (!isLogin) {
        return (
            <Card className="w-50 mx-auto mt-3">
                <Card.Header>Login (secure router)</Card.Header>
                <Form className="m-3">
                    <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                        <Form.Label column sm="2">
                            User name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Your User name" required name="id" onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                        <Form.Label column sm="2">
                            Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Your name" required name="password" onChange={handleInputChange} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" onClick={login}>
                        Submit
                    </Button>

                    {err && <Alert variant="danger">{err}</Alert>}
                </Form>
            </Card>
        );
    }
    return (
        <Card className="w-75 mx-auto mt-3">
            <Card.Header className="mb-3">Employees details (secure router)</Card.Header>
            <Search headers={headers} setTarget={setTarget} setKeyword={setKeyword} />
            <Table bordered hover>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {employees.filter(filterCallBack).map((employee) => (
                        <EmployeeRow employee={employee} key={employee.id} headers={headers} searchTarget={searchTarget}/>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
}
