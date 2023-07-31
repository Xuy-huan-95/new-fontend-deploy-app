import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProject } from "../services/ProjectService"
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom"
import { getNumberProductinWarehouse, updateNumberProductInWarehouse } from "../services/ProjectService"
import { NotificationContext } from "../../contexApi/NotificationContext"
import { useEffect } from 'react';
import { UserContext } from "../../contexApi/UserContext"

const DeleteProduct = (props) => {
    let history = useHistory()
    const [numberProduct, setNumberProduct] = useState("")
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { user } = React.useContext(UserContext);

    const { showDeleteProduct, handleShowDeleteModal, ProductId, order, projects } = props



    const handleDeleteModal = async () => {
        let res = await getNumberProductinWarehouse(+projects.warehouse_id)
        if (res && +res.EC === 0) {
            let resOne = await updateNumberProductInWarehouse(+projects.warehouse_id, +res.DT?.product_number + +projects.quantity)
            if (resOne && +resOne.EC === 0) {


                let resTwo = await deleteProject(ProductId)
                if (resTwo && +resTwo.EC === 0) {
                    history.push("/Products")
                    toast.success(resTwo.EM)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                    }
                } else {
                    toast.error(resTwo.EM)
                }
            }
        }

    }
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }, [])

    return (
        <>


            <Modal
                show={showDeleteProduct}
                onHide={
                    handleShowDeleteModal
                }
                backdrop="static"
                size="xl"

                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Project</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: "25px" }}>
                    Bạn có chắc chắn muốn xóa đơn hàng <b>{order}</b>  ????
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleShowDeleteModal()} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteModal(ProductId)}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteProduct 