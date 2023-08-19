import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoute from './Route' 
import Nav from './components/Nav';
import Menu from './components/Menu';
import "./App.css"
import { useSelector } from 'react-redux';

function App() {

  const theme = useSelector((state) => state.value.lightTheme);

  useEffect(() => {
      document.body.style.backgroundColor = theme? "var(--light-gray-bg)" : "var(--dark-blue-dmode-bg)"
  }, [theme])

   return (
    <>
      <Nav />
        <Router basename='/restcountriesapi'>
          <Menu />
        <div className='main-app'>
          <AppRoute />
        </div>
      </Router>
    </>
  )
}

export default App