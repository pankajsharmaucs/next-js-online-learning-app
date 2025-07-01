'use client'

// SidebarMenu.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import './sidebar.css'

interface MenuItemProps {
    title: string;
    links?: {
        label: React.ReactNode; // <-- changed from string
        href: string;
    }[];
    href?: string;
    onClick?: () => void;
}

const MenuItem = ({ title, links, href, onClick }: MenuItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="text-gray-700 menuItemUI">
            {links ? (
                <button
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center w-full text-left font-medium text-gray-700  "
                >
                    <span>{title}</span>
                    {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
            ) : (
                <Link href={href || "/"} className="block text-gray-700  font-medium" onClick={onClick}>
                    {title}
                </Link>
            )}

            {links && open && (
                <ul className="pl-4 mt-1 space-y-1 border-gray-200">
                    {links.map((link, index) => (
                        <li key={index} className="  text-gray-700" >
                            <Link href={link.href} onClick={onClick} className="menuAnchor text-gray-700 block pl-4 py-2 text-sm  duration-150" >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

        </li>
    );
};

export default MenuItem;
