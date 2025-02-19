import React from "react";
import PropTypes from "prop-types";
import '../styling/taskCard.css'
import profile from '../assets/MaskGroup.png'
import {Plus, MessageSquare, File} from 'lucide-react'

const TaskCard = ({ title, description, id, index, comments = 0, files = 0 }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ id, index }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="task-card w-[400px] h-full my-3 rounded-lg"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      data-task-id={id}
    >
      <div className="flex items-center">
        <span className="icon border-none mx-6 border-slate-900 w-2 h-2 bg-blue-600 rounded-full"></span>
        <h2 className="w-20 py-2 tit">{title}</h2>
      </div>
      <span className="line"></span>    
      <div className="p-4 bg-white rounded-md w-[370px] mx-auto my-5">
        <p className="text-s text-gray-500 mb-3">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex -space-x-2">
            <img src={profile} alt="" className="w-6 h-6 rounded-full border-2 border-white"/>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MessageSquare size={12} />
              {comments} comments
            </span>
            <span className="flex items-center gap-1">
              <File size={12} />
              {files} files
            </span>
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
