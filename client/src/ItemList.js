import React, { useState, useEffect, useContext } from 'react';
import Navbar from "react-bootstrap/Navbar";
import { Modal, Form, Button } from 'react-bootstrap';
import { UserContext } from './UserContext';

function ItemList() {
    const [items, setItems] = useState([]); 

    const { loggedInUser } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      type: '',
      name: '',
      price: '',
      allergens: '',
      country: ''
    });
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async () => {
        const url = "http://localhost:5000/item/create";
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

    const handleButtonClick = (itemID) => {
      const url = "http://localhost:5000/item/delete";
      const dataToSend = {
        id: itemID
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
        fetch('http://localhost:5000/item/list', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setItems(data);
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
                    <h1>What's on our menu</h1>
                </Navbar.Brand>
                <Navbar.Brand>
                <div>
                {loggedInUser && loggedInUser?.job === "owner" && (
                  <Button variant="success" onClick={handleShow}>
                      Add new item   
                  </Button>
                )}
        <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="">Select a type</option>
                <option value="main">Main</option>
                <option value="side">Side</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
              </Form.Select>
            </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter item name" name="name" value={formData.name} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter item price" name="price" value={formData.price} onChange={handleInputChange} required />
              </Form.Group>
              <Form.Group controlId="allergens">
                <Form.Label>Allergens</Form.Label>
                <Form.Control type="text" placeholder="Enter item allergens" name="allergens" value={formData.allergens} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country of origin</Form.Label>
                <Form.Control type="text" placeholder="Enter item country" name="country" value={formData.country} onChange={handleInputChange} required />
              </Form.Group>
              <Button variant="success" type="submit">
                Create Item
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
              <h3>Mains:</h3>
                <ul>
                    {items.filter(item => item.type === "main").map(item => (
                    <div key={item.id} className="item-container">
                        <p>{item.name} - allergens: {item.allergens} - country of origin: {item.country} </p>
                        {loggedInUser && loggedInUser?.job === "owner" && (
                        <button className="btn btn-danger" onClick={() => handleButtonClick(item.id)}>Delete</button>
                        )}
                  </div>
                    ))}
                </ul>
              <h3>Sides:</h3>
                <ul>
                    {items.filter(item => item.type === "side").map(item => (
                    <div key={item.id} className="item-container">
                        <p>{item.name} - allergens: {item.allergens} - country of origin: {item.country} </p>
                        {loggedInUser && loggedInUser?.job === "owner" && (
                        <button className="btn btn-danger" onClick={() => handleButtonClick(item.id)}>Delete</button>
                        )}
                    </div>
                    ))}
                </ul>
              <h3>Desserts:</h3>
                <ul>
                    {items.filter(item => item.type === "dessert").map(item => (
                    <div key={item.id} className="item-container">
                        <p>{item.name} - allergens: {item.allergens} - country of origin: {item.country} </p>
                        {loggedInUser && loggedInUser?.job === "owner" && (
                        <button className="btn btn-danger" onClick={() => handleButtonClick(item.id)}>Delete</button>
                        )}
                    </div>
                    ))}
                </ul>
              <h3>Beverages:</h3>
                <ul>
                    {items.filter(item => item.type === "beverage").map(item => (
                    <div key={item.id} className="item-container">
                        <p>{item.name} - allergens: {item.allergens} - country of origin: {item.country} </p>
                        {loggedInUser && loggedInUser?.job === "owner" && (
                        <button className="btn btn-danger" onClick={() => handleButtonClick(item.id)}>Delete</button>
                        )}
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ItemList;
