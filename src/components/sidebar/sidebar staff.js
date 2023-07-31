import "react-pro-sidebar/dist/css/styles.css";
import { NavLink, NavNavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

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
import { UserContext } from "../../contexApi/UserContext"
import { BiAbacus } from "react-icons/bi";
import { BiAtom } from "react-icons/bi";
import { BiBriefcase } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";


const SidebarStaff = ({ image, collapsed, toggled, handleToggleSidebar, setCollapsed }) => {
    const { user, logout } = React.useContext(UserContext);

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
                            <MenuItem icon={<FaGem />}>
                                <NavLink to="">Homepage</NavLink>{" "}
                            </MenuItem>

                            <MenuItem
                                icon={<MdOutlinePermDataSetting />}
                                suffix={<span className="badge red"></span>}
                            >
                                <NavLink to="/order-processing">Manage</NavLink>{" "}
                            </MenuItem>
                            {user?.account?.groupName === "Dev" &&
                                <MenuItem icon={<FiSettings />}>
                                    <NavLink to="/Pickup_staff">Pickup staff</NavLink>{" "}

                                </MenuItem>
                            }
                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên lấy hàng" &&
                                <MenuItem icon={<FiSettings />}>
                                    <NavLink to="/Pickup_staff">Pickup staff</NavLink>{" "}

                                </MenuItem>
                            }
                            {user?.account?.groupName === "Dev" &&

                                <MenuItem icon={<BiAbacus />}>
                                    <NavLink to="/Warehouse_staff">Warehouse staff</NavLink>{" "}
                                </MenuItem>
                            }
                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kho hàng" &&
                                <MenuItem icon={<BiAbacus />}>
                                    <NavLink to="/Warehouse_staff">Warehouse staff</NavLink>{" "}
                                </MenuItem>
                            }
                            {user?.account?.groupName === "Dev" &&
                                <MenuItem icon={<BiAtom />}>
                                    <NavLink to="/Delivery_staff">Delivery staff</NavLink>{" "}
                                </MenuItem>
                            }
                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên giao hàng" &&
                                <MenuItem icon={<BiAtom />}>
                                    <NavLink to="/Delivery_staff">Delivery staff</NavLink>{" "}
                                </MenuItem>
                            }
                            {user?.account?.groupName === "Dev" &&
                                <MenuItem icon={<BiBriefcase />}>
                                    <NavLink to="/Overview">Accountant employer</NavLink>{" "}
                                </MenuItem>
                            }
                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kế toán" &&
                                <MenuItem icon={<BiBriefcase />}>
                                    <NavLink to="/Overview">Accountant employer</NavLink>{" "}
                                </MenuItem>
                            }
                            <MenuItem icon={<BiFilter />}>
                                <NavLink to="/listuser">List user </NavLink>{" "}
                            </MenuItem>
                        </Menu>

                    </SidebarContent>


                </ProSidebar>
            </div>
        </>
    );
};
export default SidebarStaff;
