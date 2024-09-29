import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {


    const[employees , setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect( () =>{

        const fetchEmployees = async () => {
            try{
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await  response.json();

                setEmployees(data);
            }catch(error){
                console.error("Error Fetching employees :", error.message);
            }
        };
            fetchEmployees();
    },[]);

const handleDelete = async (employeeId) =>{
    try{
        const response = await fetch(`http://localhost:8080/api/employee/${employeeId}` , {
            method: "DELETE",
        });

        if(response.ok){
            setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee.id !== employeeId ));
        }

        console.log(`Employee with ID ${employeeId} deleted successfully`);
    }catch (error){
        console.error("Error deleting employee :" , error.message);
    }
}

const handleUpdate = (employeeId) =>{
    navigate(`/employee/${employeeId}`);
}

    return (
    <>
    <Container className = "mt-5">
        <Row>
            <Col>
            <h1 className="text-center">Employees</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employees) => (
                        <tr key={employees.id}>
                            <td>{employees.name}</td>
                            <td>{employees.email}</td>
                            <td>{employees.department}</td>
                            <td>
                                <Button variant="outline-secondary" onClick={() =>handleUpdate(employees.id)}>Update</Button>
                                {/* <Button variant="outline-secondary">Update</Button> */}
                                <Button variant="outline-danger" onClick={() => handleDelete(employees.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            </Col>
        </Row>
    </Container>
    </>
    );
}

export default Dashboard;
