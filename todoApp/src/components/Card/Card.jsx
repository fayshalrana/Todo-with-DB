import React from 'react'
import { useState } from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { motion } from "framer-motion"
import { formatDistanceToNow } from 'date-fns';

const Card = ({reference, task, taskDone}) => {
    const [done, setDone] = useState(false);
    const handleDone =(id)=>{
            setDone(!done)
            taskDone(id)
    }
    return (
        <motion.div drag dragConstraints={reference} whileHover={{ scale: 1.1 }} animate={{scale: 1}} initial={{scale: 0}} className="w-[15vw] h-[17vw] bg-gray-700 rounded-md flex relative flex-col overflow-hidden">
            <div className="p-5 ">
                <div className="p-4 bg-gray-500/40 w-[10px] h-[10px] flex justify-center items-center rounded-full z-[4]">
                    <FaRegFileAlt className='text-white absolute' />
                </div>
                <p className='text-gray-400'>{task.task}</p>
            </div>
            <div className="h-[20%] w-full bg-green-400 px-4 mt-auto flex items-center justify-between">
                <span>{formatDistanceToNow(new Date(task.date))}</span>
                <label className ="relative inline-flex items-center cursor-pointer">
                    <input onClick={()=>handleDone(task._id)} type="checkbox" value="" className ="sr-only peer"/>
                        <div className ="w-8 h-4 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-['']
                          after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300
                           after:border after:rounded-full after:h-3 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
            </div>
            {done ? <div className="w-full h-[80%] top-0 left-0 absolute bg-blue/80 flex justify-center items-center backdrop-blur-sm">
                <h3 className='text-white font-bold text-2xl'>Done</h3>
            </div> : ""

            }
        </motion.div>
    )
}

export default Card
