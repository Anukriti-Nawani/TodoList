

import React, { useEffect, useState } from "react";
import { Box, Button, Input, Text,useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate()
  const toast = useToast()

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDatefortask, setSelectedDatefortask] = useState("");
  let todoData = JSON.parse(localStorage.getItem("todoData")) || [];
  let archiveData = JSON.parse(localStorage.getItem("archiveData")) || [];



  useEffect(() => {
    setTasks(todoData);
  }, [])

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };
  const handleNewTaskDate = (event) => {
    setSelectedDatefortask(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    let newDate = event.target.value.split("-").sort((a, b) => a - b).join("-").slice(1, 10)
    const filteredData = todoData.filter((task) => task.date === newDate);
    setTasks(filteredData);
    console.log(filteredData);
  };

  const addTask = () => {
    const newId = tasks.length + 1;
    const date = selectedDatefortask.split("-").sort((a, b) => a - b).join("-").slice(1, 10);
    const newTaskObject = { id: newId, title: newTask, date: date};
    console.log(newTaskObject)

    todoData.push(newTaskObject);
    localStorage.setItem("todoData", JSON.stringify(todoData))
    setTasks(todoData);
    setNewTask("");
    setSelectedDatefortask("")
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    todoData = updatedTasks;
    localStorage.setItem("todoData", JSON.stringify(todoData))
    setTasks(todoData);
    // alert("Task deleted");
    toast({
      title: 'Task Deleted.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  };

  const editTask = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>task.id === taskId ? { ...task, title: newTitle } : task);
    todoData = updatedTasks;
    localStorage.setItem("todoData", JSON.stringify(todoData))
    setTasks(todoData);
  };

  const edit = (id) => {
    const newData = prompt("edit task")
    if (newData !== null) {
      editTask(id, newData)
    }
  }

  const archiveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) =>
      task.id !== taskId

    );
    const updation = tasks.filter((task) =>
      task.id === taskId
    )
    todoData = updatedTasks;
    localStorage.setItem("todoData", JSON.stringify(todoData))
    setTasks(todoData);
    archiveData.push(updation[0]);
    localStorage.setItem("archiveData", JSON.stringify(archiveData))
    //alert('task archived')
    toast({
      title: 'Task Archived.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navigate('/archive')

  };



  return (
    <Box>
      <Text>To-Do List</Text>
      <div>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      


      <Input mr='1rem' mt='2rem' width='auto' type="text" value={newTask} onChange={handleNewTaskChange} />
      <input
        type="date"
        id="date"
        value={selectedDatefortask}
        onChange={handleNewTaskDate}
      />
      {selectedDatefortask &&
        <Button onClick={addTask} colorScheme='teal' size='md'>
          Add Task
        </Button>}
        <ul>{tasks.map((item) => {
        return (
          <li key={item.id}>
            <h3>{item.title} :-  <span>{item.date}</span></h3>
            <Button colorScheme='blue' mr='1rem' onClick={() => edit(item.id)}>Edit</Button>
            <Button mr='1rem' onClick={() => deleteTask(item.id)} colorScheme='red' size='md'>Delete</Button>
            <Button colorScheme='blue' onClick={() => archiveTask(item.id)}>Archive</Button>
          </li>
        )
      })}</ul>
    </Box>
  );
}

export default TodoList;