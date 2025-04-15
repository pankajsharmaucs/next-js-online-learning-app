// components/TabButton.tsx
'use client';

import React from 'react';

interface ClassTypes {
    tab_id: string;
}

export default function TabButton(tab_id: ClassTypes) {

    const showHideTab = (tab: ClassTypes) => {
        console.log("Tab ID:", tab.tab_id);
    };

    return (
        <button
            className="nav-link"
            onClick={() => showHideTab( tab_id )}
        >
            {" "}
            <i className="icon_book_alt" /> <span>Curriculum</span>{" "}
        </button>
    );
}
