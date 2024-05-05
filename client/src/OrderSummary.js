import React, { useState, useContext } from "react";
import { useOrders } from './OrdersContext';
import OrderMessage from "./OrderMessage";
import { UserContext } from './UserContext';

function OrderSummary( {order, onReset} ) {
  const { loggedInUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const closeModal = () => {
      setShowModal(false);
  };

  const { addOrder } = useOrders();
  const handleAddOrder = () => {
    const newOrder = {
      userID: loggedInUser.id,
      orderedItems: order
    };
    addOrder(newOrder);
};
      

  return (
    <div className="grid-subitem">
      <h2>Your Order</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>{item.name} - {item.quantity} x {item.price},- Kč</li>
        ))}
      </ul>
      {loggedInUser && loggedInUser?.role === "customer" && (
        <button onClick={handleAddOrder}>Place order</button>
      )}
      <button onClick={onReset}>Reset order</button>
      <OrderMessage show={showModal} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default OrderSummary
