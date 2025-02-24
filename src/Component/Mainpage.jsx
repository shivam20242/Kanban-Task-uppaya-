import React, { useEffect, useState } from "react";
import {
  Link2,
  RotateCcw,
  Filter,
  ChevronDown,
  Share2,
  Menu,
} from "lucide-react";
import "../styling/mainpage.css";
import TaskCard from "./TaskCard";
import CardModal from "./CardModal";
import { Plus } from "lucide-react";
import pic1 from "../assets/Ellipse12.png";
import pic2 from "../assets/Ellipse13.png";
import pic3 from "../assets/Ellipse14.png";
import pic4 from "../assets/Ellipse15.png";
import pic5 from "../assets/Ellipse20.png";

const Mainpage = () => {
  const [columns, setColumns] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("today");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://upaay-backend.onrender.com/tasks"
        );
        const tasksData = await response.json();

        // Transform the data into the required column structure
        const transformedColumns = {
          todo: {
            title: "To Do",
            items: tasksData
              .filter((task) => task.status === "To Do")
              .map((task) => ({
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                createdAt: task.createdAt,
                dueDate: task.dueDate,
                comments: 0,
                files: 0,
              })),
          },
          inProgress: {
            title: "In Progress",
            items: tasksData
              .filter((task) => task.status === "In Progress")
              .map((task) => ({
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                createdAt: task.createdAt,
                dueDate: task.dueDate,
                comments: 0,
                files: 0,
              })),
          },
          completed: {
            title: "Completed",
            items: tasksData
              .filter((task) => task.status === "Completed")
              .map((task) => ({
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                createdAt: task.createdAt,
                dueDate: task.dueDate,
                comments: 0,
                files: 0,
              })),
          },
        };

        setColumns(transformedColumns);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  console.log(columns);
  const [showModal, setShowModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddCard = (columnId) => {
    setCurrentColumn(columnId);
    setShowModal(true);
  };

  const handleCreateCard = async (title, description, dueDate) => {
    try {
      const response = await fetch(
        "https://upaay-backend.onrender.com/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            dueDate,
            status:
              currentColumn === "todo"
                ? "To Do"
                : currentColumn === "inProgress"
                ? "In Progress"
                : "Completed",
            priority: "Medium", // Default priority
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();

      // Add the new card to the current column
      setColumns((prev) => ({
        ...prev,
        [currentColumn]: {
          ...prev[currentColumn],
          items: [
            ...prev[currentColumn].items,
            {
              id: data.task._id,
              title: data.task.title,
              description: data.task.description,
              priority: data.task.priority,
              createdAt: data.task.createdAt,
              dueDate: data.task.dueDate,
              comments: 0,
              files: 0,
            },
          ],
        },
      }));

      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
      // You might want to show an error message to the user here
    }
  };
  // **Delete Task**
  const handleDeleteCard = async (taskId, columnId) => {
    try {
      const response = await fetch(
        `https://upaay-backend.onrender.com/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setColumns((prev) => ({
        ...prev,
        [columnId]: {
          ...prev[columnId],
          items: prev[columnId].items.filter((item) => item.id !== taskId),
        },
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // **Edit Task**
  const handleEditCard = (taskId, columnId) => {
    const column = Object.entries(columns).find(([id, col]) =>
      col.items.find((item) => item.id === taskId)
    );

    if (!column) return;

    const [foundColumnId, foundColumn] = column;
    const task = foundColumn.items.find((item) => item.id === taskId);

    if (!task) return;

    setEditingTask({
      ...task,
      columnId: foundColumnId,
    });
    setCurrentColumn(foundColumnId);
    setShowModal(true);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const sourceColumn = Object.keys(columns).find((key) =>
      columns[key].items.find((item) => item.id === cardData.id)
    );

    if (sourceColumn === columnId) return;

    const card = columns[sourceColumn].items.find(
      (item) => item.id === cardData.id
    );

    setColumns((prev) => ({
      ...prev,
      [sourceColumn]: {
        ...prev[sourceColumn],
        items: prev[sourceColumn].items.filter(
          (item) => item.id !== cardData.id
        ),
      },
      [columnId]: {
        ...prev[columnId],
        items: [...prev[columnId].items, card],
      },
    }));
  };
  // Add this function to reuse for fetching data
  const fetchAndTransformTasks = async () => {
    try {
      const response = await fetch("https://upaay-backend.onrender.com/tasks");
      const tasksData = await response.json();
  
      return {
        todo: {
          title: "To Do",
          items: tasksData
            .filter((task) => task.status === "To Do")
            .map((task) => ({
              id: task._id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              createdAt: task.createdAt,
              dueDate: task.dueDate,
              comments: 0,
              files: 0,
            })),
        },
        inProgress: {
          title: "In Progress",
          items: tasksData
            .filter((task) => task.status === "In Progress")
            .map((task) => ({
              id: task._id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              createdAt: task.createdAt,
              dueDate: task.dueDate,
              comments: 0,
              files: 0,
            })),
        },
        completed: {
          title: "Completed",
          items: tasksData
            .filter((task) => task.status === "Completed")
            .map((task) => ({
              id: task._id,
              title: task.title,
              description: task.description,
              priority: task.priority,
              createdAt: task.createdAt,
              dueDate: task.dueDate,
              comments: 0,
              files: 0,
            })),
        },
      };
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return null;
    }
  };
  // Update the filter handlers
  const handleFilterChange = async (e) => {
    const filterValue = e.target.value;
    setSelectedFilter(filterValue);
  
    // Fetch fresh data
    const freshData = await fetchAndTransformTasks();
    if (!freshData) return;
  
    if (filterValue) {
      Object.keys(freshData).forEach((columnId) => {
        freshData[columnId].items = freshData[columnId].items.filter(
          (item) => item.priority.toLowerCase() === filterValue.toLowerCase()
        );
      });
    }
  
    setColumns(freshData);
  };
  
  const handleDateFilterChange = async (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
  
    // Fetch fresh data
    const freshData = await fetchAndTransformTasks();
    if (!freshData) return;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    Object.keys(freshData).forEach((columnId) => {
      switch (dateValue) {
        case "today":
          freshData[columnId].items = freshData[columnId].items.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate.toDateString() === today.toDateString();
          });
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          freshData[columnId].items = freshData[columnId].items.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate.toDateString() === yesterday.toDateString();
          });
          break;
        default:
          break;
      }
    });
  
    setColumns(freshData);
  };
 
  return (
    <div className="mainpage-container">
      <div className="header-section">
        <div className="mobile">
          <div className="mobile-left">
            <h2 className="mobiles">Mobile App</h2>
            <div className="iconss">
              <Link2 size={16} color="#5030E5" />
              <RotateCcw size={16} color="#5030E5" />
            </div>
          </div>
          <div className="invite-section">
            <button className="invite-btn">
              <span className="plus">+</span>
              <span>Invite</span>
            </button>
            <div className="members">
              <img src={pic1} alt="member" className="member-img" />
              <img src={pic2} alt="member" className="member-img" />
              <img src={pic3} alt="member" className="member-img" />
              <img src={pic4} alt="member" className="member-img" />
              <div className="more-members">+2</div>
            </div>
          </div>
        </div>
        <div className="share-menu-section">
          <button className="share-btn">
            <Share2 size={16} color="#787486" />
          </button>
          <div className="divider"></div>
          <button className="menu-btn">
            <Menu size={16} color="#787486" />
          </button>
        </div>
      </div>
      <div className="filter-section">
        <button className="filter-btn">
          <Filter size={16} /> {/* Lucide Filter Icon */}
          <select
            name="filter"
            className="border-none hover:border-none"
            id="filter"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option className="border-none" value="">All</option>
            <option className="border-none" value="low">Low</option>
            <option className="border-none" value="medium">Medium</option>
            <option className="border-none" value="high">High</option>
          </select>
        </button>
        <button className="today-btn">
          <select 
            name="dateFilter" 
            value={selectedDate}
            onChange={handleDateFilterChange}
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
          </select>
        </button>
      </div>
      <div className="columns-container">
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <div className="column-header">
              <h2>{column.title}</h2>
              <span className="count">{column.items.length}</span>
              <button onClick={() => handleAddCard(columnId)}>
                <Plus />
              </button>
            </div>
            <div className="cards-container">
              {column.items.map((card, index) => (
                <TaskCard
                  key={card.id}
                  {...card}
                  index={index}
                  onDelete={() => handleDeleteCard(card.id, columnId)}
                  onEdit={() => handleEditCard(card.id, columnId)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <CardModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSubmit={async (title, description, dueDate) => {
            if (editingTask) {
              // Handle edit
              try {
                const response = await fetch(
                  `https://upaay-backend.onrender.com/tasks/${editingTask.id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      title,
                      description,
                      dueDate,
                    }),
                  }
                );

                if (!response.ok) {
                  throw new Error("Failed to update task");
                }

                const data = await response.json();

                setColumns((prev) => ({
                  ...prev,
                  [editingTask.columnId]: {
                    ...prev[editingTask.columnId],
                    items: prev[editingTask.columnId].items.map((item) =>
                      item.id === editingTask.id
                        ? { ...item, title, description, dueDate }
                        : item
                    ),
                  },
                }));
              } catch (error) {
                console.error("Error updating task:", error);
              }
            } else {
              // Handle create
              handleCreateCard(title, description, dueDate);
            }
            setShowModal(false);
            setEditingTask(null);
          }}
          initialData={editingTask}
        />
      )}
    </div>
  );
};

export default Mainpage;
