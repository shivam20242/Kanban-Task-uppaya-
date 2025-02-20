import React, { useState } from 'react'
import { Link2, RotateCcw, Filter, ChevronDown, Share2, Menu } from 'lucide-react'
import '../styling/mainpage.css'
import profile from '../assets/MaskGroup.png'
import TaskCard from './TaskCard'
import CardModal from './CardModal'
import { Plus } from 'lucide-react'
import pic1 from '../assets/Ellipse12.png'
import pic2 from '../assets/Ellipse13.png'
import pic3 from '../assets/Ellipse14.png'
import pic4 from '../assets/Ellipse15.png'
import pic5 from '../assets/Ellipse20.png'

const Mainpage = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: "To Do",
      items: [
        {
          id: "1",
          title: "Brainstorming",
          description: "Brainstorming brings team members' diverse experience into play.",
          comments: 2,
          files: 3
        },
        {
          id: "2",
          title: "Research",
          description: "User research helps you understand user behaviors, needs, and motivations.",
          comments: 1,
          files: 2
        },
        {
          id: "3",
          title: "Wireframes",
          description: "Low fidelity wireframes include the most basic content and visuals.",
          comments: 4,
          files: 1
        }
      ]
    },
    progress: {
      title: "On Progress",
      items: [
        {
          id: "3",
          title: "Wireframes",
          description: "Low fidelity wireframes include the most basic content and visuals.",
          comments: 4,
          files: 1
        },
        {
          id: "4",
          title: "Design System",
          description: "Create a consistent design system for the entire application.",
          comments: 2,
          files: 3
        },
        {
          id: "5",
          title: "User Flow",
          description: "User flow is the path taken by a typical user on an app or website.",
          comments: 3,
          files: 2
        }
      ]
    },
    done: {
      title: "Done",
      items: [
        {
          id: "5",
          title: "User Flow",
          description: "User flow is the path taken by a typical user on an app or website.",
          comments: 3,
          files: 2
        },
        {
          id: "6",
          title: "Prototype",
          description: "Create a high-fidelity prototype for user testing and feedback.",
          comments: 5,
          files: 4
        },
        {
          id: "7",
          title: "User Flow",
          description: "User flow is the path taken by a typical user on an app or website.",
          comments: 3,
          files: 2
        }
      ]
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);

  const handleAddCard = (columnId) => {
    setCurrentColumn(columnId);
    setShowModal(true);
  };

  const handleCreateCard = (title, description) => {
    const newCard = {
      id: Date.now().toString(),
      title,
      description,
      comments: 0,
      files: 0
    };

    setColumns(prev => ({
      ...prev,
      [currentColumn]: {
        ...prev[currentColumn],
        items: [...prev[currentColumn].items, newCard]
      }
    }));
    setShowModal(false);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const sourceColumn = Object.keys(columns).find(key => 
      columns[key].items.find(item => item.id === cardData.id)
    );

    if (sourceColumn === columnId) return;

    const card = columns[sourceColumn].items.find(item => item.id === cardData.id);
    
    setColumns(prev => ({
      ...prev,
      [sourceColumn]: {
        ...prev[sourceColumn],
        items: prev[sourceColumn].items.filter(item => item.id !== cardData.id)
      },
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, card]
      }
    }));
  };

  return (
    <div className='mainpage-container'>
      <div className='header-section'>
        <div className='mobile'>
          <div className='mobile-left'>
            <h2 className='mobiles'>Mobile App</h2>
            <div className='iconss'>
              <Link2 size={16} color="#5030E5"/>
              <RotateCcw size={16} color="#5030E5"/>
            </div>
          </div>
          <div className='invite-section'>
            <button className='invite-btn'>
              <span className='plus'>+</span>
              <span>Invite</span>
            </button>
            <div className='members'>
              <img src={pic1} alt="member" className='member-img'/>
              <img src={pic2} alt="member" className='member-img'/>
              <img src={pic3} alt="member" className='member-img'/>
              <img src={pic4} alt="member" className='member-img'/>
              <div className='more-members'>+2</div>
            </div>
          </div>
        </div>
        <div className='share-menu-section'>
          <button className='share-btn'>
            <Share2 size={16} color="#787486"/>
          </button>
          <div className='divider'></div>
          <button className='menu-btn'>
            <Menu size={16} color="#787486"/>
          </button>
        </div>
      </div>
      <div className='filter-section'>
        <button className='filter-btn'>
          <Filter size={16} />
          <span>Filter</span>
          <ChevronDown size={16} />
        </button>
        <button className='today-btn'>
          <span>Today</span>
          <ChevronDown size={16} />
        </button>
      </div>
      <div className='columns-container'>
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className='column'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <div className='column-header'>
              <h2>{column.title}</h2>
              <span className="count">{column.items.length}</span>
              <button onClick={() => handleAddCard(columnId)}><Plus /></button>
            </div>
            <div className='cards-container'>
              {column.items.map((card, index) => (
                <TaskCard
                  key={card.id}
                  {...card}
                  index={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <CardModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateCard}
        />
      )}
    </div>
  )
}

export default Mainpage