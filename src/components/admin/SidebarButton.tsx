import React from 'react';
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
  link: string;
};

function SidebarButton({ label, icon, link }: SidebarButtonProps) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition text-white"
    >
      <span className="text-sm">{iconMap[icon]}</span>
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default SidebarButton;
