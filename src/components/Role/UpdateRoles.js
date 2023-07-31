import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useHistory } from "react-router-dom"
import { UserContext } from "../../contexApi/UserContext"
import { toast } from 'react-toastify';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { UpdateRole } from "../services/RoleService"
import { el } from 'date-fns/locale';

const UpdateRoles = (props) => {
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { handleShowhide, show, data, fetchUserRole } = props
    const { user } = React.useContext(UserContext);
    const [url, setUrl] = useState("")
    const [des, setDes] = useState("")
    const [id, setId] = useState("")

    const cancel = () => {
        handleShowhide()
        setUrl("")
        setDes("")
        setId("")
    }

    const Update = async () => {
        let res = await UpdateRole(id, url, des)
        if (res && +res.EC === 0) {
            toast.success(res.EM)
            await fetchUserRole()
            cancel()
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        setId(data?.id)
        setDes(data?.description)
        setUrl(data?.url)
    }, [data])


    return (
        <Modal show={show} onHide={() => cancel()} animation={false} size='lg' centered backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title> Update role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='ChangePassWord_Container'>
                    <div className='container'>
                        <div className='id'>
                            <label
                                htmlFor='input-password'
                                className='mx-1 mb-2'
                            >
                                <span > Id : </span>
                            </label>
                            <input
                                id='input-password'
                                type="text"
                                className="form-control"
                                value={id}
                                readOnly

                            />
                        </div>
                        <div className='url'>
                            <label
                                htmlFor='input-password'
                                className='mx-1 mb-2'
                            >
                                <span > Url : </span>
                            </label>
                            <input
                                id='input-password'
                                type="text"
                                className="form-control"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}

                            />
                        </div>
                        <div className='des my-3'>
                            <label
                                htmlFor='input-password'
                                className='mx-1 mb-2'
                            >
                                <span >	Description </span>
                            </label>
                            <input
                                id='input-password'
                                type="text"
                                className="form-control"
                                value={des}
                                onChange={(event) => setDes(event.target.value)}

                            />
                        </div>


                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => cancel()} >
                    Close
                </Button>
                <Button variant="primary" onClick={() => Update()} >
                    Save
                </Button>
            </Modal.Footer>
        </Modal >);
}

export default UpdateRoles;