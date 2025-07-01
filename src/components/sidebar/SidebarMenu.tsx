'use client'

import MenuItem from "./MenuItem";
import { Class, Subject } from '@/types/add_types';

interface OpenCloseType {
  setsidebarOpened: (value: boolean) => void;
  MasterClass: Class[];
  MasterSubject: Subject[];
}

const SidebarMenu = ({ setsidebarOpened, MasterClass, MasterSubject }: OpenCloseType) => {

  const handleClick = () => setsidebarOpened(false);

  return (
    <ul className="p-0 px-2 text-black" >
      <MenuItem title="Home" href="/" onClick={handleClick} />
      <MenuItem
        onClick={handleClick}
        title="Classes"
        links={MasterClass.map((data, index) => ({
          label: (
            <span className="flex items-center gap-2">
              <span className="text-[#0e75a8] text-sm">•</span>
              <span className="text-capitalize" >Class {data.class_name}</span>
            </span>
          ),
          href: "/class/" + data.class_name.toLowerCase().replace(/\s+/g, "-"),
        }))}
      />

      <MenuItem
        onClick={handleClick}
        title="Subjects"
        links={MasterSubject.map((data, index) => ({
          label: (
            <span className="flex items-center gap-2">
              <span className="text-[#0e75a8] text-sm">•</span>
              <span className="text-capitalize">{data.subject_name}</span>
            </span>
          ),
          href: "/subject/" + data.subject_name.toLowerCase().replace(/\s+/g, "-"),
        }))}
      />

      <MenuItem title="Blog" href="/blog" onClick={handleClick} />

      <MenuItem title="Contact" href="/contact" onClick={handleClick} />
    </ul>
  );
};

export default SidebarMenu;
