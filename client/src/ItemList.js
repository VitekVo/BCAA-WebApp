import React, { useState, useEffect } from 'react';

function ItemList() {
    const [items, setUsers] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:5000/item/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer yourTokenHere'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data);
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
        <div>
            <h1>Mains</h1>
            <ul>
                {items.filter(item => item.type === "main").map(item => (
                    <p key={item.id}>{item.name} {item.price},- Kč</p>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
