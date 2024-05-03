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

    const resetOrder = () => {
        setOrder([]); // Reset the order state to an empty array
    };



    return (
        <div className="grid-item">
            <MainsList addItemToOrder={addItemToOrder} />
            <SidesList addItemToOrder={addItemToOrder} />
            <OrderSummary order={order} onReset = {resetOrder}/>
            <DessertsList addItemToOrder={addItemToOrder} />
            <BeveragesList addItemToOrder={addItemToOrder} />
            <OrdersList/>
        </div>
    );
}
