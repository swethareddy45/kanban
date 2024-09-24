// src/App.js
import React, { useEffect, useState } from 'react';
import KanbanBoard from './components/KanbanBoard';
import SortAndGroupControls from './components/SortAndGroupControls';
import './App.css';
import './kanban.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); 
  const [grouping, setGrouping] = useState('priority'); 
  const [sorting, setSorting] = useState('title'); 

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment') 
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setTickets(data.tickets || []); 
        setUsers(data.users || []); 
      })
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  return (
    <div className="container">
      <div className="kanban-heading">
      </div>
      <SortAndGroupControls setGrouping={setGrouping} setSorting={setSorting} />
      <div className="kanban-board">
        <KanbanBoard tickets={tickets} users={users} grouping={grouping} sorting={sorting} />
      </div>
    </div>
  );
};

export default App;
