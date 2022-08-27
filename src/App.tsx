import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import "./App.css"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Login from "./pages/Login"

function App() {
  const [isLogged, setLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLogged")
    setLogin(false)
    window.location.pathname = '/login'
  }
  return (
    <Router>
      <nav>
        {isLogged && <Link to="/">Blogs</Link>}
        {isLogged && <Link to="/create-post">Post</Link>}
        {!isLogged ? <Link to="/login">Login With Firebase</Link> : <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/create-post" element={<CreatePost isAuth = {isLogged}/>} />
      </Routes>
    </Router>
  );
}

export default App;
