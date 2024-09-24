// src/components/Ticket.js
import React from 'react';

const Ticket = ({ ticket }) => {
  return (
    <div className="ticket">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>User ID: {ticket.userId}</p>
    </div>
  );
};

export default Ticket;
