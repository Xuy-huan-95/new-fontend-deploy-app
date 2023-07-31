import './overview.scss'

import SidebarStaff from "../sidebar/sidebar staff"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { updateOverviewInProject, getDataSortByOverview, getDataSearchByEmplyer } from "../services/ProjectService"
import moment from "moment"
import { toast } from 'react-toastify'
import _, { debounce } from "lodash"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { getAllShippingUnit } from "../services/shippingService"

const OverviewStatusTwo = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listProjectbyStaffOverview, setListProjectbyStaffOverview] = useState([])
    const [listProjectSearch, setListProjectSearch] = useState([])
    const [isSearch, SetIsSearch] = useState(false)
    const [valueSearch, setvalueSearch] = useState("")
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

            setListProjectbyStaffOverview([])
        }
    }



    const HandleSearchData = debounce(async (value) => {
        if (!select) {
            let data = value
            setvalueSearch(value)
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, user.account.Position, +user.account.shippingUnit_Id)
                if (res && +res.EC === 0) {
                    let data = res.DT.filter(item => item.receiveMoneyId === 2)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                    }
                    setListProjectSearch(data)
                }

            } else {
                SetIsSearch(false)
                await fetchProjectUser(select)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        } else {
            let data = value
            setvalueSearch(value)
            if (data) {
                SetIsSearch(true)
                let res = await getDataSearchByEmplyer(data, user.account.Position, +select)
                if (res && +res.EC === 0) {
                    let data = res.DT.filter(item => item.receiveMoneyId === 2)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                    }
                    setListProjectSearch(data)
                }

            } else {
                SetIsSearch(false)
                await fetchProjectUser(select)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        }


    }, 200)




    const fetchProjectUser = async (select) => {
        if (!select) {
            let res = await getDataSortByOverview(+user.account.shippingUnit_Id, 2)
            if (res && +res.EC === 0) {
                setListProjectbyStaffOverview(res.DT)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        } else {
            let res = await getDataSortByOverview(+select, 2)
            if (res && +res.EC === 0) {
                setListProjectbyStaffOverview(res.DT)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        }

    }


    useEffect(() => {
        fetchProjectUser();
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }

    }, [])

    useEffect(() => {
        getShippingUnit()
    }, [])
    return (
        <div className='overview-container '>
            <div className='left-overview d-none d-lg-block   '>
                <SidebarStaff collapsed={collapsed} />

            </div>
            <div className='right-overview  '>
                <div className='btn-toggle-overview d-none d-lg-block '>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                <div className='right-body-overview'>
                    <div className='container'>
                        <div className='header-overview mt-2'>
                            <div className='container'>
                                <div className='row'>
                                    <div className='location-path-overview col-12 col-lg-6'>
                                        <Link to="/"> Home</Link>

                                        <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </span>
                                        <Link to="/Overview">Delivery</Link>
                                    </div>
                                    <div className='search-overview col-12 col-lg-6 mt-2'>
                                        <div className='search-icon-overview'>
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
                        <div className='body-overview'>
                            <div className="container">
                                <div className='name-page-overview'>
                                    <h4>
                                        {t('Accountant-employer.One')}
                                    </h4>
                                    <div className='more-overview'>
                                        <b>
                                            {user?.account?.nameUnit?.NameUnit}
                                        </b>


                                    </div>
                                    <span>
                                        {user?.account?.Position}

                                    </span>
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
                                <div className='sort_Overview my-3'>
                                    <div className='container my-3'>
                                        <div className='row mx-3'>
                                            <div className='col-12 col-lg-4 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Overview" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Accountant-employer.Two')}
                                                </Link>
                                            </div>

                                            <div className='col-12 col-lg-4 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Overview_no_status" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Accountant-employer.Three')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-4 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Overview_status-one" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Accountant-employer.Four')}
                                                </Link>
                                            </div>
                                            <div className='col-12 col-lg-4 my-2 content-Overview ' style={{ backgroundColor: "#61dafb", cursor: "pointer" }}>
                                                {t('Accountant-employer.Five')}
                                            </div>

                                            <div className='col-12 col-lg-4 content-Overview' style={{ borderBottom: "5px solid #f0f2f5", cursor: "pointer" }}>
                                                <Link to="/Overview_status-three" style={{ textDecoration: "none", color: "#474141" }}>
                                                    {t('Accountant-employer.Six')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isSearch === false &&
                                    <>

                                        <div className='table table-bordered table-wrapper-overview-One my-5'>
                                            <div className='container'>
                                                <div className='title-overview-One my-3'>
                                                    {t('Accountant-employer.Eight')} ({listProjectbyStaffOverview.length})
                                                </div>
                                                <hr />

                                                <table className="table table-bordered table-body-overview">
                                                    <thead>
                                                        <tr className='table-secondary'>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Two')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Three')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Four')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Five')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Six')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Seven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Eight')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Ten')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Eleven')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Twelve')}
                                                            </th>
                                                            <th scope="col">
                                                                {t('Accountant-employer.Body.Thirteen')}
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    {listProjectbyStaffOverview && listProjectbyStaffOverview.length > 0
                                                        ?
                                                        listProjectbyStaffOverview.map((item, index) => {
                                                            return (
                                                                <tbody key={`item-${index}`}>
                                                                    <tr>
                                                                        <td>{item.id}</td>
                                                                        <td>{item.order}</td>
                                                                        <td>
                                                                            <span>
                                                                                {item.createdByName}
                                                                            </span>
                                                                            <br />
                                                                            <span>
                                                                                {item.createdBy}

                                                                            </span>
                                                                        </td>
                                                                        {item.receiveMoneyId === 2 &&
                                                                            <td style={{ color: "blue", fontWeight: "600" }}>{item?.Statusreceivedmoney?.status ? item?.Statusreceivedmoney?.status : "Chưa xử lý"} </td>

                                                                        }

                                                                        {item.Mode_of_payment === "Nhận tiền thanh toán qua tài khoản ngân hàng" &&
                                                                            <td>
                                                                                <span>
                                                                                    <b>{t('Accountant-employer.Body.Six')}:</b> <span style={{ color: "red", fontWeight: "600" }}>{item?.Mode_of_payment ? item?.Mode_of_payment : ""}</span>
                                                                                </span>
                                                                                <br />

                                                                                <span>
                                                                                    <b>{t('Accountant-employer.Body.TwentyThree')}</b> {item?.Bank_name ? item?.Bank_name : ""}
                                                                                </span>
                                                                                <br />
                                                                                <span>
                                                                                    <b>{t('Accountant-employer.Body.TwentyFour')}</b>   {item?.name_account ? item?.name_account : ""}
                                                                                </span>
                                                                                <br />

                                                                                <span>
                                                                                    <b>{t('Accountant-employer.Body.TwentyFive')}</b>   {item?.Main_Account ? item?.Main_Account : ""}
                                                                                </span>
                                                                            </td>
                                                                        }
                                                                        {item.Mode_of_payment === "Nhận tiền thanh toán ở trung tâm" &&
                                                                            <td>
                                                                                <span>
                                                                                    <b>{t('Accountant-employer.Body.Six')} :</b> <span style={{ color: "red", fontWeight: "600" }}>{item?.Mode_of_payment ? item?.Mode_of_payment : ""}</span>
                                                                                </span>

                                                                            </td>
                                                                        }

                                                                        <td>{item.total}</td>
                                                                        <td>{item.unit_money}</td>

                                                                        <td>{item?.Overview_time ? moment(`${item?.Overview_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                        <td>{item?.OverviewDone_time ? moment(`${item?.OverviewDone_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                        <td>
                                                                            {item.User_Overview ? item.User_Overview : "chưa ai nhận đơn"}
                                                                            <br />
                                                                            {item.Number_Overview && item.Number_Overview}

                                                                        </td>


                                                                        {item.receiveMoneyId === 2 &&
                                                                            < td >

                                                                                <span className='mb-3' style={{ color: "green", fontWeight: "600" }}  >
                                                                                    {t('Accountant-employer.Body.Sixteen')}
                                                                                </span>

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

                                                                    <h5>
                                                                        {t('Accountant-employer.Body.TwentyTwo')}
                                                                    </h5>

                                                                </div>

                                                            </td>

                                                        </tr>

                                                    }




                                                </table>
                                            </div>


                                        </div>
                                    </>
                                }
                                {isSearch === true &&
                                    <div className='table-wrapper-overview-One my-5'>
                                        <div className='container'>
                                            <div className='title-overview-One my-3'>
                                                {t('Accountant-employer.Body.Eighteen')}({listProjectSearch.length})
                                            </div>
                                            <hr />

                                            <table className="table table-bordered table-body-overview">
                                                <thead>
                                                    <tr className='table-secondary'>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Two')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Three')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Four')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Five')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Six')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Seven')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Eight')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Ten')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Eleven')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Twelve')}
                                                        </th>
                                                        <th scope="col">
                                                            {t('Accountant-employer.Body.Thirteen')}
                                                        </th>


                                                    </tr>
                                                </thead>
                                                {listProjectSearch && listProjectSearch.length > 0
                                                    ?
                                                    listProjectSearch.map((item, index) => {
                                                        return (
                                                            <tbody key={`item-${index}`}>

                                                                <tr>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.order}</td>
                                                                    <td>
                                                                        <span>
                                                                            {item.createdByName}
                                                                        </span>
                                                                        <br />
                                                                        <span>
                                                                            {item.createdBy}

                                                                        </span>
                                                                    </td>
                                                                    {item.receiveMoneyId === 2 &&
                                                                        <td style={{ color: "blue", fontWeight: "600" }}>{item?.Statusreceivedmoney?.status ? item?.Statusreceivedmoney?.status : "Chưa xử lý"} </td>

                                                                    }

                                                                    {item.Mode_of_payment === "Nhận tiền thanh toán qua tài khoản ngân hàng" &&
                                                                        <td>
                                                                            <span>
                                                                                <b>{t('Accountant-employer.Body.Six')}:</b> <span style={{ color: "red", fontWeight: "600" }}>{item?.Mode_of_payment ? item?.Mode_of_payment : ""}</span>
                                                                            </span>
                                                                            <br />

                                                                            <span>
                                                                                <b>{t('Accountant-employer.Body.TwentyThree')}</b> {item?.Bank_name ? item?.Bank_name : ""}
                                                                            </span>
                                                                            <br />
                                                                            <span>
                                                                                <b>{t('Accountant-employer.Body.TwentyFour')}</b>   {item?.name_account ? item?.name_account : ""}
                                                                            </span>
                                                                            <br />

                                                                            <span>
                                                                                <b>{t('Accountant-employer.Body.TwentyFive')}</b>   {item?.Main_Account ? item?.Main_Account : ""}
                                                                            </span>
                                                                        </td>
                                                                    }
                                                                    {item.Mode_of_payment === "Nhận tiền thanh toán ở trung tâm" &&
                                                                        <td>
                                                                            <span>
                                                                                <b>{t('Accountant-employer.Body.Six')} :</b> <span style={{ color: "red", fontWeight: "600" }}>{item?.Mode_of_payment ? item?.Mode_of_payment : ""}</span>
                                                                            </span>

                                                                        </td>
                                                                    }

                                                                    <td>{item.total}</td>
                                                                    <td>{item.unit_money}</td>

                                                                    <td>{item?.Overview_time ? moment(`${item?.Overview_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                    <td>{item?.OverviewDone_time ? moment(`${item?.OverviewDone_time}`).format("DD/MM/YYYY HH:mm:ss") : ""}</td>
                                                                    <td>
                                                                        {item.User_Overview ? item.User_Overview : "chưa ai nhận đơn"}
                                                                        <br />
                                                                        {item.Number_Overview && item.Number_Overview}

                                                                    </td>


                                                                    {item.receiveMoneyId === 2 &&
                                                                        < td >

                                                                            <span className='mb-3' style={{ color: "green", fontWeight: "600" }}  >
                                                                                {t('Accountant-employer.Body.Sixteen')}
                                                                            </span>

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

                                                                <h5> {t('Accountant-employer.Body.TwentySeven')}</h5>

                                                            </div>

                                                        </td>

                                                    </tr>

                                                }




                                            </table>
                                        </div>


                                    </div>
                                }

                            </div>

                        </div>

                    </div>

                </div>


            </div >

        </div >




    )


}

export default OverviewStatusTwo;