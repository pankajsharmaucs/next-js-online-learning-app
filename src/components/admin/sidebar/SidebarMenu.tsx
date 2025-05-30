'use client'

import MenuItem from "./MenuItem";


interface OpenCloseType {
  setsidebarOpened: (value: boolean) => void; // function to update sidebar state
}

const SidebarMenu = ({ setsidebarOpened }: OpenCloseType) => {

  const handleClick = () => setsidebarOpened(false);

  return (
      <ul className="p-0 px-2" >
        <MenuItem title="Dashboard" href="/admin/dashboard" onClick={handleClick} />
        <MenuItem title="Users" href="/admin/users" onClick={handleClick} />
        <MenuItem title="Add" href="/admin/add" onClick={handleClick} />
        <MenuItem title="Classes" href="/admin/classes" onClick={handleClick} />
        <MenuItem title="Subjects" href="/admin/subjects" onClick={handleClick} />
        <MenuItem title="Settings" href="/admin/settings" onClick={handleClick} />
      </ul>
  );
};

export default SidebarMenu;
