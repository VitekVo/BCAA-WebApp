import React, { useState, useEffect } from 'react';

function ItemList() {
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
        <div className="item-subitem">
            <div>
                <h2>All items</h2>
                <ul>
                    {items.map(item => (
                    <div key={item.id}>
                        <p>{item.name} - allergens: {item.allergens} - country of origin: {item.country} </p>
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ItemList;
