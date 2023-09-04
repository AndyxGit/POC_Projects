

import "./Sidebar.css";
import React, { useContext, useState } from "react";
import { mdiReceiptTextCheck, mdiHome, mdiLogoutVariant } from '@mdi/js';
import Logo from '../../assets/LogoClaro.jpg'
import userIcon from '../../assets/userIcon.png'
import Icon from '@mdi/react'
import { AppContext } from "Context";
import { SidebarTooltip } from "./SidebarTooltip";
import { CLARO_HOME_URL } from "config/config.env";

export const Sidebar = () => {
    const [hoveredLocation, setHoveredLocation] = useState('');
    const { location, setLocation, setShowSidebarModal } = useContext(AppContext);
    const { user } = useContext(AppContext);

    const pagesItems = [
        {
            name: 'PP-CS',
            icon: mdiHome,
            tooltip: <SidebarTooltip name='PP-CS' />,
            tabIndex: "3",
            title: "Menú - Botón Portal"
        },
        {
            name: 'Consumo de Datos',
            icon: mdiReceiptTextCheck,
            tooltip: <SidebarTooltip name='Consumo de Datos' />,
            tabIndex: "4",
            title: "Menú - Botón Consumo de Datos"
        },
    ];

    const accountItems = [
        {
            name: 'userButton',
            icon: <img className='userAccountLogo' title="userAccount" src={userIcon} alt='logo_claro' width='25px' height='25px' />,
            tooltip: <SidebarTooltip name={user} />,
            tabIndex: "5",
            title: "Menú - Botón Usuario Claro"
        },
        {
            name: 'logoutButton',
            icon: <Icon path={mdiLogoutVariant} size={'22px'} />,
            onClick: () => setShowSidebarModal(true),
            tabIndex: "6",
            title: "Menú - Botón Cerrar Sesión"
        },
    ];

    const enterLocation = (e, location) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {setLocation(location) }
    }

    return (
        <div className='containerSidebar' alt='container-sidebar'>
            <div className='logos'>
                <img tabIndex="2" className='logoClaro' title="logoClaro" src={Logo} alt='Claro Home' width='25px' height='25px' onClick={() => window.location.replace(CLARO_HOME_URL)} />
                {
                    pagesItems.map((item) => (
                        <div tabIndex={item.tabIndex} key={item.name} onMouseOver={() => setHoveredLocation(item.name)} onMouseLeave={() => setHoveredLocation('')} className='sidebarItemContainer' onClick={() => setLocation(item.name)} onKeyDown={(e) => enterLocation(e, item.name)}>
                            <div title={item.title} className={location === item.name ? "activeIconContainer" : "iconContainer"}>
                                <Icon path={item.icon} size={'22px'} />
                            </div>
                            {hoveredLocation === item.name &&
                                <div className="hoverItemName">
                                    <div className='itemName'>
                                        {item.tooltip}
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className='logos'>
                {
                    accountItems.map((item, index) => (
                        <div key={item.name}tabIndex={item.tabIndex}  onClick={item.onClick} onMouseOver={() => setHoveredLocation(item.name)} onMouseLeave={() => setHoveredLocation('')} className='sidebarItemContainer' >
                            <div data-testid={`icon_user_sidebar_${index}`} title={item.title} className="iconContainer">
                                {item.icon}
                            </div>
                            {hoveredLocation === item.name &&
                                <div className="hoverItemName">
                                    <div className='itemName'>
                                        {item.tooltip}
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div >
    )
};