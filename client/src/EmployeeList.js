import React, { useState, useEffect } from 'react';

function EmployeeList() {
    const [users, setUsers] = useState([]); 

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetch('http://localhost:5000/user/list', {
            method: 'GET'
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
        <div className="item-subitem">
            <div>
                <h1>Our Employees</h1>
                <ul>
                    {users.filter(user => user.role === "employee").map(user => (
                    <div key={user.id}>
                        <p>{user.name} - {user.job}</p>
                    </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EmployeeList;
