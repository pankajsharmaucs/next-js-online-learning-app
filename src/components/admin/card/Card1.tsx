'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CardProps } from '@/types';
import { FaUser, FaPlus, FaChalkboardTeacher, FaBookOpen, FaUsers, FaCog } from 'react-icons/fa';

const Card1 = ({ title, link, icon }: CardProps) => {
    const [imageSrc, setImageSrc] = useState('');
    console.log(title);
    
    useEffect(() => {
        switch (title) {
            case 'User':
                setImageSrc('/admin/dashboard/users.png');
                break;
            case 'Add':
                setImageSrc('/admin/dashboard/add.png');
                break;
            case 'Classes':
                setImageSrc('/admin/dashboard/classes.png');
                break;
            case 'Subjects':
                setImageSrc('/admin/dashboard/subjects.png');
                break;
            case 'Settings':
                setImageSrc('/admin/dashboard/settings.webp');
                break;
            default:
                break;
        }
    }, [title]);

    const iconMap = {
        FaUser: <FaUser className="text-xs text-gray-600 mb-2" />,
        FaPlus: <FaPlus className="text-xs text-gray-600 mb-2" />,
        FaChalkboardTeacher: <FaChalkboardTeacher className="text-xs text-gray-600 mb-2" />,
        FaBookOpen: <FaBookOpen className="text-xs text-gray-600 mb-2" />,
        FaUsers: <FaUsers className="text-xs text-gray-600 mb-2" />,
        FaCog: <FaCog className="text-xs text-gray-600 mb-2" />,
    };

    return (
        <div className="bg-white border cursor-pointer   border-gray-200 rounded shadow-md hover:shadow-xl hover:border-gray-400 transition-all duration-300 text-center">
            <Link href={link} className="flex justify-center flex-column items-center gap-4 pt-3 px-3">
                {/* {iconMap[icon as keyof typeof iconMap]} */}

                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt={`${title} icon`}
                            width={80}
                            height={40}
                            className="rounded"
                        />
                    )}

                <h5 className="">{title}</h5>
            </Link>
        </div>
    );
};

export default Card1;
