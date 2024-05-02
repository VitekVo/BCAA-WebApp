function OrderSummary({ order }) {
    return (
        <div className="grid-subitem">
            <h2>Your Order</h2>
            <ul>
                {order.map((item, index) => (
                    <li key={index}>{item.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
        </div>
    );
}

export default OrderSummary
