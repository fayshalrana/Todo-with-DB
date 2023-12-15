import React, { useEffect, useRef, useState } from 'react'
import Card from '../Card/Card'
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';
import { motion } from "framer-motion"
import { RiCloseFill } from "react-icons/ri";
import toast from 'react-hot-toast';

const Foreground = () => {
  const ref = useRef(null)
  const [tasks, setTasks] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [openModel, setOpenModel] = useState(false)
  const [dltElm, setDltElm] = useState([])

  const handleAddTask = async (event) => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    try {
      const response = await axios.post('http://localhost:3000/add', { task });
      setResponseData(response.data);
      form.reset();
      setOpenModel(false)
    } catch (error) {
      console.log(error);
    }
  };
// delete task
const taskDone = async (id)=>{
  const response = await axios.delete(`http://localhost:3000/remove/${id}`)
  
  setTimeout(() => {
    toast.success('Task Done!')
    setDltElm(response.data)
  }, 3000);
 
}

useEffect(() => {
  fetchTasks(); 
  }, [responseData, dltElm]);

  const fetchTasks = () => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  };

  const handleOpenModel = () =>{
    setOpenModel(true)
  }
  const handleCloseModel = () =>{
    setOpenModel(false)
  }



  return (
    <div ref={ref} className="w-full h-full bg-slate-800/50 z-[3] fixed left-0 top-0 p-5">
      <div className="w-full h-full flex flex-wrap gap-3">
        {
          tasks.map(task => <Card taskDone={taskDone} task={task} key={task._id} reference={ref}></Card>)
        }

      </div>
      <motion.div whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{
          scale: 0.8,
          rotate: -90,
          borderRadius: "100%"
        }} onClick={handleOpenModel} className="cursor-pointer  hover:bg-gray-600 absolute right-3 top-3 p-1 flex items-center justify-center rounded-full">
        <IoMdAddCircle className='text-3xl text-white' />
      </motion.div>
     { openModel && ( <div className="absolute w-full h-full bg-gray-400/30 left-0 top-0 flex justify-center items-center">
        <motion.div animate={{scale: openModel && 1, x: openModel && 0, y: openModel && 0}}  initial={{scale: 0, x:600, y: -400}}  className="py-10 px-8 bg-gray-300 w-[500px] relative rounded-md shadow-md">
          <button onClick={handleCloseModel} className='inline-block absolute right-2 top-2' ><RiCloseFill className='text-3xl text-red-600' /> </button>
          <form onSubmit={handleAddTask} action="" className='flex gap-4 flex-col'>
            <textarea type="text" rows={5} required placeholder='Add your task' name='task' className='p-3 border focus-visible:outline-gray-500 rounded-md resize-none' />
          <div className="self-end">
          <button type="submit" className='py-1 px-5 text-white rounded-sm bg-blue-700 ml-3 inline-block '>Add</button>
          </div>
          </form>
        </motion.div>
      </div>)
      
     }
    </div>
  )
}

export default Foreground