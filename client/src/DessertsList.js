import React, { useState, useEffect } from 'react';

function DessertsList({addItemToOrder, removeItemFromOrder}) {
    const [items, setItems] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:5000/item/list', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setItems(data);
            setIsLoading(false); 
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid-subitem">
            <h1>Desserts</h1>
            <ul>
                {items.filter(item => item.type === "dessert").map(item => (
                   <div key={item.id} className="item-container">
                   <p>{item.name} {item.price},- Kč</p>
                   <button className="btn btn-success" onClick={() => addItemToOrder(item)}>Add</button>
                   <button className="btn btn-danger" onClick={() => removeItemFromOrder(item.id)}>Remove</button>
               </div>
                ))}
            </ul>
        </div>
    );
}

export default DessertsList;
