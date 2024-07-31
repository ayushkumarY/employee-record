import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon style={{ height: '28px', width: '28px' }} />,
        link: "/"
    },
    {
        title: "Add",
        icon: <PersonAddAltIcon style={{ height: '28px', width: '28px' }} />,
        link: "/add"
    },
]