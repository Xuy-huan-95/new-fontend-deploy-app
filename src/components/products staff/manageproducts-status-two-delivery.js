import './manageproducts.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getProjectWithPaginationWithALlStatusDelivery, getAllStatusProductWithEmployer, getDataSearchByEmplyer } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"
import moment from "moment"
import { toast } from 'react-toastify'
import _, { debounce } from "lodash"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { getAllShippingUnit } from "../services/shippingService"

const ManageproductsDeliveryStatusTwo = (props) => {
    let history = useHistory()
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyUnit, setListProjectbyUnit] = useState([])
    const [listProjectbyUnitLenght, setListProjectbyUnitLenghtt] = useState("0")

    const [isSearch, SetIsSearch] = useState(false)
    const [listProjectSearch, setListProjectSearch] = useState([])
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("infomation Page employer eight") ? localStorage.getItem("infomation Page employer eight") : 1

    )
    const [currentLimit, setCurrentLimit] = useState(6)
    const [totalPage, setTotalPage] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [dataChatOne, setDataChatOnet] = useState([])
    const [dataNumber, setdataNumber] = useState([])
    const [shipping, setShipping] = useState([])
    const [shippingUnit, setShippingUnit] = useState([])
    const [select, setSelect] = useState("")

    const getShippingUnit = async () => {
        let res = await getAllShippingUnit()
        if (res && +res.EC === 0) {
            setShipping(res.DT)

        } else {
            toast.error(res.EM)

        }
    }

    const RenderforDev = async (item) => {

        if (item > 0) {
            setSelect(item)

            await fetchProjectUser(item)
            await fetchAllNumberProject(item)
        }
        if (item === "Lựa chọn đơn vị giao hàng") {
            setSelect("")

            setListProjectbyUnit([])
            setdataNumber([])
            setListProjectbyUnitLenghtt("0")
        }
    }
    const HandleSearchData = debounce(async (value) => {
        if (!select) {
            let data = value
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, "", +user.account.shippingunit_id)
                if (res && +res.EC === 0) {
                    let results = res.DT.filter(item => item.statusdelivery_id === 2)

                    setListProjectSearch(results)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }

            } else {
                SetIsSearch(false)
                await fetchAllNumberProject()
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        } else {
            let data = value
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, "", +select)
                if (res && +res.EC === 0) {
                    setListProjectSearch(res.DT)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                }

            } else {
                SetIsSearch(false)
                await fetchAllNumberProject()
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        }


    }, 200)


    const handleShowModal = async (item) => {
        setShowModal(!showModal)
        setDataChatOnet(item)
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
    }

    const fetchAllNumberProject = async (item) => {
        if (!item) {
            let res = await getAllStatusProductWithEmployer(+user.account.shippingunit_id)
            if (res && +res.EC === 0) {
                setdataNumber(res.DT[0])
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
            let res = await getAllStatusProductWithEmployer(+item)
            if (res && +res.EC === 0) {
                setdataNumber(res.DT[0])
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


    const fetchProjectUser = async (item) => {
        if (!item) {
            let res = await getProjectWithPaginationWithALlStatusDelivery(currentPage, currentLimit, +user.account.shippingunit_id, 2
            )
            if (res && +res.EC === 0) {
                setTotalPage(+res.DT.totalPage)
                if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                    setCurrentPage(+res.DT.totalPage)
                    await getProjectWithPaginationWithALlStatusDelivery(+res.DT.totalPage, currentLimit, +user.account.shippingunit_id, 2
                    )
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
                        setListProjectbyUnitLenghtt(res.DT.totalProject)
                        setListProjectbyUnit(data)
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
                    setListProjectbyUnitLenghtt(res.DT.totalProject)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                    setListProjectbyUnit(data)

                }
            }
        } else {
            let res = await getProjectWithPaginationWithALlStatusDelivery(currentPage, currentLimit, +item, 2)
            if (res && +res.EC === 0) {
                setTotalPage(+res.DT.totalPage)
                if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                    setCurrentPage(+res.DT.totalPage)
                    await getProjectWithPaginationWithALlStatusDelivery(+res.DT.totalPage, currentLimit, +item, 2)
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
                        setListProjectbyUnitLenghtt(res.DT.totalProject)
                        setListProjectbyUnit(data)
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
                    setListProjectbyUnitLenghtt(res.DT.totalProject)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                    setListProjectbyUnit(data)

                }
            }
        }

    }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
        localStorage.setItem("infomation Page employer eight", +event.selected + 1)
    }

    useEffect(() => { getShippingUnit() }, [])

    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
        fetchAllNumberProject();
        fetchProjectUser();
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', currentPage);
        currentUrlParams.set("limit", currentLimit);

        history.push(window.location.pathname + "?" + currentUrlParams.toString());
    }, [currentPage])
    const fetchProjectUserAfterRefesh = async () => {
        let currentPagelocalStorage = +localStorage.getItem("infomation Page employer eight")
        let res = await getProjectWithPaginationWithALlStatusDelivery(+currentPagelocalStorage, currentLimit, +user.account.shippingunit_id, 2
        )
        if (res && +res.EC === 0) {
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPaginationWithALlStatusDelivery(+res.DT.totalPage, currentLimit, +user.account.shippingunit_id, 2
                )
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
                    setListProjectbyUnitLenghtt(res.DT.totalProject)
                    setListProjectbyUnit(data)
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
                setListProjectbyUnitLenghtt(res.DT.totalProject)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
                setListProjectbyUnit(data)

            }
        }
    }
    useEffect(() => {
        window.history.pushState('', '', `?page=${localStorage.getItem("infomation Page employer eight")}&limit=${currentLimit}`);
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingunit_id, "Dev")
        }
        fetchProjectUserAfterRefesh()
    }, [window.location.reload])

    return (
        <div className='employer-container '>
            <div className='left-employer d-none d-lg-block '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-employer  '>
                <div className='btn-toggle-employer d-none d-lg-block'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-employer'>
                    <div className='container'>
                        <div className='header-employer'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='location-path-employer my-2 col-12 col-lg-6'>
                                        <Link to="/"> Home</Link>

                                        <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </span>
                                        <Link to="/order-processing">Order-processing </Link>
                                    </div>
                                    <div className='col-12 col-lg-6 search-employer'>
                                        <div className='search-icon-employer'>
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
                        <div className='body-employer'>
                            <div className="container">
                                <div className='name-page-employer'>
                                    <h4>
                                        {t('Manage-employer.One')}
                                    </h4>
                                    <div className='more-employer'>
                                        <b>{user?.account?.nameUnit?.NameUnit}</b>
                                    </div>
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
                                <div className='sort my-3'>
                                    <div className='container my-3'>
                                        <div className='row mx-3'>
                                            <div className='col-12 col-lg-4 my-2 content ' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/order-processing" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Three')} ({dataNumber.allNum})</Link>
                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_No_Pickup" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Four')} ({dataNumber.no_pick_up})</Link>
                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_Picking" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Five')} ({dataNumber.picking_up})</Link>
                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_pick_ok" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Six')} ({dataNumber.pickupOk})</Link>
                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_No_Warehouse" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Seven')} ({dataNumber.no_warehouse}) </Link>

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_Warehouse_status_one" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Eight')} ({dataNumber.warehouseStatusOne})</Link>

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_Warehouse_status_two" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.thirteen')} ({dataNumber.warehouseStatusTwo}) </Link>

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_No_delivery" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Night')} ({dataNumber.No_delivery})</Link>

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_delivery_One" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Ten')} ({dataNumber.deliveryStatusOne}) </Link>

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}>
                                                {t('Manage-employer.Eleven')} ({dataNumber.delivery_ok})

                                            </div>
                                            <div className='col-12 col-lg-4 content' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Manageproducts_delivery_Three" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Manage-employer.Twelve')} ({dataNumber.delivery_cancel})
                                                </Link>

                                            </div>


                                        </div>
                                    </div>
                                </div>
                                {isSearch === false &&
                                    <div className='table-wrapper-employer-one'>
                                        <div className='container'>
                                            <div className='title-employer-one my-3'>
                                                {t('Manage-employer.Body.Tittle-twentySeven')} ({listProjectbyUnitLenght})</div>
                                            <hr />
                                            <div className='sub-tittle d-none d-lg-block'>
                                                <div className='container'>

                                                    <div className='row'>

                                                        <div className='sub-left   '>
                                                            <div className=' mx-3' style={{ color: "red" }}><i className="fa fa-flag" aria-hidden="true"></i>
                                                            </div>
                                                            <div className='NameColor'>
                                                                {t('Manage-employer.Body.Tittle-One')}                                                        </div>

                                                        </div>
                                                        <div className='sub-right '>
                                                            < ReactPaginate
                                                                nextLabel="next >"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={2}
                                                                marginPagesDisplayed={2}
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
                                            <div className='sub-tittle-mobile d-block d-lg-none'>
                                                <div className='container'>

                                                    <div className='row'>

                                                        <div className='sub-left-mobile col-12   '>
                                                            <div className=' mx-3' style={{ color: "red" }}><i className="fa fa-flag" aria-hidden="true"></i>
                                                            </div>
                                                            <div className='NameColor'>
                                                                {t('Manage-employer.Body.Tittle-One')}                                                        </div>

                                                        </div>
                                                        <div className='sub-right-mobile col-12 mt-2 '>
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
                                                <table className="table table-bordered">

                                                    <thead>
                                                        <tr className='table-secondary'>

                                                            <th></th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Two')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Three')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Four')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Five')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Six')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Seven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Eight')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Night')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Ten')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Eleven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Twelve')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-thirteen')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-fourteen')}
                                                            </th>



                                                        </tr>
                                                    </thead>
                                                    {listProjectbyUnit && listProjectbyUnit.length > 0
                                                        ?
                                                        listProjectbyUnit.map((item, index) => {
                                                            return (

                                                                <tbody key={`item-${index}`}>
                                                                    <tr className="table-info">
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
                                                                            {item.quantity}/{item.unit}
                                                                        </td>
                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                        <td> {item?.name_customer}</td>
                                                                        <td>
                                                                            <span >
                                                                                {item?.Statuspickup?.status ? item?.Statuspickup?.status : "chưa lấy hàng"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_PickUp && item.Number_PickUp &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_PickUp}-{item.Number_PickUp}</b>
                                                                                </span>

                                                                            }


                                                                        </td>

                                                                        <td>

                                                                            <span >
                                                                                {item?.Statuswarehouse?.status ? item?.Statuswarehouse?.status : "chưa xử lý"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Warehouse && item.Number_Warehouse
                                                                                &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Warehouse}-{item.Number_Warehouse}</b>
                                                                                </span>

                                                                            }


                                                                        </td>
                                                                        <td>
                                                                            <span style={{ color: "red" }}>
                                                                                {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "chưa giao hàng"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Delivery && item.Number_Delivery &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Delivery}-{item.Number_Delivery}</b>
                                                                                </span>

                                                                            }

                                                                        </td>
                                                                        <td>
                                                                            <span >
                                                                                {item?.Statusreceivedmoney?.status ? item?.Statusreceivedmoney?.status : "chưa thanh toán "}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Overview && item.Number_Overview &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Overview}-{item.Number_Overview} </b>
                                                                                </span>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {item?.createdByName}
                                                                            <br />
                                                                            {item?.createdBy}
                                                                        </td>                                                                    <td>

                                                                            <span className='mx-2' style={{ color: "blue", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal(item)}>
                                                                                <i className="fa fa-comments" aria-hidden="true"></i>

                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            )
                                                        })
                                                        :
                                                        <tr className="table-info">
                                                            <td colSpan={14}>
                                                                <div className='d-flex align-item-center justify-content-center'>

                                                                    <h5>
                                                                        {t('Manage-employer.Body.Tittle-sixteen')}
                                                                    </h5>
                                                                </div>

                                                            </td>

                                                        </tr>
                                                    }

                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                }
                                {isSearch === true &&
                                    <div className='table-wrapper-employer-one'>
                                        <div className='container'>
                                            <div className='title-employer-one my-3'>Kết quả tìm kiếm ({listProjectSearch.length})</div>
                                            <hr />
                                            <div style={{ overflow: "auto" }}>
                                                <table className="table table-bordered">

                                                    <thead>
                                                        <tr className='table-secondary'>

                                                            <th></th>

                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Three')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Four')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Five')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Six')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Seven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Eight')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Night')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Ten')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Eleven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-Twelve')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-thirteen')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Manage-employer.Body.Tittle-fourteen')}
                                                            </th>



                                                        </tr>
                                                    </thead>
                                                    {listProjectSearch && listProjectSearch.length > 0
                                                        ?
                                                        listProjectSearch.map((item, index) => {
                                                            return (

                                                                <tbody key={`item-${index}`}>
                                                                    <tr className="table-info">
                                                                        {item?.flag === true ?
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
                                                                            {item.quantity}/{item.unit}
                                                                        </td>
                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                        <td> {item?.name_customer}</td>
                                                                        <td>
                                                                            <span >
                                                                                {item?.Statuspickup?.status ? item?.Statuspickup?.status : "chưa lấy hàng"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_PickUp && item.Number_PickUp &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_PickUp}-{item.Number_PickUp}</b>
                                                                                </span>

                                                                            }


                                                                        </td>

                                                                        <td>

                                                                            <span >
                                                                                {item?.Statuswarehouse?.status ? item?.Statuswarehouse?.status : "chưa xử lý"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Warehouse && item.Number_Warehouse
                                                                                &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Warehouse}-{item.Number_Warehouse}</b>
                                                                                </span>

                                                                            }


                                                                        </td>
                                                                        <td>
                                                                            <span style={{ color: "red" }}>
                                                                                {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "chưa giao hàng"}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Delivery && item.Number_Delivery &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Delivery}-{item.Number_Delivery}</b>
                                                                                </span>

                                                                            }

                                                                        </td>
                                                                        <td>
                                                                            <span >
                                                                                {item?.Statusreceivedmoney?.status ? item?.Statusreceivedmoney?.status : "chưa thanh toán "}
                                                                            </span>
                                                                            <br />
                                                                            {item.User_Overview && item.Number_Overview &&
                                                                                <span>
                                                                                    {t('Manage-employer.Body.Tittle-fifteen')}
                                                                                    <br />
                                                                                    <b>{item.User_Overview}-{item.Number_Overview} </b>
                                                                                </span>
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {item?.createdByName}
                                                                            <br />
                                                                            {item?.createdBy}
                                                                        </td>                                                                    <td>

                                                                            <span className='mx-2' style={{ color: "blue", cursor: "pointer" }} title='Nhắn tin với Người tạo đơn' onClick={() => handleShowModal(item)}>
                                                                                <i className="fa fa-comments" aria-hidden="true"></i>

                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            )
                                                        })
                                                        :
                                                        <tr className="table-info">
                                                            <td colSpan={14}>
                                                                <div className='d-flex align-item-center justify-content-center'>

                                                                    <h5>
                                                                        {t('Manage-employer.Body.Tittle-eighteen')}
                                                                    </h5>
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

                <ModalChatWithCutomer
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                    dataChatOne={dataChatOne}
                />
            </div >

        </div >




    )


}

export default ManageproductsDeliveryStatusTwo;