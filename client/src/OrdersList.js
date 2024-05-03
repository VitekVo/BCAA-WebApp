import React, { useState, useEffect } from 'react';

function OrdersList() {
    const [orders, setOrders] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="grid-subitem">
          {orders.filter(order => order.userID === "Table 2" && order.status !== "paid").map(order => (
            <div key={order.id}>
                <h2>Order status: {order.status}</h2>
                <ul>
                {order.orderedItems.map(item => (
                    <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price},- Kč
                    </li>
                ))}
                </ul>
                <select value={order.status} onChange={(e) => handleChangeStatus(order.id, e.target.value)}>
                    <option value="placed">Placed</option>
                    <option value="being processed">Being processed</option>
                    <option value="completed">Completed</option>
                    <option value="paid">Paid</option>
                </select>
                <button onClick={() => updateOrderStatus(order)} disabled={isLoading}>
                    Confirm Update
                </button>
            </div>
          ))}
        </div>
      );
}

export default OrdersList;
