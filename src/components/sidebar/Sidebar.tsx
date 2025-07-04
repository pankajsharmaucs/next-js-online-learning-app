'use client'

import React from 'react'
import SidebarMenu from './SidebarMenu';
import Link from 'next/link';

import { Class, Subject } from '@/types/add_types';

interface OpenCloseType {
  openCloseTrigger: boolean;
  setsidebarOpened: (value: boolean) => void;
  MasterClass: Class[];
  MasterSubject: Subject[];
}

const Sidebar = ({ openCloseTrigger, setsidebarOpened, MasterClass,MasterSubject }: OpenCloseType) => {
    return (
        <>
            {/* sidebar area start */}
            <div className={`sidebar__area p-2 ${openCloseTrigger && "sidebar-opened"}`} >
                <div className="sidebar__wrapper">
                    <div className="sidebar__close" onClick={() => setsidebarOpened(false)}>
                        <button className="sidebar__close-btn" id="sidebar__close-btn">
                            <span>
                                <i className="fal fa-times" />
                            </span>
                            <span>close</span>
                        </button>
                    </div>
                    <div className="sidebar__content">
                        <div className="logo mb-40 ml-10">
                            <Link href="/" onClick={() => setsidebarOpened(false)}>
                                <img src="/assets/common/logo3.png" alt="logo" style={{ width: "55px" }} />
                            </Link>
                        </div>
                        <div className="mobile-menu fix" />
                        <div className="sidebar__search p-relative mt-2 ">
                            <form action="#">
                                <input type="text" placeholder="Search..." />
                                <button type="submit">
                                    <i className="fad fa-search" />
                                </button>
                            </form>
                        </div>

                        <div className="sidebar__content  py-3">
                            <SidebarMenu MasterSubject={MasterSubject} MasterClass={MasterClass} setsidebarOpened={setsidebarOpened} />
                        </div>
                    </div>
                </div>
            </div>


            {/* sidebar area end */}
            <div className="body-overlay " />
            {/* sidebar area end */}
        </>
    )
}

export default Sidebar