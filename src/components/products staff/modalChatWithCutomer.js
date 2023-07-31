import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalChatWithCutomer.scss'
import { GetChat, updateProjectChat, deleteChatProject, createChatProject, createNotification } from "../services/ProjectService"
import { updateImage, updateImageIdandProjectId, fetchImagebyUser } from "../services/imageService"

import { SRLWrapper } from 'simple-react-lightbox'
import { toast } from 'react-toastify'
import moment from "moment"
import { useEffect } from 'react';
import { UserContext } from "../../contexApi/UserContext"
import { NotificationContext } from "../../contexApi/NotificationContext"
import { useTranslation, Trans } from 'react-i18next';

const ModalChatWithCutomer = (props) => {
    const { user } = React.useContext(UserContext);
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { t, i18n } = useTranslation();

    const { showModal, handleShowModal, dataChatOne, setShowModal } = props
    const [chatEditContent, setchatEditContent] = useState("")
    const [dataChatProduct, setdataChatProduct] = useState("")
    const [chatContent, setchatContent] = useState("")
    const [imageUser, setImageUser] = useState("")
    const [changeStatusChatProject, setChangeStatusChatProject] = useState(false)
    const [ProductId, SetProductId] = useState("")
    const [chatRender, setChatRender] = useState([])
    const [usersname, setUsersname] = useState([])

    const renderChat = async () => {
        let res = await GetChat(dataChatOne?.id)
        if (res && +res.EC === 0) {
            setChatRender(res?.DT)
        }

    }



    const handleChangeStatusEditChat = async (item) => {
        setChangeStatusChatProject(!changeStatusChatProject)
        setdataChatProduct(item)
        setchatEditContent(item.text)

    }
    const handleCancelChangeStatusEditChat = async (item) => {

        setChangeStatusChatProject(!changeStatusChatProject)
    }



    let dataUpdateChat = {
        id: dataChatProduct.id,
        projectId: dataChatProduct.projectId,
        text: chatEditContent,
        CreatedByName: user.account.Position ? user.account.Position : user?.account?.groupName,
        CreatedByPhone: user.account.phone
    }

    const handlUpdateChatProject = async () => {
        if (dataUpdateChat.text.length > 0) {
            let res = await updateProjectChat(dataUpdateChat)
            if (res && +res.EC === 0) {
                setChangeStatusChatProject(false)
                await renderChat()
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }

            } else {
                toast.error(res.EM)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        }
        if (dataUpdateChat.text.length === 0) {
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            toast.error("comment do not empty")
            return;
        }

    }
    const handlDeleteChatProject = async (id) => {
        let res = await deleteChatProject(id)
        if (res && +res.EC === 0) {
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            await renderChat()

        } else {
            toast.error(res.EM)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
        }
    }
    const getImagebyUser = async () => {
        let res = await fetchImagebyUser(user.account.email)
        if (res && +res.EC === 0) {
            if (res.DT[0]?.image) {
                let imagebase64 = new Buffer(res.DT[0]?.image, 'base64').toString("binary")
                setImageUser(imagebase64)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            } else {
                setImageUser("")
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }


        } else {
            toast.error(res.EM)

        }
    }

    let dataChat = {
        ProductId: dataChatOne.id,
        chatContent: chatContent,
        CreatedByName: user.account.Position ? user.account.Position : user?.account?.groupName,
        CreatedByPhone: user.account.phone

    }
    const createChat = async () => {
        if (dataChat && !dataChat.chatContent) {
            return
        }
        if (dataChat) {
            let res = await createChatProject(dataChat)
            if (res && +res.EC === 0) {
                await createNotification(dataChatOne.id, dataChatOne.order, "nhân viên vừa chat", user.account.Position, dataChatOne.createdBy, 0, 1, dataChatOne.shippingunit_id)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
                setchatContent("")
                await renderChat()

            }
        }

    }
    useEffect(() => {
        renderChat()
        getImagebyUser()
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        if (!user.account.Position) {
            let arr = user?.account?.groupName.split(' ');
            const arrnew = []
            for (let i = 0; i < arr.length; i++) {
                arrnew.push(arr[i].slice(0, 1))

            }
            setUsersname(arrnew)
        } else {
            let arr = user.account.Position?.split(' ');
            const arrnew = []
            for (let i = 0; i < arr.length; i++) {
                arrnew.push(arr[i].slice(0, 1))

            }
            setUsersname(arrnew)
        }
        console.log("dataChatOne", dataChatOne)

    }, [dataChatOne])




    const refesh = async () => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }
    return (
        <>
            <Modal show={showModal} onHide={() => { setShowModal(false); setchatContent("") }} animation={false} size='xl' onClick={() => refesh()} >
                <Modal.Header closeButton>
                    <Modal.Title >Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' chat mt-3 d-none d-lg-block'>
                        <h5 className='mb-3' style={{ color: "#637381" }}>
                            {t('detail.Chat.Four')}
                        </h5>
                        <div className="chat-all mb-2 ">
                            <div className='container'>
                                {chatRender && chatRender &&
                                    chatRender.map((item, index) => {
                                        let arr = item.CreatedByName.split(' ');
                                        const arrnew = []
                                        for (let i = 0; i < arr.length; i++) {
                                            arrnew.push(arr[i].slice(0, 1))
                                        }




                                        return (
                                            <>
                                                <div className='chat-all-item col-12' key={`image-chat-${index}`}>
                                                    <div className='container'>
                                                        <div className="row">
                                                            {item.CreatedByName
                                                                &&
                                                                <div className='image col-2 my-4' style={{ background: "gray", color: "white" }}>

                                                                    <div className='Name-User'>
                                                                        {arrnew.join('').toUpperCase()}
                                                                    </div>
                                                                </div>
                                                            }
                                                            {changeStatusChatProject === true && dataChatProduct.id === item.id
                                                                ?
                                                                <>
                                                                    <div className={item.CreatedBy === user.account.username ? "input-more col-8 d-flex flex-column" : " input-more-sub  col-8 d-flex flex-column"}>
                                                                        <div className='time d-flex justify-content-end '>
                                                                            {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}                                                                                                            </div>
                                                                        <div className='my-1' >
                                                                            <div className='container'>
                                                                                <input type="text"
                                                                                    className='form-control '
                                                                                    onChange={(event) => setchatEditContent(event.target.value)}
                                                                                    value={chatEditContent}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                        <div className='create-by-user d-flex justify-content-end'>
                                                                            {t('detail.Chat.Two')}  {item.CreatedByName}
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2 d-flex align-items-center' style={{ paddingBottom: "61px" }}>
                                                                        <button className='btn btn-warning ' style={{ borderRadius: "50%" }} onClick={() => handlUpdateChatProject()}>
                                                                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                                                        </button>
                                                                        <button className='btn btn-danger mx-3' style={{ borderRadius: "50%" }} onClick={() => handleCancelChangeStatusEditChat()}>
                                                                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className={item.CreatedBy === user.account.username ? "input-more col-8 d-flex flex-column" : " input-more-sub  col-8 d-flex flex-column"}>
                                                                        <div className='time d-flex justify-content-end '>
                                                                            {moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}                                                                                                            </div>
                                                                        <div className='input-title my-1' >
                                                                            <div className='container'>
                                                                                <span >
                                                                                    {item.text}
                                                                                </span>
                                                                            </div>

                                                                        </div>
                                                                        <div className='create-by-user d-flex justify-content-end'>
                                                                            {t('detail.Chat.Two')}  {item?.CreatedByName}-{item?.CreatedByPhone}
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-2 d-flex align-items-center' style={{ paddingBottom: "61px" }}>
                                                                        <button className='btn btn-warning ' style={{ borderRadius: "50%" }} onClick={() => handleChangeStatusEditChat(item)}>
                                                                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                                                        </button>
                                                                        <button className='btn btn-danger mx-3' style={{ borderRadius: "50%" }} onClick={() => handlDeleteChatProject(item.id)}>
                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            }


                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }





                            </div>
                        </div>
                        <SRLWrapper>
                            <div className='chat-content  '>
                                <div className='container'>
                                    <div className='row'>

                                        <>
                                            <div className='image-user col-1'>
                                                {usersname.join('').toUpperCase()}
                                            </div>
                                            <input type="text"
                                                placeholder='Trò chuyện với nhân viên'
                                                className='chat-input col-9'
                                                onChange={(event) => setchatContent(event.target.value)}
                                                value={chatContent}
                                            />

                                            <div className='icon col-1'>

                                                <span className='send' >
                                                    <button className='btn btn-primary' onClick={() => createChat()}>
                                                        {t('detail.Chat.Three')}
                                                    </button>
                                                </span>
                                            </div>
                                        </>


                                    </div>
                                </div>

                            </div>
                        </SRLWrapper>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowModal(false); setchatContent("") }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalChatWithCutomer;