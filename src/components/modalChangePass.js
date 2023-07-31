import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import './modalChangePass.scss'
import { ChangePassWord } from "./services/ProjectService"
import { UserContext } from "../contexApi/UserContext"
import { toast } from 'react-toastify';
import { NotificationContext } from "../contexApi/NotificationContext"


const ModalChangePass = (props) => {
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { showModalChangePass, handleShowChanePassModal } = props
    const { user } = React.useContext(UserContext);
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [Checkpassword, setCheckpassword] = useState(true)
    const [ChecknewPassword, setChecknewPassword] = useState(true)

    const cancel = () => {
        handleShowChanePassModal()
        setPassword()
        setNewPassword()
        setCheckpassword(true)
        setChecknewPassword(true)
    }

    let changePassWord = async () => {
        let data = {
            phone: user.account.phone,
            password: password,
            newpassWord: newPassword
        }
        if (!data.password) {
            setCheckpassword(false)
            toast.error("Can not empty password or new password")
            return;
        }
        if (!data.newpassWord) {
            setChecknewPassword(false)
            toast.error("Can not empty password or new password")
            return;
        }
        if (data.newpassWord && data.password) {
            let res = await ChangePassWord(data)
            if (res && +res.EC === 0) {
                toast.success(res.EM)
                setCheckpassword(true)
                setChecknewPassword(true)
                handleShowChanePassModal()
                setPassword("")
                setNewPassword("")
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)

            } else {

                if (res.EM === "Wrong password , please check again") {
                    toast.error(res.EM)

                    setCheckpassword(false)
                    return
                }
                if (res.EM === "The new password is the same as the password, please change it") {
                    toast.error(res.EM)

                    setCheckpassword(false)
                    setChecknewPassword(false)
                    return

                }
            }
        }

    }

    return (
        <Modal show={showModalChangePass} onHide={() => cancel()} animation={false} size='lg' centered >
            <Modal.Header closeButton>
                <Modal.Title> Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='ChangePassWord_Container'>
                    <div className='container'>
                        <div className='password'>
                            <label
                                htmlFor='input-password'
                                className='mx-1 mb-2'
                            >
                                <span > PassWord : </span>
                            </label>
                            <input
                                id='input-password'
                                type="password"
                                className={Checkpassword === false ? "form-control is-invalid" : "form-control"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}

                            />
                        </div>
                        <div className='new password my-3'>
                            <label
                                htmlFor='input-password'
                                className='mx-1 mb-2'
                            >
                                <span >New PassWord : </span>
                            </label>
                            <input
                                id='input-password'
                                type="password"
                                className={ChecknewPassword === false ? "form-control is-invalid" : "form-control"}
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}

                            />
                        </div>


                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => cancel()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => changePassWord()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >);
}

export default ModalChangePass;