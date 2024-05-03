function OrderMessage({ show, message, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', top: '20%', left: '30%', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default OrderMessage
