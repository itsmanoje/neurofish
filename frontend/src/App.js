import './App.css';

import React from 'react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Classify from './components/Classify';
import Login from './components/Login';
import Navbar from './components/Navbar';
//import Logout from './components/Logout';
import ImageTable from './components/ImageTable';
import Footer from './components/Footer';
import { useAuth0 } from "@auth0/auth0-react";
import FishDetail from './components/FishDetail';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/classify" element={<Classify />} />
            <Route path="/table" element={<ImageTable />} />
            <Route path="/fish-detail" element={<FishDetail/>}/>
          </Routes>
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;