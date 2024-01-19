import React, { useState } from 'react';
import './TaskList.css';

export default function TaskList() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      dueDate: '2021-09-01',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is task 2',
      dueDate: '2021-09-02',
      completed: true,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'This is task 3',
      dueDate: '2021-09-03',
      completed: false,
    },
  ]);

  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [dueDateFilter, setDueDateFilter] = useState({
    startDate: '',
    endDate: '',
  });

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleUpdateTask = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    setUpdateFormData(taskToUpdate);
    setIsUpdateModalOpen(true);
    setIsDeleteModalOpen(false); // Close delete modal if open
  };

  const handleUpdateModalClose = () => {
    setUpdateError('');
    setIsUpdateModalOpen(false);
  };

  const handleUpdateFormChange = (e) => {
    setUpdateFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]:
        e.target.name === 'completed'
          ? e.target.value === 'true'
          : e.target.value,
    }));
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();

    if (
      !updateFormData.title ||
      !updateFormData.description ||
      !updateFormData.dueDate
    ) {
      setUpdateError('Please fill in all fields.');
      return;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === updateFormData.id ? { ...task, ...updateFormData } : task
    );

    setTasks(updatedTasks);
    handleUpdateModalClose();
  };

  const handleDeleteTask = (taskId) => {
    setDeleteTaskId(taskId);
    setIsDeleteModalOpen(true);
    setIsUpdateModalOpen(false); // Close update modal if open
  };

  const handleDeleteModalClose = () => {
    setDeleteTaskId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirmation = () => {
    const updatedTasks = tasks.filter((task) => task.id !== deleteTaskId);
    setTasks(updatedTasks);
    handleDeleteModalClose();
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleDueDateFilterChange = (e, dateType) => {
    setDueDateFilter((prevFilter) => ({
      ...prevFilter,
      [dateType]: e.target.value,
    }));
  };

  const handleClearDueDateFilter = () => {
    setDueDateFilter({
      startDate: '',
      endDate: '',
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') {
      return true;
    } else if (filterStatus === 'completed') {
      return task.completed;
    } else if (filterStatus === 'pending') {
      return !task.completed;
    }
    return true;
  }).filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((task) => {
    const taskDueDate = new Date(task.dueDate);
    const startDate = dueDateFilter.startDate
      ? new Date(dueDateFilter.startDate)
      : null;
    const endDate = dueDateFilter.endDate
      ? new Date(dueDateFilter.endDate)
      : null;

    if (startDate && endDate) {
      return taskDueDate >= startDate && taskDueDate <= endDate;
    } else if (startDate) {
      return taskDueDate >= startDate;
    } else if (endDate) {
      return taskDueDate <= endDate;
    }

    return true;
  });

  return (
    <div className='TaskListContainer'>
      <div className="taskListMain">
        <h2>Task List</h2>
        <div className="taskList-filter">
          <div className="taskList-search-container">
            <label className='taskList-label'>Search:</label>
            <input className='SearchFilter'
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Enter search query" />
            <button className='taskList-bttn' onClick={handleClearSearch}>
              Clear
            </button>
          </div>

          <div className="taskList-filter-container">
            <label className='taskList-label'>Show Tasks:</label>
            <select className='taskList-filter-dropdown'
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="taskList-dueDate-filter-container">
            <label className='taskList-label'>Due Date Range:</label>
            <input
              type="date"
              value={dueDateFilter.startDate}
              onChange={(e) => handleDueDateFilterChange(e, 'startDate')}
              placeholder="Start Date" />
            <input
              type="date"
              value={dueDateFilter.endDate}
              onChange={(e) => handleDueDateFilterChange(e, 'endDate')}
              placeholder="End Date" />
            <button className='taskList-bttn' onClick={handleClearDueDateFilter}>
              Clear
            </button>
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          <div className='ListItemsContainer'>
            {filteredTasks.map((task) => (
              <div className="taskList-item" key={task.id}>
                <h3>{task?.title}</h3>
                <p>{task?.description}</p>
                <div className='taskFunction'>
                  <p>Due Date: {task?.dueDate}</p>
                  <p>Status: {task?.completed ? 'Completed' : 'Pending'}</p>
                </div>
                <div className="taskList-actions">
                  <button className='taskList-bttn' onClick={() => handleUpdateTask(task.id)}>
                    Update
                  </button>
                  <button className='taskList-bttn' onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks found.</p>
        )}
      </div>

      {isUpdateModalOpen && (
        <div className="taskList-update-modal">
          <form onSubmit={handleUpdateFormSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={updateFormData.title}
                onChange={handleUpdateFormChange} />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={updateFormData.description}
                onChange={handleUpdateFormChange} />
            </label>
            <label>
              Due Date:
              <input
                type="date"
                name="dueDate"
                value={updateFormData.dueDate}
                onChange={handleUpdateFormChange} />
            </label>
            <label>
              Status:
              <select
                name="completed"
                value={updateFormData.completed.toString()}
                onChange={handleUpdateFormChange}>
                <option value="false">Pending</option>
                <option value="true">Completed</option>
              </select>
            </label>
            {updateError && <p style={{ color: 'red', textAlign: 'center' }}>{updateError}</p>}
            <div>
              <button type="submit">
                Save Changes
              </button>
              <button type="button" onClick={handleUpdateModalClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="taskList-delete-modal">
          <p>Are you sure you want to delete this task?</p>
          <div>
            <button className='taskList-btn' onClick={handleDeleteConfirmation}>
              Delete
            </button>
            <button className='taskList-btn' onClick={handleDeleteModalClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
