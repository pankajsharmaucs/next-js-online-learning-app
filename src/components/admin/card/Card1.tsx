import Link from 'next/link';
import React from 'react'
import { CardProps } from '@/types';
import { FaUser, FaPlus, FaChalkboardTeacher, FaBookOpen, FaUsers, FaCog, } from 'react-icons/fa'

const Card1 = ({ title, link, icon }: CardProps) => {
    return (
        <div className=" bg-white border cursor-pointer
        border-gray-200 rounded shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 text-center"
         >
            <Link href={link} className='flex justify-center align-items-center  gap-4 ' style={{padding:"20px"}}>

                {icon == 'FaUser' && <FaUser className="text-2xl text-gray-600 mb-2  " />}
                {icon == 'FaPlus' && <FaPlus className="text-2xl text-gray-600 mb-2  " />}
                {icon == 'FaChalkboardTeacher' && <FaChalkboardTeacher className="text-2xl text-gray-600 mb-2  " />}
                {icon == 'FaBookOpen' && <FaBookOpen className="text-2xl text-gray-600 mb-2  " />}
                {icon == 'FaUsers' && <FaUsers className="text-2xl text-gray-600 mb-2  " />}
                {icon == 'FaCog' && <FaCog  className="text-2xl text-gray-600 mb-2  " />}

                <h3 className="text-lg font-medium">{title}</h3>

            </Link>
        </div>
    )
}

export default Card1