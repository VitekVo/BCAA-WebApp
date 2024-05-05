import React, { useState } from 'react';
import MainsList from './MainsList';
import SidesList from './SidesList';
import DessertsList from './DessertsList';
import BeveragesList from './BeveragesList';
import OrderSummary from './OrderSummary';
import OrdersList from './OrdersList';

export function Content() {
    const [order, setOrder] = useState([]);

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



    return (
        <div className="content">
            <MainsList addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} />
            <SidesList addItemToOrder={addItemToOrder}  removeItemFromOrder={removeItemFromOrder} />
            <OrderSummary order={order} onReset = {resetOrder} />
            <DessertsList addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} />
            <BeveragesList addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} />
            <OrdersList/>
        </div>
    );
}
