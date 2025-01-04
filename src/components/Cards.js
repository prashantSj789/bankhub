import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({name,url,link}) => {
  return (
    <div className='h-70'>
        <div className="max-w-sm p-4">
    <div className="flex flex-col h-full p-8 bg-teal-400 rounded-lg dark:bg-black">
        <div className="flex items-center mb-3">
            <div
                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 mr-3 text-white bg-indigo-500 rounded-full dark:bg-indigo-500">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            </div>
            <h2 className="text-lg font-medium text-white dark:text-white">{name}</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow ">
            <div className='rounded-lg'><iframe src={url}></iframe></div>
            
        
            <Link to={link} className="inline-flex items-center mt-3 text-black dark:text-white hover:text-blue-600"><button >Learn More</button>
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
                </Link>
        </div>
    </div>
        </div>
    </div>
  )
}

export default Cards