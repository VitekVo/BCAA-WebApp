import { useState, useContext } from "react";
import OrderMessage from "./OrderMessage";
import { UserContext } from './UserContext';

function OrderSummary( {order, onReset} ) {

    const { loggedInUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const closeModal = () => {
        setShowModal(false);
    };

  const handleButtonClick = () => {
      const url = "http://localhost:5000/order/create";
      const orderData = {
        userID: loggedInUser.id,
        orderedItems: order
      }
      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
          setModalMessage('Your order has been placed');
          setShowModal(true);
          onReset();
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
          setModalMessage('There has been an error sending your order');
          setShowModal(true);
        });
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
        <button class="btn btn-light" onClick={handleButtonClick}>Place order</button>
      )}
      <button class="btn btn-light" onClick={onReset}>Reset order</button>
      <OrderMessage show={showModal} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default OrderSummary
