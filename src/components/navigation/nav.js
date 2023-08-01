import React, { useEffect, useState, useContext } from 'react'
import './nav.scss'
import { NavLink, Link } from "react-router-dom"
import { useLocation, useHistory } from 'react-router-dom';
import { UserContext } from "../../contexApi/UserContext"

import { LogOutUser } from "../services/userService"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../img/logo.svg"
import { toast } from 'react-toastify'
import ModalViewNotification from "../modalviewNotification"
import { NotificationContext } from "../../contexApi/NotificationContext"
import ModalChangePass from "../modalChangePass"
import Language from "../navigation/language"
import { useTranslation, Trans } from 'react-i18next';

const NavHeader = (props) => {
    const { t, i18n } = useTranslation();

    const location = useLocation()
    const history = useHistory()
    const { user, logout } = React.useContext(UserContext);
    const { list, listStaff, listAdmin } = React.useContext(NotificationContext);

    const [ListUnread, setListUnread] = useState([])
    const [listStaffUnread, setlistStaffUnread] = useState([])
    const [listDevUnread, setlistDevUnread] = useState([])

    const [show, setShow] = useState(false)
    const [showModalChangePass, setShowModalChangePass] = useState(false)

    const handleShowChanePassModal = () => {
        setShowModalChangePass(!showModalChangePass)
    }

    useEffect(() => {
        if (list && list.length > 0) {
            let data = list.filter(item => item.ViewByuser === "0")
            setListUnread(data)
        }
        if (listStaff && listStaff.length > 0) {
            let data = listStaff.filter(item => item.ViewByStaff === "0")
            setlistStaffUnread(data)
        }
        if (listAdmin && listAdmin.length > 0) {
            let data = listAdmin.filter(item => item.ViewByStaff === "0")
            setlistDevUnread(data)
        }

    }, [list, listStaff, listAdmin])

    const handleShowNotificationModal = () => {
        setShow(!show)
    }
    const handleLogOut = async () => {
        let res = await LogOutUser()
        // clear cookie
        if (res && +res.EC === 0) {
            localStorage.removeItem("jwt")
            // clear localStorage
            localStorage.removeItem("infomation Page")
            localStorage.removeItem("StatusPayment")

            logout();
            // set user default in contextApi
            toast.success("logout success !")
            history.push("/login")
        } else {
            toast.error(res.EM)
        }
    }
    //  neu ko co thong tin user thi khong hien thanh nav va chi cho thanh nav hien khi o trang home khi chua co nguoi dung
    if (user && user.isAuthenticated === true || location.pathname === "/") {

        return (
            <>
                <div className='nav-header d-none d-lg-block'>
                    <Navbar bg="header" expand="lg">
                        <Container>

                            <Navbar.Brand >

                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt='Logo'
                                />
                                <span className='brand-name' >HUY LE </span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" exact>
                                        {t('navigation.one')}
                                    </NavLink>


                                    <NavDropdown title={`${t('navigation.Two')}`}
                                        id="basic-nav-dropdown" className='dropdown'>
                                        <NavDropdown.Item href='/listuser'  >
                                            {t('navigation.three')}

                                        </NavDropdown.Item>
                                        {user?.account?.groupName === "Customer"
                                            ?
                                            <></>
                                            :
                                            <>
                                                <NavDropdown.Item href='/role' >
                                                    {t('navigation.Four')}
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href='/grouprole'>
                                                    {t('navigation.Five')}
                                                </NavDropdown.Item>
                                            </>
                                        }





                                    </NavDropdown>


                                    <NavDropdown title={`${t('navigation.Six')}`} id="basic-nav-dropdown" className='dropdown'>
                                        <NavDropdown.Item href='/dashboard_Product'>
                                            {t('navigation.Seven')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/dashboard_Warehouse'>
                                            {t('navigation.Eight')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/Products' >
                                            {t('navigation.Night')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/Warehouse' >
                                            {t('navigation.Ten')}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {user?.account?.groupName === "Staff" &&


                                        < NavDropdown title={`${t('navigation.Eleven')}`} id="basic-nav-dropdown" className='dropdown'>
                                            <NavDropdown.Item href='/order-processing'>
                                                {t('navigation.Twelve')}
                                            </NavDropdown.Item>
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên lấy hàng" &&
                                                <NavDropdown.Item href='/Pickup_staff'>
                                                    {t('navigation.Thirteen')}
                                                </NavDropdown.Item>
                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kho hàng" &&
                                                <NavDropdown.Item href='/Warehouse_staff'>
                                                    {t('navigation.Fourteen')}
                                                </NavDropdown.Item>

                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên giao hàng" &&
                                                <NavDropdown.Item href='/Delivery_staff'>
                                                    {t('navigation.fifteen')}
                                                </NavDropdown.Item>

                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kế toán" &&
                                                <NavDropdown.Item href='/Overview'>
                                                    {t('navigation.Sixteen')}

                                                </NavDropdown.Item>

                                            }
                                        </NavDropdown>
                                    }

                                    {user?.account?.groupName === "Dev" &&
                                        < NavDropdown title={`${t('navigation.Eleven')}`} id="basic-nav-dropdown" className='dropdown'>
                                            <NavDropdown.Item href='/order-processing'>
                                                {t('navigation.Twelve')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Pickup_staff'>
                                                {t('navigation.Thirteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Warehouse_staff'>
                                                {t('navigation.Fourteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Delivery_staff'>
                                                {t('navigation.fifteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Overview'>
                                                {t('navigation.Sixteen')}

                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    }

                                    {user?.account?.groupName === "Boss" &&
                                        < NavDropdown title={`${t('navigation.Eleven')}`} id="basic-nav-dropdown" className='dropdown'>
                                            <NavDropdown.Item href='/order-processing'>
                                                {t('navigation.Twelve')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Pickup_staff'>
                                                {t('navigation.Thirteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Warehouse_staff'>
                                                {t('navigation.Fourteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Delivery_staff'>
                                                {t('navigation.fifteen')}
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href='/Overview'>
                                                {t('navigation.Sixteen')}

                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    }
                                </Nav>

                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link' >
                                                {t('navigation.Seventeen')}
                                                <b> {user.account.usersname}</b> !
                                            </Nav.Item>
                                            <NavDropdown title={`${t('navigation.Eightteen')}`} id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={() => handleShowChanePassModal()} >
                                                    {t('navigation.Nightteen')}
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href='/Profile' >
                                                    {t('navigation.twentyTwo')}
                                                </NavDropdown.Item>
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogOut()}>
                                                        {t('navigation.twenty')}
                                                    </span>
                                                </NavDropdown.Item>


                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to="/login" >
                                            {t('navigation.twentyOne')}
                                        </Link>


                                    }


                                </Nav>
                                {user?.account?.groupName === "Boss" ?
                                    <></>
                                    :
                                    <>

                                        <Nav.Item className='nav-link' >
                                            <span className=" btn btn-primary position-relative" onClick={() => handleShowNotificationModal()}>
                                                <i className="fa fa-bell" aria-hidden="true"></i>
                                                {!user.account.Position && ListUnread.length > 0
                                                    &&
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        {ListUnread.length}


                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                }
                                                {user.account.Position && listStaffUnread.length > 0
                                                    &&
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        {listStaffUnread.length}


                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                }
                                                {!user.account.Position && listDevUnread.length > 0
                                                    &&
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        {listDevUnread.length}


                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                }

                                            </span>

                                        </Nav.Item>
                                    </>
                                }
                                <Language />
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>

                </div >
                <div className='nav-header-mobile d-block d-lg-none'>
                    <Navbar bg="header" expand="lg">
                        <Container>

                            <Navbar.Brand >

                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt='Logo'
                                />
                                <span className='brand-name' >HUY LE </span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" exact>
                                        {t('navigation.one')}
                                    </NavLink>
                                    <NavDropdown title={`${t('navigation.Two')}`}
                                        id="basic-nav-dropdown" className='dropdown'>
                                        <NavDropdown.Item href='/listuser'  >
                                            {t('navigation.three')}

                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/role' >
                                            {t('navigation.Four')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/grouprole'>
                                            {t('navigation.Five')}
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <NavDropdown title={`${t('navigation.Six')}`} id="basic-nav-dropdown" className='dropdown'>
                                        <NavDropdown.Item href='/dashboard_Product'>
                                            {t('navigation.Seven')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/dashboard_Warehouse'>
                                            {t('navigation.Eight')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/Products' >
                                            {t('navigation.Night')}
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href='/Warehouse' >
                                            {t('navigation.Ten')}
                                        </NavDropdown.Item>
                                    </NavDropdown>


                                    {user?.account?.groupName === "Staff" &&
                                        <NavDropdown title={`${t('navigation.Eleven')}`} id="basic-nav-dropdown" className='dropdown'>
                                            <NavDropdown.Item href='/order-processing'>
                                                {t('navigation.Twelve')}
                                            </NavDropdown.Item>
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên lấy hàng" &&
                                                <NavDropdown.Item href='/Pickup_staff'>
                                                    {t('navigation.Thirteen')}
                                                </NavDropdown.Item>
                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kho hàng" &&
                                                <NavDropdown.Item href='/Warehouse_staff'>
                                                    {t('navigation.Fourteen')}
                                                </NavDropdown.Item>

                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên giao hàng" &&
                                                <NavDropdown.Item href='/Delivery_staff'>
                                                    {t('navigation.fifteen')}
                                                </NavDropdown.Item>

                                            }
                                            {user?.account?.groupName === "Staff" && user?.account?.Position === "Nhân viên kế toán" &&
                                                <NavDropdown.Item href='/Overview'>
                                                    {t('navigation.Sixteen')}

                                                </NavDropdown.Item>

                                            }
                                        </NavDropdown>
                                    }




                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true ?
                                        <>
                                            <Nav.Item className='nav-link' >
                                                {t('navigation.Seventeen')}
                                                <b> {user.account.usersname}</b> !
                                            </Nav.Item>
                                            <NavDropdown title={`${t('navigation.Eightteen')}`} id="basic-nav-dropdown">
                                                <NavDropdown.Item onClick={() => handleShowChanePassModal()} >
                                                    {t('navigation.Nightteen')}
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href='/Profile' >
                                                    {t('navigation.twentyTwo')}
                                                </NavDropdown.Item>
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogOut()}>
                                                        {t('navigation.twenty')}
                                                    </span>
                                                </NavDropdown.Item>


                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to="/login" >
                                            {t('navigation.twentyOne')}
                                        </Link>


                                    }
                                    {user?.account?.groupName === "Boss" ?
                                        <></>
                                        :
                                        <>

                                            <Nav.Item className='nav-link' >
                                                <span className=" btn btn-primary position-relative" onClick={() => handleShowNotificationModal()}>
                                                    <i className="fa fa-bell" aria-hidden="true"></i>
                                                    {!user.account.Position && ListUnread.length > 0
                                                        &&
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {ListUnread.length}


                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    }
                                                    {user.account.Position && listStaffUnread.length > 0
                                                        &&
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {listStaffUnread.length}


                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    }
                                                    {!user.account.Position && listDevUnread.length > 0
                                                        &&
                                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                            {listDevUnread.length}


                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    }

                                                </span>

                                            </Nav.Item>
                                        </>
                                    }

                                </Nav>

                                <Language />
                            </Navbar.Collapse>
                        </Container>

                    </Navbar>

                </div >
                <ModalViewNotification
                    handleShowNotificationModal={handleShowNotificationModal}
                    show={show}
                />
                <ModalChangePass
                    showModalChangePass={showModalChangePass}
                    handleShowChanePassModal={handleShowChanePassModal}
                />

            </>
        );
    } else {
        return <></>
    }
}


export default NavHeader;