import './Profile.scss'

import { Link, NavLink, useHistory } from "react-router-dom"
import { GetProfile, UpdateUser } from "../components/services/userService"
import { UserContext } from "../contexApi/UserContext"
import React, { useEffect, useState } from 'react'
import moment from "moment"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { UpdateImageChat } from "../components/services/ProjectService"
import { fetchDistrictCustomerByProvinceCustomer, fetchWarCustomerdByDistrictCustomer, getAllProvinceCustomer } from "../components/services/addressService"
import { toast } from 'react-toastify';
import getBase64 from "../components/commondUtils/commondUtils"
import { useTranslation, Trans } from 'react-i18next';

import _ from "lodash"
const Profile = (props) => {
    const { user } = React.useContext(UserContext);
    const [data, setData] = useState("")
    const [dataDefaut, setDataDefaut] = useState("")
    const { t, i18n } = useTranslation();

    const [isOpen, setIsOpen] = useState(false)
    const [previewsImage, setPreviewsImage] = useState("")
    const [editName, setEditName] = useState(false)
    const [image, setImage] = useState([])
    const [imageUpdate, setImageUpdate] = useState("")

    const [editSex, setEditSex] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [assignDistrictByProvince, setassignDistrictByProvince] = useState([])
    const [allProvinceCutomer, setAllProvinceCustomer] = useState([])
    const [assignWardtByDistric, setassignWardtByDistric] = useState([])
    const [newImgae, setNewImgae] = useState("")
    const [editImage, setEditImage] = useState(false)

    let getProfile = async () => {
        let res = await GetProfile(user?.account?.phone)
        if (res && +res.EC === 0) {
            console.log(res.DT)
            setData(res.DT)
            setDataDefaut(res.DT)
            let imagebase64 = ""
            if (res.DT.image) {
                imagebase64 = new Buffer(res.DT.image, "base64").toString("binary")
                setImage(imagebase64)
            }
        }

    }


    const [isValidProvince, setisValidProvince] = useState(true)
    const [isValidDistrict, setisValidDistrict] = useState(true)
    const [isValidWard, setisValidWard] = useState(true)
    const [isValidDetailAddress, setisValidDetailAddress] = useState(true)
    const [isValidName, setisValidName] = useState(true)



    const handleSelectProvinceCustomer = (value) => {
        if (value > 0) {
            setisValidProvince(true)
            setisValidDistrict(false)
        }
        if (value === "Tỉnh/thành phố") {
            setisValidProvince(false)
            setisValidDistrict(false)

        }

        if (+value == data.Districtcustomer.provincecustomer_id) {
            setisValidDistrict(true)
        }

    }


    const handleSelectDistrictCustomer = (value) => {
        if (value > 0) {

            setisValidDistrict(true)
            setisValidWard(false)

        } else {
            setisValidDistrict(false)
            setisValidWard(false)

        }
        if (+value == data.Wardcustomer.districtcustomer_id) {
            setisValidWard(true)
        }
    }

    const handleSelectWardCustomer = (value) => {

        if (value > 0) {
            setisValidWard(true)

        } else {
            setisValidWard(false)
        }
    }

    const getProvinceCustomer = async () => {
        let res = await getAllProvinceCustomer()
        if (res && +res.EC === 0) {
            setAllProvinceCustomer(res.DT)

        } else {
            toast.error(res.EM)

        }
    }
    useEffect(() => {
        getProvinceCustomer()

    }, [])


    const UpdateProfile = async () => {

        if (!data?.usersname) {
            toast.error("Empty usersname !!!!")
            setisValidName(false)
            return;
        }
        if (isValidProvince === false) {
            toast.error("Please check Province address !!!!")
            return;
        }
        if (isValidDistrict === false) {
            toast.error("Please check District address !!!!")
            return;
        }
        if (isValidWard === false) {
            toast.error("Please check Ward address !!!!")
            return;
        }
        if (!data.addressDetail) {
            setisValidDetailAddress(false)
            toast.error("Empty Address detail !!!!")
            return;
        }
        if (!imageUpdate) {
            let res = await UpdateUser({ ...data, image: image })

            if (res && +res.EC === 0) {
                await UpdateImageChat({
                    phone: data.phone,
                    image: image

                })
                toast.success("create success")
                await getProfile()

                setEditName(false)
                setEditSex(false)
                setEditAddress(false)
                setEditImage(false)
                setisValidName(true)
                setisValidDetailAddress(true)
            } else {
                toast.error(res.EM)
            }
        }


        if (imageUpdate) {
            let res = await UpdateUser({ ...data, image: imageUpdate })
            if (res && +res.EC === 0) {
                await UpdateImageChat({
                    phone: data.phone,
                    image: imageUpdate

                })
                await getProfile()

                setEditName(false)
                setEditSex(false)
                setEditAddress(false)
                setEditImage(false)
                setisValidName(true)
                setisValidDetailAddress(true)


            }
        }
    }
    useEffect(() => {
        if (editAddress === true) {
            handleOnchangeProviceCustomer(data?.Province_customerId)
            handleOnchangeDistrictCustomer(data?.District_customerId)

        }
    }, [editAddress])


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

                setassignWardtByDistric(res?.DT)

            }
        }
    }


    const handleOnchangeInput = async (value, name) => {
        let _data = _.cloneDeep(data)
        _data[name] = value
        if (name === "image") {
            let file = value[0]
            if (file) {
                setEditImage(true)
                let base64 = await getBase64(file)
                const objectUrl = URL.createObjectURL(file)
                setNewImgae(objectUrl)
                _data["image"] = base64
                setImageUpdate(base64)
            }
        }
        setData(_data)

    }

    const handleClickImage = (imagebase64) => {
        if (!imagebase64) return;
        if (newImgae) {
            setPreviewsImage(newImgae)

        } else {
            setPreviewsImage(imagebase64)

        }
        setIsOpen(true)
    };

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        handleOnchangeProviceCustomer(data?.provincecustomer_id)
        handleOnchangeDistrictCustomer(data?.districtcustomer_id)
        console.log("data", data)

    }, [data])

    return (
        <div className='Profile-container '>
            <div className='container'>
                <div className='location-path-Profile my-3 mx-2'>
                    <Link to="/"> Home</Link>

                    <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </span>
                    <Link to="/Profile">
                        Profile
                    </Link>

                </div>
                <div className='row'>
                    <div className='Title mb-3 '>
                        {t('Profile.One')}
                    </div>
                    <div className='profile-body '>
                        <div className='row'>

                            <div className='left col-lg-5 col-12'>
                                <div className='container'>


                                    {editImage === false
                                        ?
                                        <>

                                            <div className='image my-3' onClick={() => handleClickImage(image)}>
                                                {image
                                                    ?
                                                    <img src={image} alt="" />
                                                    :
                                                    <div>
                                                        {t('Profile.Two')}

                                                    </div>

                                                }
                                            </div>
                                            <div className='title'>

                                                <input type="file" id='previewimage' hidden
                                                    onChange={(event) => handleOnchangeInput(event.target.files, "image")}
                                                    onClick={() => { setEditName(false); setEditSex(false); setEditAddress(false) }}
                                                />
                                                <label
                                                    style={{ cursor: "pointer" }}
                                                    htmlFor="previewimage" className='Update-image '>
                                                    <span className='mx-2'>
                                                        {t('Profile.Three')}

                                                    </span>
                                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                                </label>

                                            </div>
                                        </>
                                        :
                                        <>

                                            <div className='image my-3' onClick={() => handleClickImage(image)}>
                                                <img src={newImgae} alt="Avata" />
                                            </div>
                                            <div className='d-flex align-item-center justify-content-center'>
                                                <button className='btn btn-success btn' title='Save' onClick={() => UpdateProfile()}>
                                                    <i className="fa fa-check" aria-hidden="true"></i>

                                                </button>
                                                <button className='btn btn-danger mx-2 btn' title='Exit' onClick={() => setEditImage(false)} >
                                                    <i className="fa fa-times" aria-hidden="true"></i>


                                                </button>
                                            </div>

                                        </>

                                    }
                                </div>

                            </div>

                            <div className='right col-lg-6 col-12' >
                                <div className='Infomation'>
                                    <div className="container">
                                        <div className='row'>
                                            {editName === false
                                                ?
                                                <>
                                                    <div className="item my-3">

                                                        <span className='my-3 d-flex d-flex align-items-center'>
                                                            <span className='item-user mx-1'>
                                                                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                            </span>
                                                            <span className='mx-1 '>
                                                                {t('Profile.Four')}
                                                            </span>
                                                        </span>
                                                        <span className='d-flex align-items-center'>
                                                            <span className='color-item address-wrap' >{data.usersname}</span>



                                                            <button className='btn btn-warning edit-profile mx-2'
                                                                onClick={() => { setEditName(true); setEditSex(false); setEditAddress(false) }}
                                                                title='Edit'>
                                                                <i className="fa fa-pencil" aria-hidden="true"></i>

                                                            </button>








                                                        </span>

                                                    </div>
                                                </>
                                                :
                                                <div className='container'>
                                                    <div className='row item my-3'>
                                                        <div className='col-12'>
                                                            <div className='d-flex mt-3' style={{ fontSize: "25px" }} >
                                                                <span className='mx-1 address-wrap item-user' >
                                                                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                                                                </span>
                                                                <span className='mx-1'>
                                                                    {t('Profile.Four')}
                                                                </span>
                                                            </div>

                                                            <div className='item-edit'>
                                                                <input
                                                                    id='input-number-product '
                                                                    type="text"
                                                                    className={isValidName === false ? "form-control  my-3 mx-3 is-invalid" : "form-control  my-3 mx-3"}
                                                                    value={data?.usersname}
                                                                    onChange={(event) => handleOnchangeInput(event.target.value, "usersname")}


                                                                />

                                                                <div className='d-flex'>
                                                                    <button className='btn btn-success btn' title='Save' onClick={() => UpdateProfile()}>
                                                                        <i className="fa fa-check" aria-hidden="true"></i>

                                                                    </button>
                                                                    <button className='btn btn-danger mx-2 btn' title='Exit' onClick={() => { setEditName(false); setData(dataDefaut) }}>
                                                                        <i className="fa fa-times" aria-hidden="true"></i>


                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>


                                            }


                                            <div className="item my-3">
                                                <span className='my-3'>
                                                    <span className='item-phone mx-1'>
                                                        <i className="fa fa-phone" aria-hidden="true"></i>

                                                    </span>
                                                    <span className='mx-1'>
                                                        {t('Profile.Five')}
                                                    </span>
                                                </span>
                                                <span>
                                                    <span className='mx-3 color-item'>{data.phone}</span>

                                                </span>

                                            </div>
                                            {editSex === false
                                                ?
                                                <>

                                                    <div className="item my-3">
                                                        <span className='my-3'>
                                                            <span className='item-Sex mx-1'>
                                                                <i className="fa fa-venus-mars" aria-hidden="true"></i>


                                                            </span>
                                                            <span className='mx-1'>
                                                                {t('Profile.Six')}

                                                            </span>
                                                        </span>
                                                        <span>
                                                            <span className='mx-3 color-item'>{data.sex}</span>
                                                            <button className='btn btn-warning edit-profile mx-2' onClick={() => { setEditSex(true); setEditName(false); setEditAddress(false) }}>
                                                                <i className="fa fa-pencil" aria-hidden="true"></i>

                                                            </button>
                                                        </span>

                                                    </div>
                                                </>
                                                :
                                                <div className='container'>
                                                    <div className='row item my-3'>
                                                        <div className='col-12'>
                                                            <div className='d-flex mt-3' style={{ fontSize: "25px" }} >
                                                                <span className='mx-2 address-wrap item-Sex'>
                                                                    <i className="fa fa-venus-mars" aria-hidden="true"></i>
                                                                </span>
                                                                <span className='mx-3'>
                                                                    {t('Profile.Six')}

                                                                </span>

                                                            </div>

                                                            <div className='item-edit my-3'>
                                                                <select className='form-select'
                                                                    onChange={(event) => handleOnchangeInput(event.target.value, "sex")}
                                                                    value={data.sex}


                                                                >
                                                                    <option defaultValue="...">...</option>

                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                    <option value="Other" >Other</option>


                                                                </select >

                                                                <div className='d-flex mx-2'>
                                                                    <button className='btn btn-success btn' title='Save' onClick={() => UpdateProfile()}>
                                                                        <i className="fa fa-check" aria-hidden="true"></i>

                                                                    </button>
                                                                    <button className='btn btn-danger mx-2 btn' title='Exit' onClick={() => { setEditSex(false); setData(dataDefaut) }}>
                                                                        <i className="fa fa-times" aria-hidden="true"></i>


                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>
                                            }
                                            <div className="item my-3">
                                                <span className='my-3  d-flex'>
                                                    <span className='item-Mail mx-1'>
                                                        <i className="fa fa-envelope" aria-hidden="true"></i>



                                                    </span>
                                                    <span className='mx-1'>
                                                        {t('Profile.Seven')}

                                                    </span>
                                                </span>
                                                <span className='d-flex align-items-center'>
                                                    <span className='mx-3 color-item address-wrap'>{data.email}</span>

                                                </span>

                                            </div>
                                            <div className="item my-3">
                                                <span className='my-3'>
                                                    <span className='item-Group mx-1'>
                                                        <i className="fa fa-thumb-tack" aria-hidden="true"></i>



                                                    </span>
                                                    <span >
                                                        {t('Profile.Eight')}

                                                    </span>
                                                </span>
                                                <span>
                                                    <span className='mx-3 color-item'>{data?.Group?.name}</span>

                                                </span>

                                            </div>
                                            {editAddress === false
                                                ?
                                                <div className="item my-3">
                                                    <div className='row'>
                                                        <span className='my-2 d-flex col-12 '>
                                                            <span className='item-Address mx-1'>
                                                                <i className="fa fa-location-arrow" aria-hidden="true"></i>
                                                            </span>
                                                            <span className='mx-1'>
                                                                {t('Profile.Night')}

                                                            </span>
                                                        </span>
                                                        <span className='mx-2 mb-3 d-flex align-items-center justify-content-between '>
                                                            <span className='mx-3 color-item address-wrap'>{data?.addressDetail},{data?.Wardcustomer?.name},{data?.Districtcustomer?.name},{data.Provincecustomer?.name}</span>
                                                            <button className='btn btn-warning edit-profile mx-3' onClick={() => {
                                                                setEditAddress(true); setEditSex(false); setEditName(false)
                                                            }} >
                                                                <i className="fa fa-pencil" aria-hidden="true"></i>

                                                            </button>
                                                        </span>

                                                    </div>
                                                </div>

                                                :
                                                <div className='container'>
                                                    <div className='row item my-3'>
                                                        <div className='col-12'>
                                                            <div className='d-flex mt-3 '  >
                                                                <span className='mx-2 address-wrap item-Address' >
                                                                    <i className="fa fa-location-arrow" aria-hidden="true"></i>
                                                                </span>
                                                                <span className='mx-3'>
                                                                    {t('Profile.Night')}
                                                                </span>

                                                            </div>
                                                            <div className='row'>


                                                                <div className='item-edit'>
                                                                    <div className='item-edit-address col-9'>
                                                                        <select
                                                                            className={isValidProvince === true ? "form-select my-2 " : " form-select my-2  is-invalid"}
                                                                            onChange={(event) => {
                                                                                handleSelectProvinceCustomer(event.target.value);
                                                                                handleOnchangeProviceCustomer(event.target.value);
                                                                                handleOnchangeInput(event.target.value, "provincecustomer_id")
                                                                            }
                                                                            }

                                                                            value={data.provincecustomer_id}

                                                                        >
                                                                            <option value="Tỉnh/thành phố">Tỉnh/thành phố</option>
                                                                            {allProvinceCutomer && allProvinceCutomer.length > 0
                                                                                ?
                                                                                allProvinceCutomer.map((item, index) => {
                                                                                    return (
                                                                                        <option key={`Province - ${index}`} value={item?.id}>{item?.name}</option>

                                                                                    )
                                                                                })
                                                                                :
                                                                                <option value={data.provincecustomer_id} >{data.Provincecustomer.name}</option>

                                                                            }
                                                                        </select >
                                                                        <select
                                                                            className={isValidDistrict === true ? "form-select my-2 mx-2" : "form-select my-2 mx-2 is-invalid"}
                                                                            onChange={(event) => {
                                                                                handleSelectDistrictCustomer(event.target.value);

                                                                                handleOnchangeDistrictCustomer(event.target.value);
                                                                                handleOnchangeInput(event.target.value, "districtcustomer_id")
                                                                            }
                                                                            }

                                                                            value={data.districtcustomer_id}

                                                                        >
                                                                            <option value="Quận/huyện">Quận/huyện</option>
                                                                            {assignDistrictByProvince && assignDistrictByProvince.length > 0
                                                                                ?
                                                                                assignDistrictByProvince.map((item, index) => {
                                                                                    return (
                                                                                        <option key={`District - ${index}`} value={item?.Districtcustomers?.id}>{item?.Districtcustomers?.name}</option>

                                                                                    )
                                                                                })
                                                                                :
                                                                                <option value={data.districtcustomer_id} >{data.Districtcustomer.name}</option>

                                                                            }
                                                                        </select >
                                                                        <select
                                                                            className={isValidWard === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                                            onChange={(event) => {
                                                                                handleOnchangeInput(event.target.value, "wardcustomer_id");
                                                                                handleSelectWardCustomer(event.target.value)
                                                                            }

                                                                            }

                                                                            value={data.wardcustomer_id}


                                                                        >
                                                                            <option value="Phường/xã">Phường/xã</option>
                                                                            {assignWardtByDistric && assignWardtByDistric.length > 0
                                                                                ?
                                                                                assignWardtByDistric.map((item, index) => {
                                                                                    return (
                                                                                        <option key={`Ward - ${index}`} value={item?.Wardcustomers?.id}>{item?.Wardcustomers?.name}</option>

                                                                                    )
                                                                                })
                                                                                :
                                                                                <option value={data.wardcustomer_id} >{data.Wardcustomer.name}</option>
                                                                            }
                                                                        </select >
                                                                        <input

                                                                            type="text"
                                                                            className={isValidDetailAddress ? "form-control mb-2 " : "form-control is-invalid mb-2"}
                                                                            placeholder='Detail Address'
                                                                            value={data?.addressDetail}
                                                                            onChange={(event) => {
                                                                                handleOnchangeInput(event.target.value, "addressDetail");
                                                                            }}
                                                                        />
                                                                    </div>

                                                                    <div className='d-flex col-3 d-flex justify-content-center '>
                                                                        <button className='btn btn-success btn' title='Save' onClick={() => UpdateProfile()}>
                                                                            <i className="fa fa-check" aria-hidden="true"></i>

                                                                        </button>
                                                                        <button className='btn btn-danger mx-2 btn' title='Exit'
                                                                            onClick={() => {
                                                                                setEditAddress(false);
                                                                                setData(dataDefaut);
                                                                                setisValidProvince(true);
                                                                                setisValidDistrict(true);
                                                                                setisValidWard(true)
                                                                                setisValidDetailAddress(true)
                                                                            }}>
                                                                            <i className="fa fa-times" aria-hidden="true"></i>


                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>

                                                </div>

                                            }

                                            {data?.Shippingunit?.NameUnit &&
                                                <div className="item my-3">
                                                    <span className='my-3 d-flex'>
                                                        <span className='item-shipping mx-1'>
                                                            <span><i className="fa fa-motorcycle" aria-hidden="true"></i></span>

                                                            <span className='mx-1'>
                                                                {t('Profile.Eleven')}
                                                            </span>
                                                        </span>

                                                    </span>
                                                    <span className='d-flex align-items-center'>
                                                        <span className='mx-3 color-item '>{data?.Shippingunit?.NameUnit}</span>

                                                    </span>

                                                </div>
                                            }
                                            {data?.Position
                                                &&
                                                <div className="item my-3">
                                                    <span className='my-3 d-flex'>
                                                        <span className='item-position mx-1'>
                                                            <span><i className="fa fa-rss" aria-hidden="true"></i></span>


                                                            <span className='mx-1'>
                                                                {t('Profile.Twelve')}
                                                            </span>

                                                        </span>
                                                        <span className='mx-3'>

                                                        </span>
                                                    </span>
                                                    <span className='d-flex align-items-center'>
                                                        <span className='mx-3 color-item address-wrap'>{data?.Position ? data?.Position : ""}</span>

                                                    </span>

                                                </div>
                                            }

                                            {data?.Position
                                                &&
                                                <div className="item my-3">
                                                    <span className='my-3 d-flex'>
                                                        <span className='item-position mx-1'>
                                                            <span>
                                                                <i class="fa fa-universal-access" aria-hidden="true"></i>
                                                            </span>


                                                            <span className='mx-1'>
                                                                {t('Profile.Eleven')}
                                                            </span>

                                                        </span>
                                                        <span className='mx-3'>

                                                        </span>
                                                    </span>
                                                    <span className='d-flex align-items-center'>
                                                        <span className='mx-3 color-item address-wrap'>{data?.Shippingunit?.NameUnit ? data?.Shippingunit?.NameUnit : ""}</span>

                                                    </span>

                                                </div>
                                            }

                                            <div className="item my-3">
                                                <span className='my-3'>
                                                    <span className='item-Time mx-1'>
                                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                    </span>
                                                    <span className='mx-1'>
                                                        {t('Profile.Ten')}
                                                    </span>
                                                </span>
                                                <span>
                                                    <span className='mx-3 color-item'>
                                                        {moment(`${data.createdAt}`).format("DD/MM/YYYY")}                                                            </span>

                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isOpen && previewsImage &&
                                    <Lightbox
                                        mainSrc={previewsImage}

                                        onCloseRequest={() => setIsOpen(false)}

                                    />
                                }


                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div >

    )
}

export default Profile;