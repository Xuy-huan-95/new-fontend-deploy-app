import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next';


const ModalDelete = (props) => {
    const { show, handleCloseModal, dataModelDelete, handleDeleteUser } = props
    const { t, i18n } = useTranslation();

    return (
        <>


            <Modal show={show} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title> {t('Delete-user.One')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {t('Delete-user.Two')}

                    <b>{dataModelDelete.email}</b> ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={show}>
                        {t('Delete-user.Three')}
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        {t('Delete-user.Four')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default ModalDelete