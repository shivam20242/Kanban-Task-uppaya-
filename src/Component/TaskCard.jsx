import React from "react";
import PropTypes from "prop-types";
import '../styling/taskCard.css'
import { MessageSquare, File, Calendar } from 'lucide-react'
import pic1 from '../assets/Ellipse12.png'

const TaskCard = ({ 
  title, 
  description, 
  id, 
  index, 
  priority = 'Low', 
  comments = 0, 
  files = 0,
  createdAt,
  dueDate,
  onEdit,
  onDelete,
  status
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id, index }));
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Define priority tag styles based on priority level
  const getPriorityTagStyle = (priority) => {
    switch (priority) {
      case 'High':
        return {
          backgroundColor: '#FF616133',
          color: '#FF6161'
        };
      case 'Medium':
        return {
          backgroundColor: '#FFA50033',
          color: '#FFA500'
        };
      case 'Low':
        return {
          backgroundColor: '#DFA87433',
          color: '#D58D49'
        };
      default:
        return {
          backgroundColor: '#DFA87433',
          color: '#D58D49'
        };
    }
  };

  const priorityStyle = getPriorityTagStyle(priority);

  return (
    <div 
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      data-task-id={id}
    >
      <div className="task-actions">
        <button 
          className="edit-btn"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button 
          className="delete-btn"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(id);
            }
          }}
        >
          Delete
        </button>
      </div>
      
      <div 
        className="priority-tag"
        style={priorityStyle}
      >
        {priority}
      </div>
      
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>

      <div className="date-info display-flex justify-between w-full gap-3">
        <div className="created-date text-xs">
          <span className="text-[#787486] text-xs ">Created: {formatDate(createdAt)}</span>
        </div>
        <div className="due-date">
          <span className="text-[#787486]">Due: {formatDate(dueDate)}</span>
        </div>
      </div>

      <div className="task-footer">
        <div className="avatar-group">
        <img src={pic1} alt="User avatar" className="avatar" />
        </div>
        
        <div className="task-stats">
          <div className="stat-item">
            <MessageSquare size={16} />
            <span>{comments} comments</span>
          </div>
          <div className="stat-item">
            <File size={16} />
            <span>{files} files</span>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  priority: PropTypes.oneOf(['Low', 'Medium', 'High']),
  comments: PropTypes.number,
  files: PropTypes.number,
  createdAt: PropTypes.string,
  dueDate: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskCard;