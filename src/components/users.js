import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/apiService';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          try {
            const usersData = await fetchUsers();
            setUsers(usersData);
          } catch (error) {
            console.error("Failed to fetch users", error);
          }
        };
        getUsers();
      }, []);

      return (
        <div>
          <h1>Users List</h1>
          <ul>
            {users.map(user => (
              <li key={user.user_id}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </li>
            ))}
          </ul>
        </div>
    );
};

export default UsersPage;
