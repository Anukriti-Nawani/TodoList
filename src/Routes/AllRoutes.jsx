import React from 'react'
import {Routes, Route}   from 'react-router-dom'
import Archive from './Archive'
import Home from './Home'
import TodoList from './NewTodo'

const AllRoutes = () => {
  return (
    <>
    {/* <TodoList/> */}
    <Routes>
    <Route path='/' element = {<Home/>}/>
        <Route path='/archive' element = {<Archive/>}/>
    </Routes>
    </>
  )
}

export default AllRoutes
