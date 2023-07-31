import './login.scss'
import { useHistory, Link } from "react-router-dom"
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { LoginUser } from "../services/userService"
import { UserContext } from "../../contexApi/UserContext"
import ModalSendEmailResetPass from "../ModalSendEmail"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"

const Login = (props) => {
    const { user, login } = React.useContext(UserContext);
    let history = useHistory()
    const [password, setPassword] = useState()
    const [valueLogin, setValuelogin] = useState()
    const [showModalSendemail, setShowModalSendemail] = useState(false)
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    const handleShowhideEmail = () => {
        setShowModalSendemail(!showModalSendemail)
    }

    const handleCreatNewAccount = () => {
        history.push("/register")
    }
    const defaultValidInput = {

        isValidvalueLogin: true,
        isValidPassword: true

    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)



    const handleLogin = async () => {
        setObjCheckInput(defaultValidInput);
        if (!valueLogin) {
            setObjCheckInput({ ...defaultValidInput, isValidvalueLogin: false })

            toast.error("Please enter your phone number or your email")

            return;
        }
        if (!password) {
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false })

            toast.error("Please enter your password")
            return;

        }
        let res = await LoginUser(valueLogin.trim(), password)

        if (res && +res.EC === 0) {
            let groupWithRound = res.DT.groupWithRole;
            let email = res.DT.email;
            let phone = res.DT.phone
            let usersname = res.DT.usersname;
            let token = res.DT.access_token.token
            let shippingunit_id = res.DT.shippingunit_id
            let Position = res.DT.Position
            let groupName = res.DT.group;

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRound, email, usersname, phone, shippingunit_id, Position, groupName }
            }
            await getALlListNotification(+shippingunit_id, phone, Position)

            // login --contextApi(gan thong tin dang nhap vao login -contextapi)
            localStorage.setItem("jwt", res.DT.access_token.token)
            localStorage.setItem("infomation Page", 1)
            localStorage.setItem("Page one warehouse", 1)
            localStorage.setItem("Page two warehouse", 1)
            localStorage.setItem("Page three warehouse", 1)
            localStorage.setItem("Page four warehouse", 1)
            localStorage.setItem("Page five warehouse", 1)
            localStorage.setItem("infomation Page employer", 1)
            localStorage.setItem("infomation Page employer one", 1)
            localStorage.setItem("infomation Page employer two", 1)
            localStorage.setItem("infomation Page employer three", 1)
            localStorage.setItem("infomation Page employer four", 1)
            localStorage.setItem("infomation Page employer five", 1)
            localStorage.setItem("infomation Page employer six", 1)
            localStorage.setItem("infomation Page employer seven", 1)
            localStorage.setItem("infomation Page employer eight", 1)
            localStorage.setItem("infomation Page employer night", 1)
            localStorage.setItem("infomation Page employer ten", 1)


            login(data)
            history.push("/")

        }

        if (res && +res.EC !== 0) {
            toast.error(res.EM)

        }
    }

    const handlePressEnter = (event) => {
        console.log(event)
        if (event.keyCode == 13 && event.key === "Enter") {
            handleLogin()
        }
    }

    useEffect(() => {
        if (user && user.isAuthenticated) {
            history.push("/")

        }
    }, [user])
    return (
        <div className='login-container '>
            <div className='container'>
                <div className='row '>
                    <div className='container-left  d-none d-sm-block col-sm-7'>
                        <div className='brand   ' >
                            <Link to="/" > <span title='Return to Homepage'>huy le app</span></Link> </div>
                        <div className='detail'> Omnichannel selling management solutions for every business ,
                            With experience in implementing for more than 50,000 small and medium-sized sellers</div>
                    </div>
                    <div className=' py-3 container-right col-12 col-sm-5 d-flex flex-column gap-3 ' >
                        <div className='brand  d-sm-none  ' title='Return to Homepage' > huy le app</div>

                        <input type="text"
                            className={objCheckInput.isValidvalueLogin ? "form-control" : "is-invalid form-control"}
                            placeholder='Email address or Phone number '
                            value={valueLogin}
                            onChange={(event) => setValuelogin(event.target.value)}
                        />

                        <input type="password"
                            className={objCheckInput.isValidPassword ? "form-control" : "is-invalid form-control"}
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary' onClick={() => handleLogin()}>
                            {t('Login.One')}
                        </button>

                        <span className='text-center'>
                            <a className='forgot-password' onClick={() => handleShowhideEmail()}>
                                {t('Login.Two')}
                            </a>
                        </span>
                        <hr />
                        <div className='text-center' >
                            <button className='btn btn-success' onClick={() => handleCreatNewAccount()}>
                                {t('Login.Three')}
                            </button>
                            <div className='mt-3 return'>
                                <Link to="/">
                                    <i className='fa fa-arrow-circle-left mx-1'></i>
                                    <span title='Return to Homepage'>
                                        {t('Login.Four')}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <ModalSendEmailResetPass
                showModalSendemail={showModalSendemail}
                handleShowhideEmail={handleShowhideEmail}
            />

        </div >
    )

}

export default Login