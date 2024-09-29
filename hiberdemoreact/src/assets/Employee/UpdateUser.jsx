import { Button } from 'bootstrap';
import { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import './UpdateUser.css';

const UpdateUser = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [formData ,setformData] = useState({
    name :"",
    email : "",
    department : ""
    })


    const handleInputChange = (event) =>{
    const{name , value} = event.target;

        setformData({
            ...formData,
            [name]:value,
    })

    }

  useEffect(() =>{
    const fetchEmployees = async () =>{
      try{
          const response = await fetch(`http://localhost:8080/api/employee/${id}`);
          const data = await response.json();
          setformData(data);
      }catch(error){
          console.error("Error Fetching user :" ,error.message);
      }
    }
    fetchEmployees();
  },[id])

const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
          const response = await fetch(`http://localhost:8080/api/employee/${id}` , {
            method: 'PATCH',
            headers:{
              "Content-Type" : "application/json",
            },
            body: JSON.stringify(formData)
         });
            const data = await response.json();
            console.log("User update :" ,data);

            navigate(`/`)
        }catch (error){
            console.error("Error Updating User :", error.message);
        }
}


  return (
    <>
    <div className='center-form'>
    <h1>Edit Employee</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formBasicName'>
                <Form.Control
                type ="text"
                name = "name"
                placeholder = "Enter name"
                value = {formData.name}
                onChange= {handleInputChange}
                />
        </Form.Group>

        <Form.Group controlId='formBasicName'>
                <Form.Control
                type ="email"
                name = "email"
                placeholder = "Enter email"
                value = {formData.email}
                onChange= {handleInputChange}
                />
        </Form.Group>

        <Form.Group controlId='formBasicName'>
                <Form.Control
                type ="text"
                name = "department"
                placeholder = "Enter department"
                value = {formData.department}
                onChange= {handleInputChange}
                />
        </Form.Group>

        <Button variant="Primary" type ="submit" className='w-100'>Edit Employee</Button>
    </Form>
    </div>
</>
  );
}

export default UpdateUser ;
