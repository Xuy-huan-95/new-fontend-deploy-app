import './Register.scss'
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify';
import { registerNewUser } from "../services/userService"
import { UserContext } from "../../contexApi/UserContext"
import { useTranslation, Trans } from 'react-i18next';
import {
    getAllProvinceCustomer, getAllProvince, fetchDistrictCustomerByProvinceCustomer, fetchWarCustomerdByDistrictCustomer,
    fetchWardByDistrict, getAddress_from, getAddress_to, fetchDistrictByProvince
} from "../services/addressService"
import _ from "lodash"
import { NotificationContext } from "../../contexApi/NotificationContext"
import { createNotification } from "../services/ProjectService"

const Register = (props) => {
    const { user } = React.useContext(UserContext);
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Phone, setPhone] = useState("")
    const [username, setusername] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [Province, setProvince] = useState("")
    const [Sex, setSex] = useState("")

    const [District, setDistrict] = useState("")
    const [Ward, setWard] = useState("")
    const [DetailAddress, setDetailAddress] = useState("")
    const [assignDistrictByProvince, setassignDistrictByProvince] = useState([])
    const [allProvinceCutomer, setAllProvinceCustomer] = useState("")
    const [assignWardtByDistric, setassignWardtByDistric] = useState([])

    const handleOnchangeDistrictCustomer = async (value) => {
        if (value) {
            let res = await fetchWarCustomerdByDistrictCustomer(value)
            if (res && +res.EC === 0) {
                setassignWardtByDistric(res?.DT
                )
                setWard("")

            }
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
    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true,
        isValidConfirmPass: true,
        isValidPhone: true,
        isValidProvince: true,
        isValidDistrict: true,
        isValidWard: true,
        isValidDetailAddress: true,

    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    const handleOnchangeProviceCustomer = async (value) => {
        if (value) {
            let res = await fetchDistrictCustomerByProvinceCustomer(value)
            if (res && +res.EC === 0) {
                setassignDistrictByProvince(res?.DT
                )
                setDistrict("")

            }

        }
    }
    const handleBackLogin = async () => {
        history.push("/login")

    }
    const handleRegister = async () => {
        let check = isValidInput();


        if (check === true) {
            console.log("email, password, Phone, username, Province, District, Ward, DetailAddress, Sex", email, password, Phone, username, Province, District, Ward, DetailAddress, Sex)
            let res = await registerNewUser(email, password, Phone, username, Province, District, Ward, DetailAddress, Sex
            )
            if (+res.EC === 0) {
                await createNotification(0, 0, "thêm User", "", email, 1, 0, +user.account.shippingUnit_Id)


                history.push("/login")
                toast.success(res.EM)
            } else {
                toast.error(res.EM)

            }

        }

    }

    const isValidInput = () => {

        setObjCheckInput(defaultValidInput)

        if (!email) {
            toast.error("email empty")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false

        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error("please enter a valid email address")
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false })

            return false

        }
        if (!Phone) {
            toast.error("Phone empty")
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false })

            return false

        } if (!password) {
            toast.error("password empty")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })

            return false

        } if (!confirmPass) {
            toast.error("confirmPass empty")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPass: false })

            return false

        }
        if (password.length < 6) {
            toast.error("Password have to enter  at least 6 character")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })

            return false

        }
        if (confirmPass.length < 6) {
            toast.error("confirmPass have to enter  at least 6 character")
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })

            return false

        }
        if (password !== confirmPass) {
            toast.error("please  check again  confirm Pass or  password")
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPass: false })

            return false

        }

        if (Province === "Tỉnh/thành phố" || !Province) {
            toast.error("Province address empty")
            setObjCheckInput({ ...defaultValidInput, isValidProvince: false })

            return false

        }
        if (District === "Quận/huyện" || !District) {
            toast.error("District address empty")
            setObjCheckInput({ ...defaultValidInput, isValidDistrict: false })

            return false

        }
        if (Ward === "Phường/xã" || !Ward) {
            toast.error("Ward address empty")
            setObjCheckInput({ ...defaultValidInput, isValidWard: false })

            return false

        }
        if (!DetailAddress) {
            toast.error("Detail address empty")
            setObjCheckInput({ ...defaultValidInput, isValidDetailAddress: false })

            return false

        }

        return true

    }
    useEffect(() => {
        getProvinceCustomer()

    }, [])
    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push("/")
        }
    }, [user])
    return (
        <div className='register-container '>
            <div className='container'>
                <div className='row px-3'>
                    <div className='container-left  d-none d-sm-block col-sm-7'>
                        <Link className='brand  ' to="/login" > huy le app</Link>
                        <div className='detail'> Omnichannel selling management solutions for every business ,
                            With experience in implementing for more than 50,000 small and medium-sized sellers</div>
                    </div>
                    <div className=' py-3 container-right col-12 col-sm-5 d-flex flex-column gap-3 ' >
                        <div className='brand  d-sm-none  ' > huy le app</div>

                        <h2 className='text-center ' >
                            {t('Register.Eleven')}
                        </h2>
                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.One')}
                            </label>
                            <input type="email" className={objCheckInput.isValidEmail ? "form-control " : "form-control is-invalid"} placeholder='Email address ' value={email} onChange={(event) => setEmail(event.target.value)} />


                        </div>
                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.Two')}
                            </label>
                            <input type="text" className={objCheckInput.isValidPhone ? "form-control " : "form-control is-invalid"} placeholder='Phone number ' value={Phone} onChange={(event) => setPhone(event.target.value)} />


                        </div>
                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.Three')}
                            </label>
                            <input type="text" className='form-control' placeholder='User Name ' value={username} onChange={(event) => setusername(event.target.value)} />


                        </div>
                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.Four')}
                            </label>
                            <input type="password" className={objCheckInput.isValidPassword ? "form-control " : "form-control is-invalid"} placeholder='Password ' value={password} onChange={(event) => setPassword(event.target.value)} />


                        </div>
                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.Five')}
                            </label>
                            <input type="password" className={objCheckInput.isValidConfirmPass ? "form-control " : "form-control is-invalid"} placeholder='Re-enter Password ' value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} />


                        </div>
                        <div className='col-12 col-sm-12 form-group'>

                            <label className='col-4'>
                                {t('Register.Six')}
                            </label>

                            <select
                                className={objCheckInput.isValidProvince === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                onChange={(event) => {
                                    handleOnchangeProviceCustomer(event.target.value);
                                    setProvince(event.target.value)
                                }
                                }

                                value={Province}


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
                                {t('Register.Seven')}
                            </label>

                            <select
                                className={objCheckInput.isValidDistrict === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                onChange={(event) => {
                                    handleOnchangeDistrictCustomer(event.target.value);
                                    setDistrict(event.target.value)
                                }
                                }

                                value={District}


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
                                {t('Register.Eight')}
                            </label>

                            <select
                                className={objCheckInput.isValidWard === true ? "form-select my-2" : "form-select my-2 is-invalid"}
                                onChange={(event) => setWard(event.target.value)

                                }

                                value={Ward}


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


                        <div className='form-group'>
                            <label htmlFor="" className='mb-1'>
                                {t('Register.Night')}
                            </label>
                            <input
                                type="text"
                                className={objCheckInput.isValidDetailAddress ? "form-control " : "form-control is-invalid"}
                                placeholder='Detail Address'
                                value={DetailAddress}
                                onChange={(event) => setDetailAddress(event.target.value)}
                            />


                        </div>

                        <div className='col-12  form-group'>
                            <label >
                                {t('Register.Ten')}
                            </label>
                            <select className='form-select'
                                onChange={(event) => setSex(event.target.value)}
                                value={Sex}


                            >
                                <option defaultValue="...">...</option>

                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other" >Other</option>


                            </select >
                        </div>

                        <button className='btn btn-primary' onClick={() => handleRegister()}>
                            {t('Register.Twelve')}
                        </button>


                        <hr />
                        <div className='text-center' >
                            <button className='btn btn-success' onClick={() => handleBackLogin()}>
                                {t('Register.Thirteen')}

                            </button>
                            <div className='mt-3 return'>
                                <Link to="/">
                                    <i className='fa fa-arrow-circle-left mx-1'></i>
                                    <span title='Return to Homepage'>
                                        {t('Register.Fourteen')}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    );
}

export default Register;