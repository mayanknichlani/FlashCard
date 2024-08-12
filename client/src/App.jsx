import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddFlashcard from './components/AddFlashcard';
import EditFlashcards from './components/EditFlashcards';
import DeleteFlashcards from './components/DeleteFlashcards';
import FlashcardList from './components/FlashcardList';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} role="admin" />} />
        <Route path="/add-flashcard" element={<PrivateRoute component={AddFlashcard} role="admin" />} />
        <Route path="/edit-flashcards" element={<PrivateRoute component={EditFlashcards} role="admin" />} />
        <Route path="/delete-flashcards" element={<PrivateRoute component={DeleteFlashcards} role="admin" />} />
        <Route path="/flashcards" element={<FlashcardList />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
