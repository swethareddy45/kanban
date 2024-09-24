// src/components/User.js
import React from 'react';

const User = ({ user }) => {
  return (
    <div className="user">
      <h3>{user.name}</h3>
      <p>User ID: {user.id}</p>
      <p>Available: {user.available ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default User;
