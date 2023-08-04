import './Delivery_staff.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithEmployerDelivery, getProjectWithPaginationWithEmployerDelivery_user, updateDeliveryInProject, getDataSearchByEmplyer, createNotification } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalCancelReason from "./modal_cancel_reason"
import { toast } from 'react-toastify'
import _, { debounce } from "lodash"
import moment from "moment"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { getAllShippingUnit } from "../services/shippingService"

const Delivery_staff = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(6)
    const [isSearch, SetIsSearch] = useState(false)
    const [totalPage, setTotalPage] = useState(0)
    const [listProjectbyStaffDelivery, setListProjectbyStaffDelivey] = useState([])
    const [listProjectbyuserStaff, setListProjectbyuserStaff] = useState([])
    const [listProjectSearch, setListProjectSearch] = useState([])

    const [showModal, SetshowModal] = useState(false)
    const [action, setAction] = useState(0)
    const [dataCancel, setDataCancel] = useState([])
    const [dataAgain, setDataAgain] = useState([])
    const [valueSearch, setvalueSearch] = useState("")
    const [shipping, setShipping] = useState([])
    const [shippingUnit, setShippingUnit] = useState([])
    const [select, setSelect] = useState("")
    const handleShowModal = async (item) => {
        SetshowModal(!showModal)
        setAction("Cancel")
        setDataCancel(item)
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
    }
    const getShippingUnit = async () => {
        let res = await getAllShippingUnit()
        if (res && +res.EC === 0) {
            setShipping(res.DT)

        } else {
            toast.error(res.EM)

        }
    }

    const RenderforDev = async (item) => {
        setSelect(item)
        if (item > 0) {
            await fetchProjectUser(item)
            await fetchProjectUserWithUsername(item)
        }
        if (item === "Lựa chọn đơn vị giao hàng") {
            setSelect("")

            setListProjectbyStaffDelivey([])
            setListProjectbyuserStaff([])
        }
    }
    const handleShowModalAgain = async (item) => {
        SetshowModal(!showModal)
        setAction("Again")
        setDataAgain(item)
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
    }

    const HandleSearchData = debounce(async (value) => {
        if (!select) {
            let data = value
            setvalueSearch(value)
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, user.account.Position, +user.account.shippingunit_id)
                if (res && +res.EC === 0) {
                    let data = res.DT.filter(item => item.statuswarehouse_id === 2)
                    setListProjectSearch(data)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }

            } else {
                SetIsSearch(false)
                await fetchProjectUserWithUsername(select)
                await fetchProjectUser(select)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }

        } else {
            let data = value
            setvalueSearch(value)
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, user.account.Position, +select)
                if (res && +res.EC === 0) {
                    let data = res.DT.filter(item => item.statuswarehouse_id === 2)
                    setListProjectSearch(data)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }

            } else {
                SetIsSearch(false)
                await fetchProjectUserWithUsername(select)
                await fetchProjectUser(select)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }

        }

    }, 200)
    const completePickup = async (item) => {
        if (!select) {
            let res = await updateDeliveryInProject(item.id, +user.account.shippingunit_id, 2, user.account.usersname, user.account.phone, "", "", item.Delivery_time, new Date(), "")
            if (res && +res.EC === 0) {
                let abc = await createNotification(item.id, item.order, "đơn hàng giao xong", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 0, item.shippingunit_id)
                if (abc && +abc.EC === 0) {
                    await fetchProjectUserWithUsername(select)
                    await fetchProjectUser(select)
                    if (valueSearch) {
                        await HandleSearchData(valueSearch)

                    }
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            } else {
                toast.error(res.EM)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        } else {
            let res = await updateDeliveryInProject(item.id, +select, 2, user.account.usersname, user.account.phone, "", "", item.Delivery_time, new Date(), "")
            if (res && +res.EC === 0) {
                let abc = await createNotification(item.id, item.order, "đơn hàng giao xong", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 0, select)
                if (abc && +abc.EC === 0) {
                    await fetchProjectUserWithUsername(select)
                    await fetchProjectUser(select)
                    if (valueSearch) {
                        await HandleSearchData(valueSearch)

                    } if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            } else {
                toast.error(res.EM)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        }

    }




    const updateDelivery = async (item) => {
        if (!select) {

            if (!item.User_Delivery && !item.Number_Delivery) {
                let res = await updateDeliveryInProject(item.id, +user.account.shippingunit_id, 1, user.account.usersname, user.account.phone, "", "", new Date(), "", "")
                if (res && +res.EC === 0) {
                    let abc = await createNotification(item.id, item.order, "đơn hàng đang giao", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 1, item.shippingUnit_Id)
                    if (abc && +abc.EC === 0) {
                        await fetchProjectUserWithUsername(select)
                        await fetchProjectUser(select)
                        if (valueSearch) {
                            await HandleSearchData(valueSearch)
                        }
                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                } else {
                    toast.error(res.EM)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
            if (item.User_Delivery && item.Number_Delivery) {

                let res = await updateDeliveryInProject(item.id, +user.account.shippingunit_id, 0, "", "", "", "", "", "", "")
                if (res && +res.EC === 0) {
                    let abc = await createNotification(item.id, item.order, "đơn hàng trì hoãn giao", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 1, item.shippingUnit_Id)
                    if (abc && +abc.EC === 0) {
                        await fetchProjectUserWithUsername(select)
                        await fetchProjectUser(select)
                        if (valueSearch) {
                            await HandleSearchData(valueSearch)
                        }

                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                } else {
                    toast.error(res.EM)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
        } else {
            if (!item.User_Delivery && !item.Number_Delivery) {
                let res = await updateDeliveryInProject(item.id, +select, 1, user.account.usersname, user.account.phone, "", "", new Date(), "", "")
                if (res && +res.EC === 0) {
                    let abc = await createNotification(item.id, item.order, "đơn hàng đang giao", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 1, select)
                    if (abc && +abc.EC === 0) {
                        await fetchProjectUserWithUsername(select)
                        await fetchProjectUser(select)
                        if (valueSearch) {
                            await HandleSearchData(valueSearch)
                        }
                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                } else {
                    toast.error(res.EM)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
            if (item.User_Delivery && item.Number_Delivery) {

                let res = await updateDeliveryInProject(item.id, +select, 0, "", "", "", "", "", "", "")
                if (res && +res.EC === 0) {
                    let abc = await createNotification(item.id, item.order, "đơn hàng trì hoãn giao", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 1, select)
                    if (abc && +abc.EC === 0) {
                        await fetchProjectUserWithUsername(select)
                        await fetchProjectUser(select)
                        if (valueSearch) {
                            await HandleSearchData(valueSearch)
                        }
                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                } else {
                    toast.error(res.EM)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
        }
    }


    const fetchProjectUser = async (select) => {
        if (!select) {
            console.log("1")
            let res = await getProjectWithPaginationWithEmployerDelivery(currentPage, currentLimit, +user.account.shippingunit_id)
            if (res && +res.EC === 0) {
                setTotalPage(+res.DT.totalPage)
                if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                    setCurrentPage(+res.DT.totalPage)
                    await getProjectWithPaginationWithEmployerDelivery(+res.DT.totalPage, currentLimit, +user.account.shippingunit_id)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
                if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                    let data = res.DT.dataProject
                    if (data) {
                        setListProjectbyStaffDelivey(data)
                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                }
                if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                    let data = res.DT.dataProject
                    setListProjectbyStaffDelivey(data)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
        } else {
            console.log("2")
            let res = await getProjectWithPaginationWithEmployerDelivery(currentPage, currentLimit, +select)
            if (res && +res.EC === 0) {
                setTotalPage(+res.DT.totalPage)
                if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                    setCurrentPage(+res.DT.totalPage)
                    await getProjectWithPaginationWithEmployerDelivery(+res.DT.totalPage, currentLimit, +select)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
                if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {
                    let data = res.DT.dataProject
                    if (data) {
                        setListProjectbyStaffDelivey(data)
                        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                        }
                        if (user?.account?.groupName === "Dev") {
                            await getALlListNotification(+user.account.shippingunit_id, "Dev")
                        }
                    }
                }
                if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                    let data = res.DT.dataProject
                    setListProjectbyStaffDelivey(data)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }
            }
        }

    }

    const fetchProjectUserWithUsername = async (select) => {
        if (!select) {
            let res = await getProjectWithPaginationWithEmployerDelivery_user(+user.account.shippingunit_id, user.account.usersname, user.account.phone)
            if (res && +res.EC === 0) {
                setListProjectbyuserStaff(res.DT)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            } else {
                toast.error(res.EM)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        } else {
            let res = await getProjectWithPaginationWithEmployerDelivery_user(+select, user.account.usersname, user.account.phone)
            if (res && +res.EC === 0) {
                setListProjectbyuserStaff(res.DT)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            } else {
                toast.error(res.EM)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        }


    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }
    useEffect(() => {
        getShippingUnit()
    }, [])
    useEffect(() => {
        fetchProjectUser();
        fetchProjectUserWithUsername()
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
    }, [currentPage])
    return (
        <div className='employer-Delivery-container '>
            <div className='left-employer-Delivery d-none d-lg-block '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer-Delivery  '>
                <div className='btn-toggle-employer-Delivery d-none d-lg-block'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer-Delivery'>
                    <div className='container'>

                        <div className='header-employer-Delivery mt-2'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='location-path-employer-Delivery col-12 col-lg-6'>
                                        <Link to="/"> Home</Link>

                                        <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </span>
                                        <Link to="/Delivery_staff">Delivery</Link>
                                    </div>
                                    <div className='search-employer-Delivery col-12 col-lg-6 my-2'>
                                        <div className='search-icon-employer-Delivery'>
                                            <i className="fa fa-search" aria-hidden="true"></i>

                                        </div>
                                        <input
                                            type="text"
                                            placeholder='Search infomation'
                                            onChange={(event) => HandleSearchData(event.target.value)}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='body-employer-Delivery'>
                            <div className="container">
                                <div className='name-page-employer-Delivery'>
                                    <h4>
                                        {t('Delivery-employer.One')}
                                    </h4>
                                    <div className='more-employer-pickup'>
                                        <b>{user?.account?.nameUnit?.NameUnit}</b>


                                    </div>
                                    <span>{user?.account?.Position}</span>
                                    {user?.account?.groupName === "Dev" &&
                                        <div>
                                            <div className='container'>
                                                <div className='row'>
                                                    <select
                                                        className="form-select my-2 col-5"
                                                        onChange={(event) => { setShippingUnit(event.target.value); RenderforDev(event.target.value) }}
                                                        value={shippingUnit}


                                                    >
                                                        <option defaultValue="Lựa chọn đơn vị giao hàng">Lựa chọn đơn vị giao hàng</option>

                                                        {shipping && shipping.length > 0 &&
                                                            shipping.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item.id}>{item.NameUnit}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >
                                                </div>
                                            </div>

                                        </div>
                                    }
                                    {user?.account?.groupName === "Boss" &&
                                        <div>
                                            <div className='container'>
                                                <div className='row'>
                                                    <select
                                                        className="form-select my-2 col-5"
                                                        onChange={(event) => { setShippingUnit(event.target.value); RenderforDev(event.target.value) }}

                                                        value={shippingUnit}


                                                    >
                                                        <option defaultValue="Lựa chọn đơn vị giao hàng">Lựa chọn đơn vị giao hàng</option>

                                                        {shipping && shipping.length > 0 &&
                                                            shipping.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item.id}>{item.NameUnit}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >
                                                </div>
                                            </div>

                                        </div>
                                    }
                                </div>
                                <div className='sort_Delivery my-3'>
                                    <div className='container my-3'>
                                        <div className='row mx-3'>
                                            <div className='col-12 col-lg-3 my-2 content-Delivery ' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}>
                                                {t('Delivery-employer.Two')}
                                            </div>
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_no_status" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Three')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_status_one" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Four')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_status_one" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Five')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_status_four" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Six')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_status_three" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Seven')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isSearch === false &&
                                    <>
                                        <div className='table-wrapper-employer-Delivery my-5'>
                                            <div className='container'>
                                                <div className='title-employer-Delivery my-2'>
                                                    {t('Delivery-employer.Eight')} ({listProjectbyStaffDelivery.length})
                                                </div>
                                                <hr />
                                                <div className='sub-title-employer-Delivery d-none d-lg-block '>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='sub-left col-12 col-lg-3'>
                                                                <div className=' mx-3' style={{ color: "red" }}><i className="fa fa-flag" aria-hidden="true"></i>
                                                                </div>

                                                                <div className='NameColor'>
                                                                    {t('Delivery-employer.Night')}
                                                                </div>

                                                            </div>
                                                            <div className='d-flex align-item-center justify-content-end col-12 col-lg-9' >
                                                                < ReactPaginate
                                                                    nextLabel="next >"
                                                                    onPageChange={handlePageClick}
                                                                    pageRangeDisplayed={2}
                                                                    marginPagesDisplayed={3}
                                                                    pageCount={totalPage}
                                                                    previousLabel="< previous"
                                                                    pageClassName="page-item"
                                                                    pageLinkClassName="page-link"
                                                                    previousClassName="page-item"
                                                                    previousLinkClassName="page-link"
                                                                    nextClassName="page-item"
                                                                    nextLinkClassName="page-link"
                                                                    breakLabel="..."
                                                                    breakClassName="page-item"
                                                                    breakLinkClassName="page-link"
                                                                    containerClassName="pagination"
                                                                    activeClassName="active"
                                                                    renderOnZeroPageCount={null}
                                                                    forcePage={+currentPage - 1}

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className='sub-title-employer-Delivery d-block d-lg-none '>
                                                    <div className='container'>
                                                        <div className='row'>
                                                            <div className='d-flex align-item-center justify-content-endcol-12 col-lg-3'>
                                                                <div className=' mx-3' style={{ color: "red" }}><i className="fa fa-flag" aria-hidden="true"></i>
                                                                </div>

                                                                <div className='NameColor'>
                                                                    {t('Delivery-employer.Night')}
                                                                </div>

                                                            </div>
                                                            <div className='d-flex align-item-center justify-content-center col-12 col-lg-9 mt-2' style={{ fontSize: "10px" }} >
                                                                < ReactPaginate
                                                                    nextLabel="next >"
                                                                    onPageChange={handlePageClick}
                                                                    pageRangeDisplayed={2}
                                                                    marginPagesDisplayed={3}
                                                                    pageCount={totalPage}
                                                                    previousLabel="< previous"
                                                                    pageClassName="page-item"
                                                                    pageLinkClassName="page-link"
                                                                    previousClassName="page-item"
                                                                    previousLinkClassName="page-link"
                                                                    nextClassName="page-item"
                                                                    nextLinkClassName="page-link"
                                                                    breakLabel="..."
                                                                    breakClassName="page-item"
                                                                    breakLinkClassName="page-link"
                                                                    containerClassName="pagination"
                                                                    activeClassName="active"
                                                                    renderOnZeroPageCount={null}
                                                                    forcePage={+currentPage - 1}

                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div style={{ overflow: "auto" }}>
                                                    <table className="table table-bordered table-body-employer-Delivery">
                                                        <thead>
                                                            <tr className='table-secondary' >
                                                                <th></th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.One')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Two')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Three')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Four')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Five')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Seven')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Eight')}
                                                                </th>

                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Ten')}
                                                                </th>
                                                                <th scope="col" style={{ width: "120px" }}>
                                                                    {t('Delivery-employer.Body.Eleven')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Twelve')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Thirteen')}
                                                                </th>

                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Fifteen')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Sixteen')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Seventeen')}
                                                                </th>


                                                            </tr>
                                                        </thead>
                                                        {listProjectbyStaffDelivery && listProjectbyStaffDelivery.length > 0
                                                            ?
                                                            listProjectbyStaffDelivery.map((item, index) => {
                                                                return (
                                                                    <tbody key={`item-${index}`}>

                                                                        <tr >
                                                                            {item?.flag === true ?
                                                                                <td>
                                                                                    <span style={{ fontSize: "20px", color: "red" }}>
                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                    </span>
                                                                                </td>
                                                                                :
                                                                                <td></td>

                                                                            }
                                                                            <td >{(currentPage - 1) * currentLimit + index + 1}</td>

                                                                            <td>{item.id}</td>
                                                                            <td>{item.order}</td>
                                                                            <td> {item?.Warehouse?.product}</td>
                                                                            <td>
                                                                                {item?.name_customer}
                                                                                <br />
                                                                                {item?.phoneNumber_customer}
                                                                                <hr />
                                                                                <b> {t('Delivery-employer.Body.Six')}  </b>
                                                                                <br />
                                                                                {item.addressDetail},{item?.Wardcustomer?.name},{item?.Districtcustomer?.name},{item?.Provincecustomer?.name}
                                                                            </td>

                                                                            <td>
                                                                                <span style={{ color: "red", fontWeight: "700" }}>
                                                                                    {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "chưa giao hàng"}

                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                {item?.Note ? item?.Note : ""}
                                                                                <br />
                                                                                {item?.Notemore ? item?.Notemore : ""}

                                                                            </td>
                                                                            <td>
                                                                                {item?.User_Delivery ? item?.User_Delivery : "chưa ai nhận đơn"}
                                                                                <br />
                                                                                {item?.Number_Delivery ? item?.Number_Delivery : ""}

                                                                            </td>
                                                                            <td>
                                                                                {item.totalWithShippingCost} {item.unit_money}
                                                                                <br />
                                                                                <hr />
                                                                                <b>{t('Delivery-employer.Body.Fourteen')}</b>
                                                                                {item.Sub_money ?
                                                                                    <td style={{ color: "red", fontWeight: "500" }}>{item.Sub_money}</td>
                                                                                    :
                                                                                    <td> </td>

                                                                                }
                                                                            </td>
                                                                            <td style={{ color: "red", fontWeight: "700" }}>{item?.Cancel_reason ? item?.Cancel_reason : ""}</td>
                                                                            <td style={{ color: "red", fontWeight: "700" }}>{item?.Notice_Delivery ? item?.Notice_Delivery : ""}</td>


                                                                            <td>{item?.Delivery_time ? moment(`${item?.Delivery_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                            <td>{item?.DeliveryDone_time ? moment(`${item?.DeliveryDone_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                            {item.statusdelivery_id === 0
                                                                                &&
                                                                                <td>
                                                                                    <button className='btn btn-warning' onClick={() => updateDelivery(item)}>
                                                                                        {t('Delivery-employer.Body.TwentyThree')}
                                                                                    </button>
                                                                                    <br />


                                                                                </td>
                                                                            }
                                                                            {item.statusdelivery_id === 3
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "red", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentyFour')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }
                                                                            {item.statusdelivery_id === 4
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "blue", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentyFive')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }
                                                                            {item.statusdelivery_id === 1
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "blue", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentyFive')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }
                                                                            {item.statusdelivery_id === 2
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "Green", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentySix')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }

                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })
                                                            :
                                                            <tr className="table-primary">
                                                                <td colSpan={17}>
                                                                    <div className='d-flex align-item-center justify-content-center'>

                                                                        {t('Delivery-employer.Body.Eighteen')}

                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        }


                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='table-wrapper-employer-Delivery-One my-5'>
                                            <div className='container'>
                                                <div className='title-employer-Delivery-One my-3'>
                                                    {t('Delivery-employer.Body.TwentyTwo')} ({listProjectbyuserStaff.length})
                                                </div>
                                                <hr />
                                                <div style={{ overflow: "auto" }}>
                                                    <table className="table table-bordered table-body-employer-Delivery-One">
                                                        <thead>
                                                            <tr className='table-secondary' >
                                                                <th></th>

                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Two')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Three')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Four')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Five')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Seven')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Eight')}
                                                                </th>

                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Ten')}
                                                                </th>
                                                                <th scope="col" style={{ width: "120px" }}>
                                                                    {t('Delivery-employer.Body.Eleven')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Twelve')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Thirteen')}
                                                                </th>

                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Fifteen')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Sixteen')}
                                                                </th>
                                                                <th scope="col">
                                                                    {t('Delivery-employer.Body.Seventeen')}
                                                                </th>


                                                            </tr>
                                                        </thead>
                                                        {listProjectbyuserStaff && listProjectbyuserStaff.length > 0
                                                            ?
                                                            listProjectbyuserStaff.map((item, index) => {
                                                                return (
                                                                    <tbody key={`item-${index}`}>

                                                                        <tr className="table-primary">

                                                                            {item.flag === 1 ?
                                                                                <td>
                                                                                    <span style={{ fontSize: "20px", color: "red" }}>
                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                    </span>
                                                                                </td>
                                                                                :
                                                                                <td></td>

                                                                            }
                                                                            <td>{item.id}</td>
                                                                            <td>{item.order}</td>
                                                                            <td> {item?.Warehouse?.product}</td>
                                                                            <td>
                                                                                {item?.name_customer}
                                                                                <br />
                                                                                {item?.phoneNumber_customer}
                                                                                <hr />
                                                                                <b> {t('Delivery-employer.Body.Six')}  </b>
                                                                                <br />
                                                                                {item.addressDetail},{item?.Wardcustomer?.name},{item?.Districtcustomer?.name},{item?.Provincecustomer?.name}
                                                                            </td>

                                                                            <td>
                                                                                <span style={{ color: "red", fontWeight: "700" }}>
                                                                                    {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "chưa giao hàng"}

                                                                                </span>
                                                                            </td>
                                                                            <td>
                                                                                {item?.Note ? item?.Note : ""}
                                                                                <br />
                                                                                {item?.Notemore ? item?.Notemore : ""}

                                                                            </td>
                                                                            <td>
                                                                                {item?.User_Delivery ? item?.User_Delivery : "chưa ai nhận đơn"}
                                                                                <br />
                                                                                {item?.Number_Delivery ? item?.Number_Delivery : ""}

                                                                            </td>
                                                                            <td>
                                                                                {item.totalWithShippingCost} {item.unit_money}
                                                                                <br />

                                                                            </td>
                                                                            <td style={{ color: "red", fontWeight: "700" }}>{item?.Cancel_reason ? item?.Cancel_reason : ""}</td>
                                                                            <td style={{ color: "red", fontWeight: "700" }}>{item?.Notice_Delivery ? item?.Notice_Delivery : ""}</td>


                                                                            <td>{item?.Delivery_time ? moment(`${item?.Delivery_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                            <td>{item?.DeliveryDone_time ? moment(`${item?.DeliveryDone_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>

                                                                            {item.statusdelivery_id === 0
                                                                                &&
                                                                                <td>
                                                                                    <button className='btn btn-warning' onClick={() => updateDelivery(item)}>
                                                                                        {t('Delivery-employer.Body.TwentyThree')}
                                                                                    </button>
                                                                                    <br />


                                                                                </td>
                                                                            }

                                                                            {item.statusdelivery_id == 4 &&

                                                                                <td>

                                                                                    <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                                        <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                            {t('Delivery-employer.Body.TwentySeven')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                            {t('Delivery-employer.Body.TwentyFour')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                            {t('Delivery-employer.Six')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >
                                                                                            {t('Delivery-employer.Body.TwentyEight')}
                                                                                        </button>

                                                                                    </div>
                                                                                </td>
                                                                            }


                                                                            {item.statusdelivery_id === 1 && user?.account?.phone === item.Number_Delivery
                                                                                &&

                                                                                <td>

                                                                                    <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                                        <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                            {t('Delivery-employer.Body.TwentySeven')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                            {t('Delivery-employer.Body.TwentyFour')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                            {t('Delivery-employer.Six')}
                                                                                        </button>
                                                                                        <br />
                                                                                        <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >
                                                                                            {t('Delivery-employer.Body.TwentyEight')}
                                                                                        </button>

                                                                                    </div>
                                                                                </td>
                                                                            }
                                                                            {item.statusdelivery_id === 1 && user?.account?.phone !== item.Number_Delivery
                                                                                &&
                                                                                <td >
                                                                                    <span style={{ color: "blue", fontWeight: "700" }}>
                                                                                        {t('Delivery-employer.Four')}
                                                                                    </span>


                                                                                </td>
                                                                            }


                                                                            {item.statusdelivery_id === 2
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "Green", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentySix')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }

                                                                            {item.statusdelivery_id === 3
                                                                                &&
                                                                                <td>
                                                                                    <span style={{ color: "red", fontWeight: "700" }} >
                                                                                        {t('Delivery-employer.Body.TwentyFour')}
                                                                                    </span>
                                                                                    <br />


                                                                                </td>
                                                                            }
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            })
                                                            :
                                                            <tr className="table-info">
                                                                <td colSpan={17}>
                                                                    <div className='d-flex align-item-center justify-content-center'>

                                                                        <h5> {t('Delivery-employer.Body.Nineteen')} </h5>

                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        }


                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </>

                                }
                                {isSearch === true &&
                                    <div className='table-wrapper-employer-search my-5'>

                                        <div className='container'>
                                            <div className='title-employer-search my-3'>
                                                {t('Delivery-employer.Body.Twenty')} ({listProjectSearch.length})
                                            </div>
                                            <hr />
                                            <div style={{ overflow: "auto" }}>
                                                <table className="table table-bordered table-body-employer-search">
                                                    <thead>
                                                        <tr className='table-secondary'>
                                                            <th></th>

                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Two')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Three')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Four')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Five')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Seven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Eight')}
                                                            </th>

                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Ten')}
                                                            </th>
                                                            <th scope="col" style={{ width: "120px" }}>
                                                                {t('Delivery-employer.Body.Eleven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Twelve')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Thirteen')}
                                                            </th>

                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Fifteen')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Sixteen')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Delivery-employer.Body.Seventeen')}
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    {listProjectSearch && listProjectSearch.length > 0
                                                        ?
                                                        listProjectSearch.map((item, index) => {
                                                            return (
                                                                <tbody key={`item-${index}`}>

                                                                    <tr className="table-primary">

                                                                        {item.flag === 1 ?
                                                                            <td>
                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                </span>
                                                                            </td>
                                                                            :
                                                                            <td></td>

                                                                        }
                                                                        <td>{item.id}</td>
                                                                        <td>{item.order}</td>
                                                                        <td> {item?.Warehouse?.product}</td>
                                                                        <td>
                                                                            {item?.name_customer}
                                                                            <br />
                                                                            {item?.phoneNumber_customer}
                                                                            <hr />
                                                                            <b> {t('Delivery-employer.Body.Six')}  </b>
                                                                            <br />
                                                                            {item.addressDetail},{item?.Wardcustomer?.name},{item?.Districtcustomer?.name},{item?.Provincecustomer?.name}
                                                                        </td>

                                                                        <td>
                                                                            <span style={{ color: "red", fontWeight: "700" }}>
                                                                                {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "chưa giao hàng"}

                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            {item?.Note ? item?.Note : ""}
                                                                            <br />
                                                                            {item?.Notemore ? item?.Notemore : ""}

                                                                        </td>
                                                                        <td>
                                                                            {item?.User_Delivery ? item?.User_Delivery : "chưa ai nhận đơn"}
                                                                            <br />
                                                                            {item?.Number_Delivery ? item?.Number_Delivery : ""}

                                                                        </td>
                                                                        <td>
                                                                            {item.totalWithShippingCost} {item.unit_money}
                                                                            <br />

                                                                        </td>
                                                                        <td style={{ color: "red", fontWeight: "700" }}>{item?.Cancel_reason ? item?.Cancel_reason : ""}</td>
                                                                        <td style={{ color: "red", fontWeight: "700" }}>{item?.Notice_Delivery ? item?.Notice_Delivery : ""}</td>


                                                                        <td>{item?.Delivery_time ? moment(`${item?.Delivery_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                        <td>{item?.DeliveryDone_time ? moment(`${item?.DeliveryDone_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>

                                                                        {item.statusdelivery_id === 0
                                                                            &&
                                                                            <td>
                                                                                <button className='btn btn-warning' onClick={() => updateDelivery(item)}> Nhận đơn</button>
                                                                                <br />


                                                                            </td>
                                                                        }
                                                                        {item.statusdelivery_id == 4 &&

                                                                            <td>

                                                                                <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                                    <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                        {t('Delivery-employer.Body.TwentySeven')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                        {t('Delivery-employer.Body.TwentyFour')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                        {t('Delivery-employer.Six')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >
                                                                                        {t('Delivery-employer.Body.TwentyEight')}
                                                                                    </button>

                                                                                </div>
                                                                            </td>
                                                                        }


                                                                        {item.statusdelivery_id === 1 && user?.account?.phone === item.Number_Delivery
                                                                            &&

                                                                            <td>

                                                                                <div className='d-flex align-item-center justify-content-center flex-column'>
                                                                                    <button className='btn btn-success  ' onClick={() => completePickup(item)} >
                                                                                        {t('Delivery-employer.Body.TwentySeven')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-danger  my-1' onClick={() => handleShowModal(item)}>
                                                                                        {t('Delivery-employer.Body.TwentyFour')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-primary my-1' onClick={() => handleShowModalAgain(item)}>
                                                                                        {t('Delivery-employer.Six')}
                                                                                    </button>
                                                                                    <br />
                                                                                    <button className='btn btn-warning ' onClick={() => updateDelivery(item)} >
                                                                                        {t('Delivery-employer.Body.TwentyEight')}
                                                                                    </button>

                                                                                </div>
                                                                            </td>
                                                                        }
                                                                        {item.statusdelivery_id === 1 && user?.account?.phone !== item.Number_Delivery
                                                                            &&
                                                                            <td >
                                                                                <span style={{ color: "blue", fontWeight: "700" }}>
                                                                                    {t('Delivery-employer.Four')}
                                                                                </span>


                                                                            </td>
                                                                        }


                                                                        {item.statusdelivery_id === 2
                                                                            &&
                                                                            <td>
                                                                                <span style={{ color: "Green", fontWeight: "700" }} >
                                                                                    {t('Delivery-employer.Body.TwentySix')}
                                                                                </span>
                                                                                <br />


                                                                            </td>
                                                                        }

                                                                        {item.statusdelivery_id === 3
                                                                            &&
                                                                            <td>
                                                                                <span style={{ color: "red", fontWeight: "700" }} >
                                                                                    {t('Delivery-employer.Body.TwentyFour')}
                                                                                </span>
                                                                                <br />


                                                                            </td>
                                                                        }
                                                                    </tr>
                                                                </tbody>
                                                            )

                                                        }


                                                        )
                                                        :
                                                        <tr className="table-primary">
                                                            <td colSpan={15}>
                                                                <div className='d-flex align-item-center justify-content-center'>

                                                                    <h5>{t('Delivery-employer.Body.TwentyOne')}</h5>

                                                                </div>

                                                            </td>

                                                        </tr>
                                                    }

                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                }
                            </div>

                        </div>

                    </div>
                </div>


                <ModalCancelReason
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                    dataCancel={dataCancel}
                    dataAgain={dataAgain}
                    action={action}
                    fetchProjectUser={fetchProjectUser}
                    fetchProjectUserWithUsername={fetchProjectUserWithUsername}
                    select={select}
                />
            </div >

        </div >




    )


}

export default Delivery_staff;
