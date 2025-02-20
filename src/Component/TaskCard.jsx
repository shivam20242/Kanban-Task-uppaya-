import React from "react";
import PropTypes from "prop-types";
import '../styling/taskCard.css'
import { MessageSquare, File } from 'lucide-react'
import pic1 from '../assets/Ellipse12.png'

const TaskCard = ({ title, description, id, index, comments = 0, files = 0 }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id, index }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      data-task-id={id}
    >
      <div className="priority-tag">Low</div>
      
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>
      
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
  comments: PropTypes.number,
  files: PropTypes.number
};

export default TaskCard;
