import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './listUser.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { GetGroup, CreateNewUser, UpdateUser } from "../services/userService"
import { UpdateImageChat } from "../services/ProjectService"
import { UserContext } from "../../contexApi/UserContext"

import { toast } from 'react-toastify';
import _ from "lodash"
import getBase64 from "../commondUtils/commondUtils"
import {
    getAllProvinceCustomer, getAllProvince, fetchDistrictCustomerByProvinceCustomer, fetchWarCustomerdByDistrictCustomer
} from "../services/addressService"
import { getAllShippingUnit } from "../services/shippingService"
import { useHistory } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"

const ModalCreate = (props) => {
    let history = useHistory()
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { user } = React.useContext(UserContext);

    const { show, handleCloseCreateModal, handleCloseModalCreateone, action, dataModal, imageConvert, listUser1 } = props
    const [userGroup, setUserGroup] = useState([])
    const [allProvinceCutomer, setAllProvinceCustomer] = useState("")
    const [assignDistrictByProvince, setassignDistrictByProvince] = useState([])
    const [assignWardtByDistric, setassignWardtByDistric] = useState([])
    const [StatusProvinceCustomer, setStatusProvinceCustomer] = useState(true)
    const [StatusWardCustomer, setStatusWardCustomer] = useState(true)
    const [StatusDistrictCustomer, setStatusDistrictCustomer] = useState(true)
    const [shippingUnit, setShippingUnit] = useState([])




    const defaultUserData = {
        id: "",
        email: "",
        phone: "",
        usersname: "",
        password: "",
        address: "",
        sex: "",
        group_id: "",
        image: "",
        provincecustomer_id: "",
        districtcustomer_id: "",
        wardcustomer_id: "",
        addressDetail: "",
        Position: "",
        shippingUnit_id: ""
    }


    const ValidInputsDefault = {
        email: true,
        phone: true,
        usersname: true,
        password: true,
        address: true,
        sex: true,
        group_id: true,
        image: true,
        provincecustomer_id: true,
        districtcustomer_id: true,
        wardcustomer_id: true,
        addressDetail: true,
        Position: true,
        shippingUnit_id: true
    }

    const [userdata, setUserdata] = useState(defaultUserData)
    const [validInput, setValidInput] = useState(ValidInputsDefault)
    const [previreImage, setprevireImage] = useState("")




    useEffect(() => {


        if (action === "Update") {
            setUserdata(dataModal)
            setprevireImage(imageConvert)
            handleOnchangeProviceCustomer(dataModal.provincecustomer_id)
            handleOnchangeDistrictCustomer(dataModal.districtcustomer_id)

        }

    }, [action])



    useEffect(() => {

        if (action === "Create") {
            setUserdata(defaultUserData)
            setprevireImage("")
        }
    }, [action])

    const getAllGroup = async () => {
        let res = await GetGroup()
        if (res && +res.EC === 0) {
            setUserGroup(res.DT)
            if (res.DT && res.DT.length > 0) {
                setUserdata({ ...userdata })
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleOnchangeInput = async (value, name) => {
        let _userdata = _.cloneDeep(userdata)
        _userdata[name] = value

        if (_userdata["group_id"] == 2) {
            _userdata[name] = value
            _userdata["Position"] = ""
            _userdata["shippingUnit_id"] = ""

        }

        if (_userdata["group_id"] == 3) {
            _userdata[name] = value
            _userdata["Position"] = ""
            _userdata["shippingUnit_id"] = ""

        }

        if (name === "image") {
            let file = value[0]
            if (file) {
                let base64 = await getBase64(file)
                const objectUrl = URL.createObjectURL(file)
                setprevireImage(objectUrl)
                _userdata["image"] = base64
            }

        }

        setUserdata(_userdata)
    }

    const getProvinceCustomer = async () => {
        let res = await getAllProvinceCustomer()
        if (res && +res.EC === 0) {
            setAllProvinceCustomer(res.DT)

        } else {
            toast.error(res.EM)
        }
    }
    const handleOnchangeProviceCustomer = async (value) => {
        if (value) {

            let res = await fetchDistrictCustomerByProvinceCustomer(value)


            if (res && +res.EC === 0) {

                setassignDistrictByProvince(res?.DT)
            }

        }
    }
    const handleOnchangeDistrictCustomer = async (value) => {
        if (value) {

            let res = await fetchWarCustomerdByDistrictCustomer(value)
            if (res && +res.EC === 0) {

                setassignWardtByDistric(res?.DT
                )

            }


        }
    }


    const handleSelectProvinceCustomer = (value) => {

        if (value > 0) {
            setStatusProvinceCustomer(true)
            setStatusDistrictCustomer(false)
        }
        if (value === "Tỉnh/thành phố") {
            setStatusProvinceCustomer(false)
            setStatusDistrictCustomer(false)

        }

        if (+value == userdata?.Districtcustomer?.provincecustomer_id) {
            setStatusDistrictCustomer(true)
        }

    }
    const handleSelectDistrictCustomer = (value) => {
        if (value > 0) {

            setStatusDistrictCustomer(true)
            setStatusWardCustomer(false)

        }
        if (value === "Quận/huyện") {
            setStatusDistrictCustomer(false)
            setStatusWardCustomer(false)

        }
        if (+value == userdata?.Wardcustomer?.districtcustomer_id) {
            setStatusWardCustomer(true)
        }
    }
    const handleSelectWardCustomer = (value) => {

        if (value > 0) {
            setStatusWardCustomer(true)

        } else {
            setStatusWardCustomer(false)


        }
    }

    const checkValueDate = () => {
        if (action === "Update") return true
        setValidInput(ValidInputsDefault)





        let arr = ["email", "phone", "password", "addressDetail", "group_id"]
        let check = true
        let regx = /\S+@\S+\.\S+/;

        if (userdata[arr[4]] === 1 && !userdata["Position"]) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.Position = false
            setValidInput(_validInput)
            toast.error("please enter Position user")
            return;
        }

        if (userdata[arr[4]] === 1 && !userdata["shippingUnit_id"]) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.shippingUnit_id = false
            setValidInput(_validInput)
            toast.error("please enter shipping Unit user")
            return;
        }



        if (!regx.test(userdata[arr[0]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[0]] = false
            setValidInput(_validInput)
            toast.error("please enter a valid email address")

            return false

        }


        let regxPhone = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/;
        if (!regxPhone.test(userdata[arr[1]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[1]] = false
            setValidInput(_validInput)
            toast.error("please enter a valid Phone Number")

            return false

        }

        for (let i = 0; i < arr.length; i++) {
            if (!userdata[arr[i]]) {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput)
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break
            }
            if (userdata[arr[i]] && !userdata["provincecustomer_id"]) {
                setStatusProvinceCustomer(false)
                toast.error("please check Province customer address")
                return;
            }
        }


        return check


    }

    const handleConfirmUser = async () => {
        if (action === "Update") {
            if (!userdata["addressDetail"]) {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput["addressDetail"] = false
                setValidInput(_validInput)
                toast.error("please enter a addressDetail")

                return
            }
            if (userdata["group_id"] === 1 && userdata["Position"] === "Đơn vị") {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput.Position = false
                setValidInput(_validInput)
                toast.error("please enter Position user")
                return;
            }
            if (userdata["group_id"] === 1 && !userdata["Position"]) {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput.Position = false
                setValidInput(_validInput)
                toast.error("please enter Position user")
                return;
            }

            if (userdata["group_id"] === 1 && userdata["shippingUnit_id"] === "Đơn vị") {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput.shippingUnit_id = false
                setValidInput(_validInput)
                toast.error("please enter shipping Unit user")
                return;
            }
            if (userdata["group_id"] === 1 && !userdata["shippingUnit_id"]) {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput.shippingUnit_id = false
                setValidInput(_validInput)
                toast.error("please enter shipping Unit user")
                return;
            }
        }
        if (StatusProvinceCustomer === false) {
            toast.error("please check Province customer address")
            return;
        }
        if (StatusDistrictCustomer === false) {
            toast.error("please check District  customer address")
            return;
        }

        if (StatusWardCustomer === false) {
            toast.error("please check Ward customer address")
            return;
        }
        let check = checkValueDate();



        if (check === true) {
            let res =
                action === "Create"
                    ?
                    await CreateNewUser(userdata)
                    :
                    await UpdateUser(userdata)
            if (res && +res.EC === 0) {
                await UpdateImageChat({
                    name: userdata.usersname,
                    phone: userdata.phone,
                    image: userdata.image

                })
                toast.success("create success")
                setUserdata({
                    ...defaultUserData,

                })

                handleCloseModale()
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_id, "Dev")
                }



            }
            if (res && +res.EC !== 0) {
                toast.error(res.EM)
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput[res.DT] = false
                setValidInput(_validInput)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_id, "Dev")
                }
            }
        }
    }


    const handleCloseModale = async () => {


        handleCloseCreateModal()

        if (action === "Create") {
            setprevireImage("")
            setUserdata(defaultUserData)

        } else {
            setprevireImage(imageConvert)
            setUserdata(dataModal)

        }
        if (action === "Create") {
            setUserdata(defaultUserData)
        }
        setValidInput(ValidInputsDefault)
    }
    const getShippingUnit = async () => {
        let res = await getAllShippingUnit()
        if (res && +res.EC === 0) {
            setShippingUnit(res.DT)

        } else {
            toast.error(res.EM)
        }
    }


    useEffect(() => {
        getAllGroup()
        getProvinceCustomer()
        getShippingUnit()
    }, [])
    return (
        <>


            <Modal show={show} onHide={() => handleCloseModale()} size="lg" className='modal-user' backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title> {action === "Create" ? `${t('Created-user.One')}` : `${t('Created-user.Two')}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label >
                                {t('Created-user.Three')}
                                (<span className='red'>*</span>)</label>
                            {action === 'Create' &&
                                < input
                                    type="email"
                                    className={validInput.email ? "form-control" : "form-control is-invalid"}
                                    value={userdata.email}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                                />
                            }
                            {action === 'Update' &&
                                < input
                                    disabled
                                    type="email"
                                    className={validInput.email ? "form-control" : "form-control is-invalid"}
                                    value={userdata.email}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                                />
                            }
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label >
                                {t('Created-user.Four')}
                                {/* (<span className='red'>*</span> */}
                            </label>
                            <input
                                type="text" className='form-control'
                                value={userdata.usersname}
                                onChange={(event) => handleOnchangeInput(event.target.value, "usersname")}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label >
                                {t('Created-user.Five')}
                                (<span className='red'>*</span>)</label>
                            <input
                                disabled={action === 'Create' ? false : true}
                                type="text"
                                className={validInput.phone ? "form-control" : "form-control is-invalid"}
                                value={userdata.phone}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phone")}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'Create' &&
                                <>

                                    <label >
                                        {t('Created-user.Six')}
                                        (<span className='red'>*</span>)</label>
                                    <input
                                        type="password"
                                        className={validInput.password ? "form-control" : "form-control is-invalid"}
                                        value={userdata.password}
                                        onChange={(event) => handleOnchangeInput(event.target.value, "password")}

                                    />
                                </>
                            }

                        </div>
                        {userdata.group_id == 2 || userdata.group_id == 3 ?
                            <></>
                            :
                            <div className='col-12 col-sm-6 form-group'>
                                <label >
                                    {t('Created-user.Seven')}
                                    (<span className='red'>*</span>)</label>
                                <select
                                    className={validInput.Position ? "form-control" : "form-control is-invalid"}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "Position")}
                                    value={userdata.Position}
                                >
                                    <option value="Đơn vị">Lựa chọn chức vụ</option>
                                    <option value="Nhân viên lấy hàng">Nhân viên lấy hàng</option>
                                    <option value="Nhân viên kho hàng">Nhân viên kho hàng</option>
                                    <option value="Nhân viên giao hàng">Nhân viên giao hàng</option>
                                    <option value="Nhân viên kế toán">Nhân viên kế toán</option>
                                    <option value="Trưởng bộ phận lấy hàng">Trưởng bộ phận lấy hàng</option>
                                    <option value="Trưởng bộ phận kho hàng">Trưởng bộ phận kho hàng</option>
                                    <option value="Trưởng bộ phận giao hàng">Trưởng bộ phận giao hàng</option>
                                    <option value="Trưởng bộ phận kế toán">Trưởng bộ phận kế toán</option>
                                </select >
                            </div>

                        }


                        {userdata.group_id == 2 || userdata.group_id == 3 ?
                            <></>
                            :
                            <div className='col-12 col-sm-6 form-group'>
                                <label >
                                    {t('Created-user.Eight')}
                                </label>
                                <select
                                    className={validInput.shippingUnit_id ? "form-control" : "form-control is-invalid"}
                                    onChange={(event) => handleOnchangeInput(event.target.value, "shippingUnit_id")}
                                    value={userdata.shippingUnit_id}



                                >
                                    <option value="Đơn vị">Lựa chọn đơn vị công tác</option>


                                    {shippingUnit && shippingUnit.length > 0 &&
                                        shippingUnit.map((item, index) => {
                                            return (
                                                <option key={`Province - ${index}`} value={item.id}>{item.NameUnit}</option>

                                            )
                                        })
                                    }


                                </select >

                            </div>}

                        <div className='col-12 col-sm-12 form-group'>

                            <label className='col-4'>
                                {t('Created-user.Night')}
                            </label>

                            <select
                                className={StatusProvinceCustomer === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                onChange={(event) => {
                                    handleSelectProvinceCustomer(event.target.value);
                                    handleOnchangeProviceCustomer(event.target.value);
                                    handleOnchangeInput(event.target.value, "provincecustomer_id")
                                }}

                                value={userdata.provincecustomer_id}


                            >
                                <option value="Tỉnh/thành phố">Tỉnh/thành phố</option>
                                {allProvinceCutomer && allProvinceCutomer.length > 0 &&
                                    allProvinceCutomer.map((item, index) => {
                                        return (
                                            <option key={`Province - ${index}`} value={item.id}>{item.name}</option>

                                        )
                                    })
                                }
                            </select >




                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label className='col-4'>
                                {t('Created-user.Ten')}
                            </label>

                            <select
                                className={StatusDistrictCustomer === true ? "form-select my-2" : "form-select my-2 is-invalid"}

                                onChange={(event) => {
                                    handleSelectDistrictCustomer(event.target.value);
                                    handleOnchangeDistrictCustomer(event.target.value);
                                    handleOnchangeInput(event.target.value, "districtcustomer_id")
                                }}
                                value={userdata.districtcustomer_id}

                            >
                                <option value="Quận/huyện">Quận/huyện</option>
                                {assignDistrictByProvince && assignDistrictByProvince.length > 0
                                    &&
                                    assignDistrictByProvince.map((item, index) => {
                                        return (
                                            <option key={`District - ${index}`} value={item?.Districtcustomers?.id}>{item?.Districtcustomers?.name}</option>

                                        )
                                    })
                                }
                            </select >
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label className='col-4'>
                                {t('Created-user.Eleven')}
                            </label>

                            <select
                                className={StatusWardCustomer === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                onChange={(event) => {
                                    handleSelectWardCustomer(event.target.value);
                                    handleOnchangeInput(event.target.value, "wardcustomer_id");

                                }
                                }
                                value={userdata.wardcustomer_id}


                            >
                                <option value="Phường/xã">Phường/xã</option>
                                {assignWardtByDistric && assignWardtByDistric.length > 0 &&
                                    assignWardtByDistric.map((item, index) => {
                                        return (
                                            <option key={`Ward - ${index}`} value={item?.Wardcustomers?.id}>{item?.Wardcustomers?.name}</option>

                                        )
                                    })
                                }
                            </select >
                        </div>
                        <div className='col-12 col-sm-12 '>
                            <label className='col-4'>
                                {t('Created-user.Twelve')}
                            </label>

                            <input

                                id='input-total-product'
                                type="text"
                                className={validInput.addressDetail ? "form-control" : "form-control is-invalid"}
                                placeholder='địa chỉ chi tiết '
                                value={userdata.addressDetail}
                                onChange={(event) => handleOnchangeInput(event.target.value, "addressDetail")}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label >
                                {t('Created-user.Thirteen')}
                            </label>
                            <select className='form-select'
                                onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                                value={userdata.sex}


                            >
                                <option defaultValue="...">...</option>

                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other" >Other</option>


                            </select >
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label >
                                {t('Created-user.Fourteen')}
                                (<span className='red'>*</span>)</label>
                            <select
                                className={validInput.group_id ? "form-select" : "form-select is-invalid"}
                                onChange={(event) => handleOnchangeInput(event.target.value, "group_id")}
                                value={userdata.group_id}
                            >
                                {action === 'Create' && <option defaultValue="0">select group user</option>}


                                {userGroup && userGroup.length > 0 &&
                                    userGroup.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>

                                        )
                                    })}



                            </select >
                        </div>
                        <div className='col-12 col-sm-12 form-group py-3 image'>
                            <div className='image-icon'>
                                <input type="file" id='previewimage' hidden
                                    onChange={(event) => handleOnchangeInput(event.target.files, "image")}
                                />
                                <label htmlFor="previewimage" className='Update-image '>Upload Image <i className="fa fa-upload" aria-hidden="true"></i>
                                </label>

                            </div>
                            {action === "Create" ?
                                <div className='preview-image ' style={{ backgroundImage: `url(${previreImage})` }}></div>
                                :
                                <div className='preview-image ' style={{ backgroundImage: `url(${previreImage})` }}></div>

                            }
                        </div>


                    </div >


                </Modal.Body >
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmUser()} >
                        {action === 'Create' ? `${t('Created-user.sixteen')}` : `${t('Created-user.seventeen')}`}
                    </Button>
                    <Button variant="secondary" onClick={() => handleCloseModale()}>
                        {t('Created-user.eighteen')}
                    </Button>

                </Modal.Footer>
            </Modal >
        </>
    );
}


export default ModalCreate
