import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useImmer } from "use-immer";
import { UserContext } from "../../contexApi/UserContext"
import { updateWarehouse } from "../services/ProjectService"
import { NotificationContext } from "../../contexApi/NotificationContext"
import { useTranslation, Trans } from 'react-i18next';

const ModalDeleteWarehouse = (props) => {
    const { showModalDeleteWarehouse, handleShowhideModalDelteWarehouse, dataWarehouseDelete, fetchProjectUser, action } = props;
    const { user } = React.useContext(UserContext);
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { t, i18n } = useTranslation();


    const handleDelete = async () => {

        let res = await updateWarehouse({
            id: dataWarehouseDelete.id,
            Product: dataWarehouseDelete.product,
            Product_Prince: dataWarehouseDelete.product_cost,
            Number: dataWarehouseDelete.product_number,
            Suppliers: dataWarehouseDelete.Suppliers,
            Suppliers_address: dataWarehouseDelete.Suppliers_address,
            Suppliers_phone: dataWarehouseDelete.Suppliers_phone,
            image: dataWarehouseDelete.image,
            product_statusId: 3
        })

        if (res && +res.EC === 0) {
            window.location.reload()
            await fetchProjectUser()
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            handleShowhideModalDelteWarehouse()

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



    return (
        <>
            <Modal show={showModalDeleteWarehouse} onHide={handleShowhideModalDelteWarehouse} animation={false} size='l' centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('Warehouse.tittleFourteen')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className=' col-12 ' style={{ fontSize: "20px" }}>
                                {t('Warehouse.tittleFifteen')} :   <b className='mx-2'>{dataWarehouseDelete?.product}</b>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowhideModalDelteWarehouse}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalDeleteWarehouse;