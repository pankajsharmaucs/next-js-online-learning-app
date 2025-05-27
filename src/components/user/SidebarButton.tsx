'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaTachometerAlt,
  FaUser,
  FaPlus,
  FaChalkboardTeacher,
  FaBookOpen,
  FaCog,
} from 'react-icons/fa';

const iconMap = {
  FaTachometerAlt: <FaTachometerAlt />,
  FaUser: <FaUser />,
  FaPlus: <FaPlus />,
  FaChalkboardTeacher: <FaChalkboardTeacher />,
  FaBookOpen: <FaBookOpen />,
  FaCog: <FaCog />,
};

type SidebarButtonProps = {
  label: string;
  icon: keyof typeof iconMap;
  link?: string;
  dropdownItems?: { label: string; link: string }[];
  setSidebarOpen?: (open: boolean) => void;
};

function SidebarButton({ label, icon, link = '#', dropdownItems = [], setSidebarOpen }: SidebarButtonProps) {
  const [open, setOpen] = useState(false);
  const hasDropdown = dropdownItems.length > 0;

  const toggleDropdown = () => {
    if (hasDropdown) setOpen(!open);
  };

  return (
    <div className="w-full">
      <Link href={link || '#'} onClick={!hasDropdown ? () => setSidebarOpen?.(false) : undefined}>
        <div
          onClick={toggleDropdown}
          className={`sidebarButtonLink flex items-center justify-between gap-3 p-2 rounded-md bg-blue-50 hover:bg-blue-200 transition 
            cursor-pointer w-full ${hasDropdown ? 'hover:bg-blue-100' : ''}`} >

          <div className="flex items-center gap-3" onClick={() => setSidebarOpen?.(false)} >
            <span className="text-sm text-blue-800">{iconMap[icon]}</span>
            <span className="text-sm text-blue-800">{label}</span>
          </div>
          {hasDropdown && (
            <span className="text-blue-800 text-xs">{open ? '▲' : '▼'}</span>
          )}
        </div>
      </Link>

      {hasDropdown && open && (
        <div className="ml-6 mt-1 ms-3 flex flex-col gap-1">
          {dropdownItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              onClick={() => setSidebarOpen?.(false)}
              className="text-sm    text-blue-700 hover:text-blue-900 px-3 py-2 rounded hover:bg-blue-100 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {!hasDropdown && (
        <Link
          href={link}
          className="hidden" // Optional fallback if you want to allow both click on link and dropdown
        />
      )}
    </div>
  );
}

export default SidebarButton;
