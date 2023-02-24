

import { Button, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Archive = () => {
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("archiveData"))|| []);
  const naviget=useNavigate();
const handaleback=()=>{
  naviget("/")
}

  return (
    <div>
      <Heading textDecor={"underline"}>ArchiveData</Heading><br/>
      {
        tasks?.map((item) => <h1>{item.title}</h1>)
      }
      <Button onClick={handaleback}>Go Back</Button>
    </div>
  )
}

export default Archive
