import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

function OrdersList() {
    const [orders, setOrders] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { loggedInUser } = useContext(UserContext);
    const [tempStatus, setTempStatus] = useState({});

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

    const handleTempStatusChange = (orderId, newStatus) => {
        setTempStatus(prevTempStatus => ({
            ...prevTempStatus,
            [orderId]: newStatus,
        }));
    };

    const updateOrderStatus = (orderId) => {
        setIsLoading(true);
        setError('');

        const newStatus = tempStatus[orderId];
        const orderToUpdate = orders.find(order => order.id === orderId);

        if (!newStatus || !orderToUpdate) {
            setIsLoading(false);
            return;
        }

        const updatedOrder = { ...orderToUpdate, status: newStatus };

        fetch(`http://localhost:5000/order/update/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedOrder)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update order');
            }
            return response.json();
        })
        .then(data => {
            console.log('Order updated:', data);
            setOrders(prevOrders =>
                prevOrders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order))
            );
            setIsLoading(false);
            setTempStatus(prevTempStatus => {
                const { [orderId]: _, ...rest } = prevTempStatus;
                return rest;
            });
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
                <h2>Orders:</h2>
                {orders.filter(order => order.status !== "paid").map(order => (
                    <div key={order.id}>
                        <div>{order.userID} - Status: {order.status}</div>
                        <ul>
                            {order.orderedItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - {item.quantity} x {item.price},- Kč
                                </li>
                            ))}
                        </ul>
                        <select
                            className="btn btn-light dropdown-toggle"
                            value={tempStatus[order.id] || order.status}
                            onChange={(e) => handleTempStatusChange(order.id, e.target.value)}
                        >
                            <option value="placed">Placed</option>
                            <option value="accepted">Accepted</option>
                            <option value="completed">Completed</option>
                            <option value="paid">Paid</option>
                        </select>
                        <button
                            className="btn btn-light"
                            onClick={() => updateOrderStatus(order.id)}
                            disabled={isLoading}
                        >
                            Confirm Update
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    if (loggedInUser?.role === "customer") {
        return (
            <div className="grid-subitem">
                <h2>Your Orders:</h2>
                {orders.filter(order => order.userID === loggedInUser?.name && order.status !== "paid").map(order => (
                    <div key={order.id}>
                        <div>Status: {order.status}</div>
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

    return (
        <div className="grid-subitem">
            <h2>Your Orders:</h2>
        </div>
    );
}

export default OrdersList;
