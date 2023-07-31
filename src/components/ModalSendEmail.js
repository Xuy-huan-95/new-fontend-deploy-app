import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import { validateInfomationChangePass, UpdateNewPassword } from "./services/ProjectService"
import { UserContext } from "../contexApi/UserContext"
import { toast } from 'react-toastify';
import './ModalSendEmail.scss'
import OtpInput from 'react-otp-input';
import CountDownAnimation from "./countDown"

const ModalSendEmailResetPass = (props) => {
    const { user } = React.useContext(UserContext);
    const { showModalSendemail, handleShowhideEmail } = props
    const [email, setEmail] = useState("")
    const [emailReceiveOtp, setEmailReceiveOtp] = useState("")
    const [phone, setPhone] = useState("")
    const [otp, setOtp] = useState("")
    const [PassWord, setPassWord] = useState("")
    const [ConfirmPassWord, setConfirmPassWord] = useState("")

    const [checkValidateEmail, setCheckValidateEmail] = useState(true)
    const [checkValidateEmailReceiveOtp, setcheckValidateEmailReceiveOtp] = useState(true)
    const [checkPhone, setcheckPhone] = useState(true)
    const [sendUpdateInfo, setSendUpdateInfo] = useState("0")
    const [checkValidateOtp, setcheckValidateOtp] = useState(true)
    const [checkValidatePassWord, setcheckValidatePassWord] = useState(true)
    const [checkValidateConfirmPassWord, setcheckValidateConfirmPassWord] = useState(true)
    let pin = Math.floor(Math.random() * 1000000)

    const TIME_LIMIT = 180;
    // thời gian giới hạn
    const [timeLeft, setTimeLeft] = useState(0);

    const cancel = async () => {
        setSendUpdateInfo("0")
        handleShowhideEmail()
        setEmail("")
        setEmailReceiveOtp("")
        setPhone("")
        setOtp("")
        setPassWord("")
        setConfirmPassWord("")
        setCheckValidateEmail(true)
        setcheckValidateEmailReceiveOtp(true)
        setcheckPhone(true)
        setcheckValidateOtp(true)
        setcheckValidatePassWord(true)
        setcheckValidateConfirmPassWord(true)
        await DeletePinAfterOver()

    }
    const RetryOtp = () => {
        setSendUpdateInfo("0")
        setcheckValidateOtp(true)
        setcheckValidatePassWord(true)
        setcheckValidateConfirmPassWord(true)

    }

    useEffect(() => {
        if (sendUpdateInfo === "0") {
            setTimeLeft(0)
        }
        if (sendUpdateInfo === "1") {
            setTimeLeft(TIME_LIMIT)
        }
    }, [sendUpdateInfo])

    const handleVerifyInfomationForgotPassWord = async () => {

        if (!email) {
            setCheckValidateEmail(false)
            toast.error("Can not empty email")
        }
        if (!emailReceiveOtp) {
            setcheckValidateEmailReceiveOtp(false)
            toast.error("Can not empty email receive otp")
        }
        if (!phone) {
            setcheckPhone(false)
            toast.error("Can not empty phone")
        }
        if (email && emailReceiveOtp && phone) {
            let res = await validateInfomationChangePass({
                email: email,
                phone: phone,
                emailReceiveOtp: emailReceiveOtp,
                pin: pin
            })
            if (res && +res.EC === 0) {
                setSendUpdateInfo("1")
                toast.success("Otp code has been sent to your gmail")
                setCheckValidateEmail(true)
                setcheckValidateEmailReceiveOtp(true)
                setcheckPhone(true)
                setOtp("")
                setPassWord("")
                setConfirmPassWord("")
            } else {
                toast.error(res.EM)
                setCheckValidateEmail(false)
                setcheckPhone(false)

            }
        }

    }
    const DeletePinAfterOver = async () => {
        await validateInfomationChangePass({
            email: email,
            phone: phone,
            emailReceiveOtp: emailReceiveOtp,
            pin: ""
        })
    }

    const handleUpdatePassWord = async () => {
        if (!otp) {
            setcheckValidateOtp(false)
            toast.error("Can not empty otp")
            return;
        }
        if (!PassWord) {
            setcheckValidatePassWord(false)
            toast.error("Can not empty PassWord")
            return;

        }
        if (!ConfirmPassWord) {
            setcheckValidateConfirmPassWord(false)
            toast.error("Can not empty ConfirmPassWord")
            return;

        }
        if (PassWord !== ConfirmPassWord) {
            setcheckValidateConfirmPassWord(false)
            setcheckValidatePassWord(false)
            toast.error("password is not the same as confirm password")
            return;

        }
        if (otp && PassWord && ConfirmPassWord && PassWord === ConfirmPassWord) {
            let res = await UpdateNewPassword({
                email: email,
                phone: phone,
                otp: otp,
                PassWord: PassWord
            })
            if (res && +res.EC === 0) {
                setSendUpdateInfo("1")
                toast.success(res.EM)
                setcheckValidateOtp(true)
                setcheckValidatePassWord(true)
                setcheckValidateConfirmPassWord(true)
                DeletePinAfterOver()
                handleShowhideEmail()
            } else {
                toast.error(res.EM)


            }
        }

    }

    useEffect(() => {
        if (timeLeft === 0) {
            DeletePinAfterOver()
        }

    }, [timeLeft])

    return (
        <Modal show={showModalSendemail} onHide={() => cancel()} animation={false} size='lg' centered >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div >
                        <div className='d-flex align-items-center '> {sendUpdateInfo === "0" ? "Send Otp" : "Update Password"}</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {sendUpdateInfo === "0" ?
                    <div className='ResetPass-container'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto '>
                                            <div className='d-flex align-items-center px-3 '>
                                                <div>Gmail đăng ký trên hệ thống  {checkValidateEmail === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                }  </div>
                                            </div>

                                        </legend>

                                        <input
                                            id='input-password'
                                            type="email"
                                            className={checkValidateEmail === true ? "form-control  " : "form-control is-invalid"}
                                            placeholder='Email'
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}


                                        />
                                    </fieldset>
                                </div>

                                <div className='col-12 py-3'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto '>
                                            <div className='d-flex align-items-center px-3 '>
                                                <div>Gmail nhận mã OTp {checkValidateEmailReceiveOtp === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                } </div>
                                            </div>

                                        </legend>

                                        <input
                                            id='input-password'
                                            type="email"
                                            className={checkValidateEmailReceiveOtp === true ? "form-control  " : "form-control is-invalid"}
                                            placeholder='Email'
                                            value={emailReceiveOtp}
                                            onChange={(event) => setEmailReceiveOtp(event.target.value)}


                                        />
                                    </fieldset>
                                </div>
                                <div className='col-12 pt-3'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto px-3 '>
                                            <div className='d-flex align-items-center '>
                                                <div>Số điện thoại đăng ký trên hệ thống {checkPhone === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                } </div>
                                            </div>

                                        </legend>

                                        <input
                                            id='input-password'
                                            type="number"
                                            className={checkPhone === true ? "form-control  " : "form-control is-invalid"}
                                            placeholder='Phone number'
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}


                                        />
                                    </fieldset>
                                </div>

                            </div>
                        </div>
                    </div>
                    :
                    <div className='ResetPass-container'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto '>
                                            <div className='d-flex align-items-center px-2 '>
                                                <div>Otp {checkValidateOtp === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                }  </div>
                                            </div>

                                        </legend>
                                        <div className='Otp'>
                                            <OtpInput
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={6}
                                                renderSeparator={<span>-</span>}
                                                renderInput={(props) => <input {...props} />}
                                                inputStyle={"inputStyle"}
                                            />
                                            <div className='my-3'>
                                                Otp expire after :
                                            </div>
                                            <div >
                                                <CountDownAnimation
                                                    TIME_LIMIT={TIME_LIMIT}
                                                    timeLeft={timeLeft}
                                                    setTimeLeft={setTimeLeft}
                                                />

                                            </div>
                                            {timeLeft === 0 &&

                                                <button className='btn btn-primary mt-3' onClick={() => RetryOtp()}>Lấy lại mã Otp </button>

                                            }

                                        </div>
                                        <div className='time-Stamp'>

                                        </div>

                                    </fieldset>
                                </div>
                                <div className='col-12 py-3'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto '>
                                            <div className='d-flex align-items-center px-3 '>
                                                <div>New password {checkValidatePassWord === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                } </div>
                                            </div>

                                        </legend>

                                        <input
                                            id='input-password'
                                            type="email"
                                            className={checkValidatePassWord === true ? "form-control  " : "form-control is-invalid"}
                                            placeholder='PassWord'
                                            value={PassWord}
                                            onChange={(event) => setPassWord(event.target.value)}


                                        />
                                    </fieldset>
                                </div>
                                <div className='col-12 pt-3'>
                                    <fieldset className='border rounded-3 p-3' >
                                        <legend className='float-none w-auto px-3 '>
                                            <div className='d-flex align-items-center '>
                                                <div>Confirm PassWord {checkValidateConfirmPassWord === false &&
                                                    <span style={{ color: "red" }}><i className="fa fa-times" aria-hidden="true"></i>
                                                    </span>
                                                } </div>
                                            </div>

                                        </legend>

                                        <input
                                            id='input-password'
                                            type="password"
                                            className={checkValidateConfirmPassWord === true ? "form-control  " : "form-control is-invalid"}
                                            placeholder='Confirm PassWord'
                                            value={ConfirmPassWord}
                                            onChange={(event) => setConfirmPassWord(event.target.value)}

                                        />
                                    </fieldset>
                                </div>

                            </div>
                        </div>
                    </div>
                }



            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => cancel()}>
                    Close
                </Button>
                {sendUpdateInfo === "0" ?
                    <Button variant="primary" onClick={() => handleVerifyInfomationForgotPassWord()} >
                        Save
                    </Button>
                    :
                    <Button variant="primary" onClick={() => handleUpdatePassWord()} >
                        Save
                    </Button>
                }

            </Modal.Footer>
        </Modal >);
}

export default ModalSendEmailResetPass;