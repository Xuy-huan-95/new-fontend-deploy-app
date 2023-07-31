import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import './modalviewNotification.scss'
import { UpdateStatusNotification, checkExist } from "./services/ProjectService"
import { UserContext } from "../contexApi/UserContext"
import { NotificationContext } from "../contexApi/NotificationContext"

import moment from "moment"
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';


const ModalViewNotification = (props) => {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    const { show, handleShowNotificationModal } = props
    const { user } = React.useContext(UserContext);
    const { list, getALlListNotification, listStaff, listAdmin } = React.useContext(NotificationContext);
    const [showStatusNoSee, setShowStatusNoSee] = useState(false)
    const [ListFillterNosee, setListFillterNosee] = useState("")
    const [listStaffFillterNosee, setlistStaffFillterNosee] = useState("")
    const [listDevFillterNosee, setlistDevFillterNosee] = useState("")

    const handleViewProductStaff = async (item) => {
        let res = await checkExist(item)
        if (res && +res.EC === 0) {
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thêm mới") {
                history.push(`/Pick_up_no_status`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thay đổi địa chỉ người bán") {
                history.push(`/Pickup_staff`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "người tạo vừa chat") {
                history.push(`/order-processing`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đang lấy hàng") {
                history.push(`/Pick_up_status_one`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đã lấy thành công") {
                history.push(`/Pick_up_status_two`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng trì hoãn") {
                history.push(`/Pick_up_no_status`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn gấp") {
                history.push(`/Pickup_staff`)
            }
            if (user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "huỷ đơn gấp") {
                history.push(`/Pickup_staff`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã lấy thành công") {
                history.push(`/Warehouse_no_status`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn gấp") {
                history.push(`/Warehouse_staff`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "huỷ đơn gấp") {
                history.push(`/Warehouse_staff`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã nhập kho") {
                history.push(`/Warehouse_status_one`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn nhập kho") {
                history.push(`/Warehouse_no_status`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã xuất kho") {
                history.push(`/Warehouse_status_two`)
            }
            if (user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn") {
                history.push(`/Warehouse_staff`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đã xuất kho") {
                history.push(`/Delivery_no_status`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn gấp") {
                history.push(`/Delivery_staff`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "huỷ đơn gấp") {
                history.push(`/Delivery_staff`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đang giao") {
                history.push(`/Delivery_status_one`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng trì hoãn giao") {
                history.push(`/Delivery_no_status`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao xong") {
                history.push(`/Delivery_status_two`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao lại") {
                history.push(`/Delivery_status_four`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "người tạo vừa chat") {
                history.push(`/order-processing`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng hủy giao") {
                history.push(`/Delivery_status_three`)
            }
            if (user.account.Position === "Nhân viên giao hàng" && item.Change_content === "thay đổi địa chỉ người nhận") {
                history.push(`/Delivery_staff`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng giao xong") {
                history.push(`/Overview_no_status`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đang đối soát") {
                history.push(`/Overview_status-one`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng chuyển khoản") {
                history.push(`/Overview_status-two`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng tiền mặt") {
                history.push(`/Overview_status-three`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "thay đổi thông tin đơn hàng") {
                history.push(`/order-processing`)
            }
            if (user.account.Position === "Nhân viên kế toán" && item.Change_content === "người tạo vừa chat") {
                history.push(`/order-processing`)
            }
            handleShowNotificationModal()
        } else {
            toast.error("This notices no longer exists in List ")
        }

    }
    const handleViewProduct = async (item) => {
        let res = await checkExist(item)
        if (res && +res.EC === 0) {
            history.push(`/detailProduct/${item.project_id}`)
            handleShowNotificationModal()
        } else {
            toast.error("This notices no longer exists in List")
        }

    }
    const UpdateStatusProduct = async (item) => {
        let data = {
            id: item.id,
            positon: user?.account?.groupName,
        }
        let res = await UpdateStatusNotification(data)
        if (res && +res.EC === 0) {
            setShowStatusNoSee(false)
        }

    }
    const RenderNoSeeCutomer = () => {
        let data = list.filter(item => item.ViewByuser === "0")
        setListFillterNosee(data)

    }
    const RenderNoSeeStaff = () => {
        let data = listStaff.filter(item => item.ViewByStaff === "0")
        setlistStaffFillterNosee(data)

    }
    const RenderNoSeeDev = () => {
        let data = listAdmin.filter(item => item.ViewByStaff === "0")
        console.log("listAdmin", listAdmin)
        setlistDevFillterNosee(data)

    }
    useEffect(() => {
        RenderNoSeeCutomer()
        RenderNoSeeStaff()
        RenderNoSeeDev()
    }, [showStatusNoSee])
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingunit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(0, "Dev")
        }
    }, [show])

    return (
        <>
            <Modal show={show} onHide={handleShowNotificationModal} animation={false} size='lg' >

                <div className='notification-Container'>
                    <div className='container'>
                        <div className='title mb-3'> <span >{t('Notifications.Three')}</span> <span className='mx-2'>-</span>
                            {user?.account?.groupName === "Customer" && (list.length)}
                            {user?.account?.groupName === "Staff" && (listStaff.length)}
                            {user?.account?.groupName === "Dev" && (listAdmin.length)}

                        </div>
                        {showStatusNoSee === false ?
                            <div className='button mb-3'>
                                <span className='item-One' style={{ backgroundColor: "aqua" }}>
                                    {t('Notifications.One')}
                                </span>

                                <span className='item-Two' onClick={() => setShowStatusNoSee(true)}>
                                    {t('Notifications.Two')}
                                </span>
                            </div>
                            :
                            <div className='button mb-3'>
                                <span className='item-One' onClick={() => setShowStatusNoSee(false)} >
                                    {t('Notifications.One')}
                                </span>

                                <span className='item-Two' style={{ backgroundColor: "aqua" }} >
                                    {t('Notifications.Two')}
                                </span>
                            </div>
                        }

                        <hr />
                        {showStatusNoSee === false &&
                            <div className='content'>
                                <div className='container'>
                                    {user?.account?.groupName === "Dev" && listAdmin && listAdmin.length > 0
                                        &&
                                        listAdmin.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        <>
                                                            <div onClick={() => {
                                                                history.push("/listuser"); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                            }}>
                                                                <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                </span>}  {t('Notifications.Six')} <b>{item.CreatedBy} </b>  </span>
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>






                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {!user.account.Position && user?.account?.groupName === "Customer" && list && list.length > 0
                                        &&
                                        list.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>

                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang lấy hàng" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>

                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}
                                                                        {t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.Two')} <b>{item.Order}</b></span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />
                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'> {+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.twentyOne')}  <b>{item.Order}</b> {t('Notifications.Customer.twentyTwo')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Three')} <b>{item.Order}</b> </span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã nhập kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Five')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên vừa chat" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Six')} {item.ChangeBy}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn nhập kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Seven')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Eight')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang giao" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Night')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn giao" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Ten')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Eleven')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang đối soát" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Twelve')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đối soát xong bằng chuyển khoản" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Thirteen')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đối soát xong bằng tiền mặt" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Thirteen')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng giao lại" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3' >{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} </span><b>{item.Order}</b> {t('Notifications.Customer.Fourteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng hủy giao" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} </span><b>{item.Order}</b> {t('Notifications.Customer.fifteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên chuyển trạng tái sang bình thường" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.sixteen')}</span><b>{item.Order} </b> {t('Notifications.Customer.seventeen')} <b>{t('Notifications.Customer.eighteen')}</b> {t('Notifications.Customer.nineteen')} <b>{t('Notifications.Customer.twenty')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên chuyển trạng tái sang gấp" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.sixteen')}</span><b>{item.Order} </b> {t('Notifications.Customer.seventeen')} <b>{t('Notifications.Customer.twenty')}</b> {t('Notifications.Customer.nineteen')} <b>{t('Notifications.Customer.eighteen')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                    </div >
                                                </div>
                                            )
                                        })

                                    }

                                    {user.account.Position === "Nhân viên lấy hàng" && listStaff && listStaff.length > 0
                                        &&
                                        listStaff.map((item, index) => {
                                            return (
                                                <div >
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thêm mới" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thay đổi địa chỉ người bán" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Three')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Four')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đang lấy hàng" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Six')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Seven')}</span><b>{item.Order}</b> {t('Notifications.Pickup.Eight')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Night')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Ten')} <b>{t('Notifications.Pickup.Eleven')}</b>  {t('Notifications.Pickup.Twelve')} <b>{t('Notifications.Pickup.Thirteen')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Ten')} <b>{t('Notifications.Pickup.Thirteen')}</b> {t('Notifications.Pickup.Twelve')} <b>{t('Notifications.Pickup.Eleven')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }


                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên kho hàng" && listStaff && listStaff.length > 0
                                        &&
                                        listStaff.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Three')} <b>{t('Notifications.Warehouse.Four')}  </b>{t('Notifications.Warehouse.Five')} <b>{t('Notifications.Warehouse.Six')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Three')} <b>{t('Notifications.Warehouse.Six')}</b> {t('Notifications.Warehouse.Five')} <b>{t('Notifications.Warehouse.Four')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã nhập kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Eight')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn nhập kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.Seven')}<b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Night')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Ten')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')}</span><b>{item.Order} {t('Notifications.Warehouse.Eleven')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }



                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên giao hàng" && listStaff && listStaff.length > 0
                                        &&
                                        listStaff.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Three')} <b>{t('Notifications.Delivery.Four')} </b>{t('Notifications.Delivery.Five')}  <b>{t('Notifications.Delivery.Six')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Three')} <b>{t('Notifications.Delivery.Six')}</b> {t('Notifications.Delivery.Five')} <b>{t('Notifications.Delivery.Four')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đang giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Eight')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng trì hoãn giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Night')} </span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Ten')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao lại" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Twelve')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Thirteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Fourteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng hủy giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.fifteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "thay đổi địa chỉ người nhận" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.sixteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên kế toán" && listStaff && listStaff.length > 0
                                        &&
                                        listStaff.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.One')}</span><b>{item.Order}</b> {t('Notifications.Accountant.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đang đối soát" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Four')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng chuyển khoản" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Five')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng tiền mặt" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Five')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "thay đổi thông tin đơn hàng" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.One')}</span><b>{item.Order} </b> {t('Notifications.Accountant.Six')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Accountant.One')}</span><b>{item.Order}</b> {t('Notifications.Accountant.Seven')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user && user?.account?.groupName === "Customer" && list.length === 0 &&
                                        <div className='Not-Found'>{t('Notifications.Four')} </div >

                                    }
                                    {user && user?.account?.groupName === "Staff" && listStaff.length === 0 &&
                                        <div className='Not-Found'> {t('Notifications.Four')} </div >

                                    }
                                    {user && user?.account?.groupName === "Dev" && listAdmin.length === 0 &&
                                        <div className='Not-Found'> {t('Notifications.Four')} </div >

                                    }
                                    {user.isAuthenticated === false &&
                                        < div className='Not-Found'> {t('Notifications.Five')} </div >

                                    }
                                </div >

                            </div >
                        }
                        {showStatusNoSee === true &&
                            <div className='content'>
                                <div className='container'>
                                    {user?.account?.groupName === "Dev" && listDevFillterNosee && listDevFillterNosee.length > 0
                                        &&
                                        listDevFillterNosee.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        <>
                                                            <div onClick={() => {
                                                                history.push("/listuser"); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                            }}>
                                                                <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                </span>}
                                                                    {t('Notifications.Six')} <b>{item.CreatedBy} </b>
                                                                </span>
                                                                <br />
                                                                <span className='time'>
                                                                    {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                </span>
                                                            </div>
                                                            <hr />

                                                        </>






                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {!user.account.Position && user?.account?.groupName === "Customer" && ListFillterNosee && ListFillterNosee.length > 0
                                        &&
                                        ListFillterNosee.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>

                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang lấy hàng" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>

                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}
                                                                        {t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.Two')} <b>{item.Order}</b></span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />
                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'> {+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.twentyOne')}  <b>{item.Order}</b> {t('Notifications.Customer.twentyTwo')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Three')} <b>{item.Order}</b> </span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã nhập kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Five')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên vừa chat" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Six')} {item.ChangeBy}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn nhập kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Seven')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Eight')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang giao" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b>  {t('Notifications.Customer.Night')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng trì hoãn giao" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Ten')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Eleven')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đang đối soát" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Twelve')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đối soát xong bằng chuyển khoản" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Thirteen')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng đối soát xong bằng tiền mặt" &&
                                                            <>

                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} <b>{item.Order}</b> {t('Notifications.Customer.Thirteen')}</span>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>

                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng giao lại" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3' >{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} </span><b>{item.Order}</b> {t('Notifications.Customer.Fourteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "đơn hàng hủy giao" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.Four')} </span><b>{item.Order}</b> {t('Notifications.Customer.fifteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên chuyển trạng tái sang bình thường" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.sixteen')}</span><b>{item.Order} </b> {t('Notifications.Customer.seventeen')} <b>{t('Notifications.Customer.eighteen')}</b> {t('Notifications.Customer.nineteen')} <b>{t('Notifications.Customer.twenty')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user?.account?.groupName === "Customer" && item.Change_content === "nhân viên chuyển trạng tái sang gấp" &&
                                                            <>
                                                                <div onClick={() => { handleViewProduct(item); UpdateStatusProduct(item) }}>
                                                                    <span className='mx-3'>{+item.ViewByuser === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Customer.One')} <b>{item.ChangeBy}</b> {t('Notifications.Customer.sixteen')}</span><b>{item.Order} </b> {t('Notifications.Customer.seventeen')} <b>{t('Notifications.Customer.twenty')}</b> {t('Notifications.Customer.nineteen')} <b>{t('Notifications.Customer.eighteen')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                    </div >
                                                </div>
                                            )
                                        })

                                    }

                                    {user.account.Position === "Nhân viên lấy hàng" && listStaffFillterNosee && listStaffFillterNosee.length > 0
                                        &&
                                        listStaffFillterNosee.map((item, index) => {
                                            return (
                                                <div >
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thêm mới" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "thay đổi địa chỉ người bán" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Three')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Four')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đang lấy hàng" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Six')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Seven')}</span><b>{item.Order}</b> {t('Notifications.Pickup.Eight')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.Five')} <b>{item.ChangeBy}</b> {t('Notifications.Pickup.Night')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Ten')} <b>{t('Notifications.Pickup.Eleven')}</b>  {t('Notifications.Pickup.Twelve')} <b>{t('Notifications.Pickup.Thirteen')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên lấy hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Pickup.One')} </span><b>{item.Order}</b> {t('Notifications.Pickup.Ten')} <b>{t('Notifications.Pickup.Thirteen')}</b> {t('Notifications.Pickup.Twelve')} <b>{t('Notifications.Pickup.Eleven')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }


                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên kho hàng" && listStaffFillterNosee && listStaffFillterNosee.length > 0
                                        &&
                                        listStaffFillterNosee.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã lấy thành công" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Three')} <b>{t('Notifications.Warehouse.Four')}  </b>{t('Notifications.Warehouse.Five')} <b>{t('Notifications.Warehouse.Six')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.One')} </span><b>{item.Order}</b> {t('Notifications.Warehouse.Three')} <b>{t('Notifications.Warehouse.Six')}</b> {t('Notifications.Warehouse.Five')} <b>{t('Notifications.Warehouse.Four')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã nhập kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Eight')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn nhập kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Warehouse.Seven')}<b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Night')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Warehouse.Ten')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kho hàng" && item.Change_content === "đơn hàng trì hoãn" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Warehouse.One')}</span><b>{item.Order} {t('Notifications.Warehouse.Eleven')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }



                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên giao hàng" && listStaffFillterNosee && listStaffFillterNosee.length > 0
                                        &&
                                        listStaffFillterNosee.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đã xuất kho" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Three')} <b>{t('Notifications.Delivery.Four')} </b>{t('Notifications.Delivery.Five')}  <b>{t('Notifications.Delivery.Six')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "huỷ đơn gấp" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Three')} <b>{t('Notifications.Delivery.Six')}</b> {t('Notifications.Delivery.Five')} <b>{t('Notifications.Delivery.Four')}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng đang giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Eight')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng trì hoãn giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Night')} </span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Delivery.Seven')} <b>{item.ChangeBy}</b> {t('Notifications.Delivery.Ten')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng giao lại" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.Twelve')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Thirteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.Fourteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "đơn hàng hủy giao" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.fifteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên giao hàng" && item.Change_content === "thay đổi địa chỉ người nhận" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Delivery.One')}</span><b>{item.Order}</b> {t('Notifications.Delivery.sixteen')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }

                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user.account.Position === "Nhân viên kế toán" && listStaffFillterNosee && listStaffFillterNosee.length > 0
                                        &&
                                        listStaffFillterNosee.map((item, index) => {
                                            return (

                                                <div>
                                                    <div className='notifiaction_content my-3 mx-3 ' key={`item-${index}`}>
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng giao xong" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.One')}</span><b>{item.Order}</b> {t('Notifications.Accountant.Two')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đang đối soát" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Four')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng chuyển khoản" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Five')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "đơn hàng đối soát xong bằng tiền mặt" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.Three')} <b>{item.ChangeBy}</b> {t('Notifications.Accountant.Five')}</span><b>{item.Order}</b>
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "thay đổi thông tin đơn hàng" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>} {t('Notifications.Accountant.One')}</span><b>{item.Order} </b> {t('Notifications.Accountant.Six')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                        {user.account.Position === "Nhân viên kế toán" && item.Change_content === "người tạo vừa chat" &&
                                                            <>
                                                                <div onClick={() => {
                                                                    handleViewProductStaff(item); handleShowNotificationModal(); UpdateStatusProduct(item)
                                                                }}>
                                                                    <span className='mx-3'>{+item.ViewByStaff === 0 && <span style={{ color: "red" }}><i className="fa fa-bell" aria-hidden="true"></i>
                                                                    </span>}{t('Notifications.Accountant.One')}</span><b>{item.Order}</b> {t('Notifications.Accountant.Seven')}
                                                                    <br />
                                                                    <span className='time'>
                                                                        {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}
                                                                    </span>
                                                                </div>
                                                                <hr />

                                                            </>
                                                        }
                                                    </div>
                                                </div >

                                            )
                                        })

                                    }
                                    {user && user?.account?.groupName === "Customer" && ListFillterNosee.length === 0 &&
                                        <div className='Not-Found'> {t('Notifications.Seven')} </div >

                                    }
                                    {user && user?.account?.groupName === "Staff" && listStaffFillterNosee.length === 0 &&
                                        <div className='Not-Found'> {t('Notifications.Seven')} </div >

                                    }
                                    {user && user?.account?.groupName === "Dev" && listDevFillterNosee.length === 0 &&
                                        <div className='Not-Found'> {t('Notifications.Seven')} </div >

                                    }
                                    {user.isAuthenticated === false &&
                                        < div className='Not-Found'> {t('Notifications.Five')}  </div >

                                    }


                                </div >

                            </div >
                        }

                    </div>
                </div >

            </Modal >
        </>
    );
}

export default ModalViewNotification;