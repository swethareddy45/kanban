// src/components/SortAndGroupControls.js
import React from 'react';

const SortAndGroupControls = ({ setGrouping, setSorting }) => {
  return (
    <div className="controls">
      <div>
        <label>Group By:</label>
        <select onChange={(e) => setGrouping(e.target.value)}>
        <option value="priority">Priority</option>
          <option value="status">Status</option>
          <option value="user">User</option>
        </select>
      </div>
      <div>
        <label>Sort By:</label>
        <select onChange={(e) => setSorting(e.target.value)}>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default SortAndGroupControls;
