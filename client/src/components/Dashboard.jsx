import React from 'react';
import './Dashboard.css'; // Add your CSS file for styling
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <Link to = {"/add-flashcard"}><button className="dashboard-button">Add Flashcard</button></Link>
        <Link to = {"/edit-flashcards"}><button className="dashboard-button">Edit Flashcards</button></Link>
        <Link to = {"/delete-flashcards"}><button className="dashboard-button">Delete Flashcards</button></Link>
      </div>
    </div>
  );
};

export default Dashboard;
