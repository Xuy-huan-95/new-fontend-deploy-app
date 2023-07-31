import './Delivery_staff.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getDataSearchByEmplyer, updateDeliveryInProject, getDataSortByDelivery, getProjectWithPaginationWithEmployerDelivery_user, createNotification } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalChatWithCutomer from "./modalChatWithCutomer"
import { toast } from 'react-toastify'
import moment from "moment"
import _, { debounce } from "lodash"
import ModalCancelReason from "./modal_cancel_reason"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { getAllShippingUnit } from "../services/shippingService"

const DeliveryStatusFour = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [isSearch, SetIsSearch] = useState(false)
    const [listProjectbyStaffDelivery, setListProjectbyStaffDelivey] = useState([])

    const [listProjectSearch, setListProjectSearch] = useState([])
    const [valueSearch, setvalueSearch] = useState("")
    const [showModal, SetshowModal] = useState(false)
    const [action, setAction] = useState(0)
    const [dataCancel, setDataCancel] = useState([])
    const [dataAgain, setDataAgain] = useState([])
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
        setSelect(item)
        if (item > 0) {
            await fetchProjectUser(item)
        }
        if (item === "Lựa chọn đơn vị giao hàng") {
            setSelect("")

            setListProjectbyStaffDelivey([])
        }
    }

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



    const completePickup = async (item) => {
        if (!select) {
            let res = await updateDeliveryInProject(item.id, +user.account.shippingunit_id, 2, user.account.usersname, user.account.phone, "", "", item.Delivery_time, new Date(), "")
            if (res && +res.EC === 0) {
                let abc = await createNotification(item.id, item.order, "đơn hàng giao xong", `${user.account.usersname}-${user.account.phone}`, item.createdBy, 0, 0, item.shippingUnit_Id)
                if (abc && +abc.EC === 0) {
                    await fetchProjectUser(select)
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
                    await fetchProjectUser(select)
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



    const HandleSearchData = debounce(async (value) => {
        if (!select) {
            let data = value
            setvalueSearch(value)
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, user.account.Position, +user.account.shippingunit_id)
                if (res && +res.EC === 0) {
                    let data = res.DT.filter(item => item.statusdelivery_id === 1 && item.Notice_Delivery !== "")

                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                    setListProjectSearch(data)
                }

            } else {
                SetIsSearch(false)
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
                    let data = res.DT.filter(item => item.statusdelivery_id === 1 && item.Notice_Delivery !== "")

                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingunit_id, "Dev")
                    }
                    setListProjectSearch(data)
                }

            } else {
                SetIsSearch(false)
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




    const fetchProjectUser = async (select) => {
        if (!select) {
            let res = await getDataSortByDelivery(+user.account.shippingunit_id, 1)
            if (res && +res.EC === 0) {
                let data = res.DT.filter(item => item.Notice_Delivery !== "")
                setListProjectbyStaffDelivey(data)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingunit_id, "Dev")
                }
            }
        } else {
            let res = await getDataSortByDelivery(+select, 1)
            if (res && +res.EC === 0) {
                let data = res.DT.filter(item => item.Notice_Delivery !== "")
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


    useEffect(() => {
        fetchProjectUser();
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingunit_id, "Dev")
        }

    }, [])

    useEffect(() => {
        getShippingUnit()
    }, [])
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
                                            <div className='col-12 col-lg-3 content-Delivery' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Delivery_staff" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Two')}
                                                </Link>
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
                                                <Link to="/Delivery_status_two" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Delivery-employer.Five')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-3 my-2 content-Delivery ' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}>
                                                {t('Delivery-employer.Six')}
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
                                    <div className='table-wrapper-employer-Delivery my-5'>
                                        <div className='container'>
                                            <div className='title-employer-Delivery my-2'>
                                                {t('Delivery-employer.Eight')} ({listProjectbyStaffDelivery.length})
                                            </div>
                                            <hr />
                                            <div className='sub-title-employer-Delivery my-2'>
                                                <div className='sub-left '>
                                                    <div className=' mx-3' style={{ color: "red" }}><i className="fa fa-flag" aria-hidden="true"></i>
                                                    </div>
                                                    <div className='NameColor'>
                                                        {t('Delivery-employer.Night')}
                                                    </div>

                                                </div>

                                            </div>
                                            <div style={{ overflow: "auto" }}>

                                                <table className="table table-bordered table-body-employer-Delivery">
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
                                                    {listProjectbyStaffDelivery && listProjectbyStaffDelivery.length > 0
                                                        ?
                                                        listProjectbyStaffDelivery.map((item, index) => {
                                                            return (
                                                                <tbody key={`item-${index}`}>

                                                                    <tr >
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

                                                                        {item.statusdelivery_id === 1 && item.User_Delivery === user.account.usersname && item.Number_Delivery === user.account.phone
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



                                                                                </div>
                                                                            </td>

                                                                        }


                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        })
                                                        :

                                                        <tr className="table-info">
                                                            <td colSpan={14}>
                                                                <div className='d-flex align-item-center justify-content-center'>

                                                                    <h5> {t('Delivery-employer.Body.Eighteen')}</h5>

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

                                                                    <tr>

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
                                                                        {item.statusdelivery_id === 1 && item.User_Delivery === user.account.usersname && item.Number_Delivery === user.account.phone
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



                                                                                </div>
                                                                            </td>

                                                                        }





                                                                    </tr>
                                                                </tbody>
                                                            )

                                                        }


                                                        )
                                                        :
                                                        <tr className="table-primary">
                                                            <td colSpan={14}>
                                                                <div className='d-flex align-item-center justify-content-center'>

                                                                    <h5> {t('Delivery-employer.Body.TwentyOne')}</h5>

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


            </div >
            <ModalCancelReason
                showModal={showModal}
                handleShowModal={handleShowModal}
                dataCancel={dataCancel}
                dataAgain={dataAgain}
                action={action}
                fetchProjectUser={fetchProjectUser}
                select={select}

            />
        </div >




    )


}
export default DeliveryStatusFour;