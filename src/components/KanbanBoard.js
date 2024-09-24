import React from 'react';
import Ticket from './Ticket';
import User from './User';

import todoIcon from './assets/To-do.svg';
import urgentGreyIcon from './assets/SVG - Urgent Priority grey.svg';
import urgentColourIcon from './assets/SVG - Urgent Priority colour.svg';
import noPriorityIcon from './assets/No-priority.svg';
import inProgressIcon from './assets/in-progress.svg';
import mediumPriorityIcon from './assets/Img - Medium Priority.svg';
import lowPriorityIcon from './assets/Img - Low Priority.svg';
import highPriorityIcon from './assets/Img - High Priority.svg';
import downIcon from './assets/down.svg';
import doneIcon from './assets/Done.svg';
import displayIcon from './assets/Display.svg';
import cancelledIcon from './assets/Cancelled.svg';
import backlogIcon from './assets/Backlog.svg';
import addIcon from './assets/add.svg';
import threeDotMenuIcon from './assets/3 dot menu.svg';

const KanbanBoard = ({ tickets, users, grouping, sorting }) => {
  const groupTickets = (tickets, users, grouping) => {
    const grouped = {
      ByStatus: {
        Todo: [],
        'In progress': [],
        Done: [],
        Cancelled: [],
        Backlog: [],
      },
      ByUser: {},
      ByPriority: {},
    };

    tickets.forEach(ticket => {
      // Group by Status
      if (grouping === 'status') {
        console.log("hi");
        const statusKey = ticket.status;
        if (grouped.ByStatus[statusKey]) {
          console.log("hi");
          grouped.ByStatus[statusKey].push(ticket);
        }
      }

      // Group by User
      if (grouping === 'user') {
        const userId = ticket.userId; 
        const user = users.find(user => user.id === userId); 
        if (user) {
          const userName = user.name;
          if (!grouped.ByUser[userName]) {
            grouped.ByUser[userName] = { user: userName, tickets: [] }; 
          }
          grouped.ByUser[userName].tickets.push(ticket); 
        }
      }

      // Group by Priority
      if (grouping === 'priority') {
        const priorityKey = ticket.priority; 
        if (!grouped.ByPriority[priorityKey]) {
          grouped.ByPriority[priorityKey] = [];
        }
        grouped.ByPriority[priorityKey].push(ticket);
      }
    });

    return grouped;
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (sorting === 'priority') {
        return b.priority - a.priority; 
      } else if (sorting === 'title') {
        return a.title.localeCompare(b.title); 
      }
      return 0;
    });
  };

  const getIcon = (ticket) => {
    switch (ticket.status) {
      case 'Todo':
        return todoIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Done':
        return doneIcon;
      case 'Cancelled':
        return cancelledIcon;
      case 'Backlog':
        return backlogIcon;
      default:
        return null;
    }
  };
  
  const getPriorityIcon = (ticket) => {
    switch (ticket.priority) {
      case 4:
        return urgentColourIcon; 
      case 3: // High
        return highPriorityIcon;
      case 2: // Medium
        return mediumPriorityIcon;
      case 1: // Low
        return lowPriorityIcon;
      case 0: // No Priority
        return noPriorityIcon;
      default:
        return null;
    }
  };

  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No Priority',
  };

  const groupedTickets = groupTickets(tickets, users, grouping);

  const groups = grouping === 'status' ? groupedTickets.ByStatus :
                grouping === 'user' ? groupedTickets.ByUser :
                groupedTickets.ByPriority;

  return (
    <div className="kanban-columns">
      {Object.keys(groups).map((key) => (
        <div key={key} className="kanban-column">
          <div className="kanban-header">
            <h3 style={{ display: 'flex', alignItems: 'center' }}>
              {grouping === 'user' ? groups[key].user : 
                <>
                  {grouping === 'priority' && 
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {getPriorityIcon({ priority: key })} {}
                      <span style={{ marginLeft: '4px' }}>{priorityLabels[key] || key}</span>
                    </span>
                  }
                </>}
              <img src={addIcon} alt="Add" className="add-icon" style={{ marginLeft: 'auto' }} />
              <img src={threeDotMenuIcon} alt="Menu" className="menu-icon" style={{ marginLeft: '8px' }} />
            </h3>
          </div>
          {sortTickets(groups[key].tickets || groups[key]).map(ticket => (
            <div key={ticket.id} className="ticket-container" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={getIcon(ticket)} alt={ticket.status} className="ticket-icon" style={{ marginRight: '8px' }} />
              <Ticket ticket={ticket} />
              <img src={getPriorityIcon(ticket)} alt={ticket.priority} className="priority-icon" style={{ marginLeft: 'auto' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;