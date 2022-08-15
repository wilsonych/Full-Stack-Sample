import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

export default function RegForm(props) {
    const { handleInputChange, handleSubmit } = props; //onSubmit={handleSubmit}
    return (
        <Form className="m-3">
            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Empliyee id
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Your Empliyee id" required name="id" onChange={handleInputChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Your name" required name="name" onChange={handleInputChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                <Form.Label column sm="2">
                    Email address
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="email" placeholder="Enter email" required name="email" onChange={handleInputChange} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Department
                </Form.Label>
                <Col sm="10">
                    <Form.Select aria-label="Default select example" required name="department" onChange={handleInputChange}>
                        <option value="">Please select</option>
                        <option value="finance">Finance</option>
                        <option value="sales">Sales</option>
                        <option value="marketing">Marketing</option>
                        <option value="purchase">Purchase</option>
                        <option value="hr">Human Resource</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Employment status
                </Form.Label>
                <Col sm="10">
                    <Form.Select aria-label="Default select example" required name="employment" onChange={handleInputChange}>
                        <option value="">Please select</option>
                        <option value="worker">worker</option>
                        <option value="employee">employee</option>
                        <option value="self">self-employed</option>
                    </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Supporting document
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="file" name="document" onChange={handleInputChange} />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            {props.msg.length > 0 &&
                props.msg.map((e) => (
                    <Alert key={e.msg} variant={e.type=='error'?'danger':'primary'}>
                        {e.msg}
                    </Alert>
                ))}
        </Form>
    );
}
