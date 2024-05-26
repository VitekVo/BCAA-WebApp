import React, { useState, useEffect, useContext } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Modal, Form, Button } from 'react-bootstrap';
import { UserContext } from './UserContext';

function EmployeeList() {
    const [users, setUsers] = useState([]); 

    const { loggedInUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        role: '',
        name: '',
        job: ''
    });
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async () => {
        const url = "http://localhost:5000/user/create";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch(error => {
        console.error('Error:', error);
        });
    };

    const handleButtonClick = (userID) => {
      const url = "http://localhost:5000/user/delete";
      const dataToSend = {
        id: userID
      }
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      };

    useEffect(() => {
        fetch('http://localhost:5000/user/list', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
            setIsLoading(false); 
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="item-subitem">
            <Navbar className="topbar">
                <Navbar.Brand>
                    <h1>Our staff</h1>
                </Navbar.Brand>
                <Navbar.Brand>
                <div>
                {loggedInUser && loggedInUser?.job === "owner" && (
                  <Button variant="success" onClick={handleShow}>
                      Add new account   
                  </Button>
                )}
      <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter user name" name="name" value={formData.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="job">
              <Form.Label>Job</Form.Label>
              <Form.Select name="job" value={formData.job} onChange={handleInputChange} required>
                <option value="">Select a job</option>
                <option value="cheff">Cheff</option>
                <option value="waiter">Waiter</option>
                <option value="customer">Customer</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleInputChange} required>
                <option value="">Select a role</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit">
              Create Account
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
            </Navbar.Brand>
            </Navbar>
            <div>
            <ul>
                    {users.filter(user => user.job === "owner").map(user => (
                    <div key={user.id}>
                        <p>{user.name} - {user.job} </p>
                    </div>
                    ))}
                </ul>
                <ul>
                    {users.filter(user => (user.job === "cheff" || user.job === "waiter")).sort((a, b) => a.role.localeCompare(b.type)).map(user => (
                    <div key={user.id} className="item-container">
                        <p>{user.name} - {user.job} </p>
                        {loggedInUser && loggedInUser?.job === "owner" && (
                        <button className="btn btn-danger" onClick={() => handleButtonClick(user.id)}>Delete</button>
                        )}
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EmployeeList;
