import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function OrdersList() {
    const [orders, setOrders] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/order/list', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setOrders(data);
            setIsLoading(false); 
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleChangeStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const updateOrderStatus = (order) => {
        setIsLoading(true);
        setError('');
        fetch(`http://localhost:5000/order/update/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(order)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to update order');
          }
          return response.json();
        })
        .then(data => {
          console.log('Order updated:', data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setError(error.message);
          setIsLoading(false);
        });
      };

    if (loggedInUser?.role === "employee") {
      return (
        <div className="grid-subitem">
          <h2>Order status:</h2>
          {orders.filter(order => order.status !== "paid").map(order => (
            <div key={order.id}>
                {order.status}
                <ul>
                {order.orderedItems.map(item => (
                    <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price},- Kč
                    </li>
                ))}
                </ul>
                <select class="btn btn-light dropdown-toggle" value={order.status} onChange={(e) => handleChangeStatus(order.id, e.target.value)}>
                    <option value="placed">Placed</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                    <option value="paid">Paid</option>
                </select>
                <button class="btn btn-light" onClick={() => updateOrderStatus(order)} disabled={isLoading}>
                    Confirm Update
                </button>
            </div>
          ))}
        </div>
      );
    }
    else if (loggedInUser?.role === "customer") {
      return (
        <div className="grid-subitem">
          <h2>Order status:</h2>
          {orders.filter(order => order.userID === loggedInUser?.id && order.status !== "paid").map(order => (
            <div key={order.id}>
                {order.status}
                <ul>
                {order.orderedItems.map(item => (
                    <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price},- Kč
                    </li>
                ))}
                </ul>
                
            </div>
          ))}
        </div>
      );
      
    }
    else {
      return (
        <div className="grid-subitem">
          <h2>Order status:</h2>
        </div>
      );
    }
}

export default OrdersList;
