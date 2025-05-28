'use client'

import MenuItem from "./MenuItem";


interface OpenCloseType {
  setsidebarOpened: (value: boolean) => void; // function to update sidebar state
}

const SidebarMenu = ({ setsidebarOpened }: OpenCloseType) => {

  const handleClick = () => setsidebarOpened(false);

  return (
    <ul className="p-0 px-2" >
      <MenuItem title="Home" href="/" onClick={handleClick} />
      <MenuItem title="Cart" href="/cart" onClick={handleClick} />
      <MenuItem
        onClick={handleClick}
        title="Courses"
        links={[
          { label: "Courses", href: "courses" },
          { label: "Course List", href: "course-list" },
        ]}
      />
      <MenuItem title="Blog" href="/blog" onClick={handleClick} />

      <MenuItem title="Contact" href="/contact" onClick={handleClick} />
    </ul>
  );
};

export default SidebarMenu;
