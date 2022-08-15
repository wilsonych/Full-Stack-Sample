import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Search({ headers, setTarget, setKeyword }) {
    return (
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Col sm="2">
                <Form.Select aria-label="Default select example" name="department" onChange={(e) => setTarget(e.target.value)}>
                    <option value={""}>Please select</option>
                    {headers.map((header) => (
                        <option key={header} value={header}>
                            {header}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <Col sm="10">
                <Form.Control type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="Search"/>
            </Col>
        </Form.Group>
    );
}
