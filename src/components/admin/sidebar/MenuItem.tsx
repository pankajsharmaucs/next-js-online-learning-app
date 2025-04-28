'use client'

// SidebarMenu.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface MenuItemProps {
    title: string;
    links?: { label: string; href: string }[];
    href?: string;
    onClick?: () => void;
}

const MenuItem = ({ title, links, href, onClick }: MenuItemProps) => {
    const [open, setOpen] = useState(false);

    return (
        <li className="">
            {links ? (
                <button
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center w-full py-3 text-left font-medium text-gray-700 hover:text-blue-600"
                >
                    <span>{title}</span>
                    {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
            ) : (
                <Link href={href || "/"} className="block py-3 font-medium" onClick={onClick}>
                    {title}
                </Link>
            )}

            {links && open && (
                <ul className="pl-4 mt-1 space-y-1   border-gray-200">
                    {links.map((link, index) => (
                        <li key={index}
                            className="fw-bold text-black"
                        >
                            <Link href={link.href} onClick={onClick} className="menuAnchor block pl-4 py-2 text-sm  duration-150" >
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
