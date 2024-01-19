import React, { useState } from 'react'
import './CreateTask.css'

export default function CreateTask() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCreateTask = () => {
    if (title && description && dueDate) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        dueDate,
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
      // Clear input fields after creating a task
      setTitle('');
      setDescription('');
      setDueDate('');
      // Show the modal
      setShowModal(true);

      // Hide the modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  const handleUpdateTask = (taskId, updatedData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <div className="createTaskMain">
        <div className="createTaskForm">
          <h2>Create New Task</h2>
          <div className="createTask-form-group">
            <label>Title:</label>
            <input className='createTask-input'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required/>
          </div>
          <div className="createTask-form-group">
            <label>Description:</label>
            <textarea className='createTask-textarea'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required></textarea>
          </div>
          <div className="createTask-form-group">
            <label>Due Date:</label>
            <input className='createTask-input'
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required/>
          </div>
          <button className='createTaskBttn' onClick={handleCreateTask}>Create Task</button>
        </div>
        {showModal && (
          <div className="createTask-modal">
            <p>Task created successfully!</p>
          </div>
        )}
      </div>
    </div>
  )
}
