import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Correct import
import './Sidebar.css';
import { SidebarData } from './SidebarData'; // Correct import
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    return (
        <div className='Sidebar' style={{ width: isOpen ? '200px' : '80px' }}>
            <div className={`top_section ${isOpen ? 'justify-end' : 'justify-center'}`}>
                {/* <h1 className='text-[24px]' style={{ display: isOpen ? 'block' : 'none' }}>Sidebar</h1> */}
                {isOpen === false ? <FormatIndentIncreaseIcon onClick={toggle} style={{height:'28px', width:'28px'}} />
                    : <FormatIndentDecreaseIcon onClick={toggle} style={{height:'28px', width:'28px'}} />
                }
            </div>
            <ul className='SidebarList'>
                {SidebarData.map((val, key) => {
                    return (
                        <NavLink
                            key={key}
                            to={val.link}
                            className='row hover:bg-gray-700'
                            activeClassName='active'>
                            <div id='icon'>{val.icon}</div>
                            <div id='title' style={{ display: isOpen ? 'block' : 'none' }}>{val.title}</div>
                        </NavLink>
                    );
                })}
            </ul>
        </div>
    );
}

export default Sidebar;
