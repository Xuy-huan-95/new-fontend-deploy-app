import "react-pro-sidebar/dist/css/styles.css";
import { NavLink, NavNavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import {
    FaTachometerAlt,
    AiFillSetting,
    FaGem,
    FaGithub,
    FaRegLaughWink,
    FaHeart,
} from "react-icons/fa";
import { DiReact } from "react-icons/di";
import { MdOutlinePermDataSetting } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import "./sidebar.scss";
import { AiFillHome } from "react-icons/ai";

import { BiBarChartSquare } from "react-icons/bi";

const Sidebar = ({ image, collapsed, toggled, handleToggleSidebar, setCollapsed }) => {

    return (
        <>
            <div className="sidebar-container">
                <ProSidebar
                    collapsed={collapsed}
                    toggled={toggled}
                    onToggle={handleToggleSidebar}
                >

                    <SidebarContent>


                        <Menu iconShape="circle">
                            <MenuItem
                                icon={<AiFillHome />}>
                                <NavLink to="/">Homepage</NavLink>{" "}
                            </MenuItem>

                            <SubMenu
                                title={"Dash Board"}
                                suffix={<span className="badge yellow">2</span>}
                                icon={<BiBarChartSquare />}
                            >
                                <MenuItem >
                                    <NavLink to="/dashboard_Product">Product dashboard</NavLink>{" "}
                                </MenuItem>
                                <MenuItem >
                                    <NavLink to="/dashboard_Warehouse"> Warehouse dashboard</NavLink>{" "}
                                </MenuItem>

                            </SubMenu>

                            <MenuItem icon={<FaGem />}>
                                <NavLink to="/Products">Manager-Product</NavLink>{" "}
                            </MenuItem>
                            <MenuItem icon={<FaGem />}>
                                <NavLink to="/Warehouse">Manager-Warehouse</NavLink>{" "}
                            </MenuItem>
                        </Menu>

                    </SidebarContent>


                </ProSidebar>
            </div>
        </>
    );
};
export default Sidebar;
