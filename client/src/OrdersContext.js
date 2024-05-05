import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

const OrdersContext = createContext();

export const OrderProvider = ({ children }) => {
    const { loggedInUser } = useContext(UserContext);
    const [order, setOrder] = useState([]);
    const [orders, setOrders] = useState([]);     

    const addItemToOrder = (item) => {
        setOrder(currentOrder => {
            const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
            if (existingItem) {
                return currentOrder.map(orderItem =>
                    orderItem.id === item.id
                        ? { ...orderItem, quantity: orderItem.quantity + 1 }
                        : orderItem
                );
            } else {
                return (
                    [...currentOrder, { ...item, quantity: 1 }]
                );
            }
        });
    };

    const removeItemFromOrder = (itemId) => {
        setOrder(currentOrder => currentOrder.map(item => {
            if (item.id === itemId) {
                if (item.quantity > 1) {
                    return {...item, quantity: item.quantity - 1}; // Decrease quantity
                }
                return null; // or handle the item with quantity zero in another way
            }
            return item;
        }).filter(item => item !== null)); // Remove any null items
    };

    const resetOrder = () => {
        setOrder([]);
    };

    const fetchOrders = () => {
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
    };

    const addOrder = () => {
        const url = "http://localhost:5000/order/create";
        const orderData = {
          userID: loggedInUser.id,
          orderedItems: order
        }
        console.log(orderData);
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
          })
          .then(response => response.json())
          .then(data => {
            resetOrder();
            console.log('Success:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        };

        return (
            <OrdersContext.Provider className="content" value={{ orders, addOrder }}>
                {children}
            </OrdersContext.Provider>
        );

}

export const useOrders = () => useContext(OrdersContext);
