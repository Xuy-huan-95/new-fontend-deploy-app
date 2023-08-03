import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useImmer } from "use-immer";
import getBase64 from "../commondUtils/commondUtils"
import { createWarehouse, updateWarehouse } from "../services/ProjectService"
import { toast } from 'react-toastify';
import { UserContext } from "../../contexApi/UserContext"
import './Warehouse.scss'
import _ from "lodash"
import { Link, NavLink, useHistory } from "react-router-dom"
import axios from "../../customizeAxios/axios"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"

const ModalCreateWarehouse = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { showModalCreateWarehouse, handleShowhideModalCreateWarehouse, action, dataWarehouseEdit, fetchProjectUser, previreImage, setprevireImage, dataWarehouseRepeat, getAllInWarehouse } = props;
    const { user } = React.useContext(UserContext);
    let history = useHistory()
    const [listdata, setListdata] = useImmer({
        id: "",
        image: "",
        Product: "",
        Product_Prince: "",
        Number: "",
        Suppliers: "",
        unit: "",
        unitMoney: "",
        Suppliers_address: "",
        Suppliers_phone: "",
        product_statusId: 1,
        createdBy: user.account.phone
    })
    const [validInput, setValidInput] = useImmer({
        image: true,
        Product: true,
        Product_Prince: true,
        Number: true,
        Suppliers: true,
        unit: true,
        unitMoney: true,
        Suppliers_address: true,
        Suppliers_phone: true,

    })

    const handleCancel = async () => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        } handleShowhideModalCreateWarehouse()
        setprevireImage("")
        setListdata(draft => {
            draft.Product = "";
            draft.Product_Prince = "";
            draft.Number = "";
            draft.Suppliers = "";
            draft.unit = "";
            draft.unitMoney = "";
            draft.Suppliers_address = "";
            draft.Suppliers_phone = "";
            draft.image = "";
            draft.product_statusId = 1
        });
    }
    const handleOnchangeInput = async (value, name) => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        setListdata(draft => {
            if (name === "Product") {
                draft.Product = value
            }
            if (name === "Product_Prince") {
                draft.Product_Prince = value
            }
            if (name === "Number") {
                draft.Number = value
            }
            if (name === "Suppliers") {
                draft.Suppliers = value
            }
            if (name === "unit") {
                draft.unit = value
            }
            if (name === "unitMoney") {
                draft.unitMoney = value
            }
            if (name === "Suppliers_address") {
                draft.Suppliers_address = value
            }
            if (name === "Suppliers_phone") {
                draft.Suppliers_phone = value
            }
            if (name === "product_statusId") {
                draft.product_statusId = value
            }
        })
    }



    const checkValueDate = () => {
        if (action === "Update") return true

        setValidInput(draft => {
            draft.image = true;
            draft.Product_Prince = true;
            draft.Number = true;
            draft.Suppliers = true;
            draft.unit = true;
            draft.unitMoney = true;
            draft.Suppliers_address = true;
            draft.Suppliers_phone = true;

        }
        )

        let arr = ["Product", "Product_Prince", "Number", "Suppliers", "unit", "unitMoney", "Suppliers_address", "Suppliers_phone", "product_statusId"]
        let check = true;
        const regxPhone = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/;
        const re = /^[0-9\b]+$/;

        for (let i = 0; i < arr.length; i++) {
            if (!listdata[arr[i]]) {
                setValidInput(draft => {
                    draft[arr[i]] = false
                })
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break;

            } else {
                setValidInput(draft => {
                    draft[arr[i]] = true
                })

            }

            if (listdata[arr[1]] && !re.test(listdata[arr[1]])) {

                setValidInput(draft => {
                    draft[arr[1]] = false
                })
                toast.error("please enter a valid Product_Prince")
                return false

            } else {
                setValidInput(draft => {
                    draft[arr[1]] = true
                })

            }
            if (action === "Repeat" && listdata[arr[2]] === "0") {

                setValidInput(draft => {
                    draft[arr[2]] = false
                })
                toast.error("please enter a valid number")
                return false

            } else {
                setValidInput(draft => {
                    draft[arr[2]] = true
                })

            }
            if (listdata[arr[2]] && listdata[arr[2]] === "0") {

                setValidInput(draft => {
                    draft[arr[2]] = false
                })
                toast.error("please enter a valid number")
                return false

            } else {
                setValidInput(draft => {
                    draft[arr[2]] = true
                })

            }
            if (listdata[arr[2]] && !re.test(listdata[arr[2]])) {

                setValidInput(draft => {
                    draft[arr[2]] = false
                })
                toast.error("please enter a valid number")
                return false

            } else {
                setValidInput(draft => {
                    draft[arr[2]] = true
                })
            }



            if (listdata[arr[7]] && !regxPhone.test(listdata[arr[7]])) {
                setValidInput(draft => {
                    draft[arr[7]] = false
                })
                toast.error("please enter a valid phone")
                return false

            } else {
                setValidInput(draft => {
                    draft[arr[7]] = true
                })

            }

        }

        return check
    }
    const handleOnchangeImage = async (value) => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        setListdata(draft => {
            draft.image = value[0]
        })

        const objectUrl = URL.createObjectURL(value[0])

        setprevireImage(objectUrl)

    }
    const handleSubmit = async () => {
        let arr = ["Product", "Product_Prince", "Number", "Suppliers", "unit", "unitMoney", "Suppliers_address", "Suppliers_phone", "product_statusId"]

        let check = checkValueDate();

        if (check === true) {
            const formData = new FormData();
            formData.append('file', listdata.image);
            formData.append('Product', listdata.Product);
            formData.append('Product_Prince', listdata.Product_Prince);
            formData.append('Number', listdata.Number);
            formData.append('Suppliers', listdata.Suppliers);
            formData.append('unit', listdata.unit);
            formData.append('unitMoney', listdata.unitMoney);
            formData.append('Suppliers_address', listdata.Suppliers_address);
            formData.append('Suppliers_phone', listdata.Suppliers_phone);
            formData.append('product_statusId', listdata.product_statusId);
            formData.append('createdBy', listdata.createdBy);
            formData.append('id', listdata.id);


            if (action === "Create") {
                let dataCreate = await axios.post("https://huyle-backend-app.onrender.com/api/v6/create-warehouse-pic", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).catch((err) => {
                    toast.error("Ảnh không có hoặc dung lượng ảnh vượt quá giới hạn cho phép  ")
                })
                if (dataCreate && +dataCreate.EC === 0) {
                    toast.success(dataCreate.EM)
                    history.push("/Warehouse")
                    handleShowhideModalCreateWarehouse()
                    await getAllInWarehouse()
                    await fetchProjectUser()

                    setprevireImage("")
                    setListdata(draft => {
                        draft.Product = "";
                        draft.Product_Prince = "";
                        draft.Number = "";
                        draft.Suppliers = "";
                        draft.unit = "";
                        draft.unitMoney = "";
                        draft.Suppliers_address = "";
                        draft.Suppliers_phone = "";
                        draft.image = "";
                        draft.product_statusId = 1
                    });
                    for (let i = 0; i < arr.length; i++) {
                        setValidInput(draft => {
                            draft[arr[i]] = true
                        })

                    }


                }


            } if (action === "Update") {
                let dataCreate = await axios.put("https://huyle-backend-app.onrender.com/api/v6/upload-warehouse-pic", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).catch((err) => {
                    toast.error("ảnh vượt quá dung lượng cho phép hoặc không hợp lệ")
                });
                if (dataCreate && +dataCreate.EC === 0) {
                    toast.success(dataCreate.EM)
                    history.push("/Warehouse")
                    handleShowhideModalCreateWarehouse()
                    await getAllInWarehouse()

                    await fetchProjectUser()
                    setprevireImage("")
                    setListdata(draft => {
                        draft.Product = "";
                        draft.Product_Prince = "";
                        draft.Number = "";
                        draft.Suppliers = "";
                        draft.unit = "";
                        draft.unitMoney = "";
                        draft.Suppliers_address = "";
                        draft.Suppliers_phone = "";
                        draft.image = "";
                        draft.product_statusId = 1
                    });
                    for (let i = 0; i < arr.length; i++) {
                        setValidInput(draft => {
                            draft[arr[i]] = true
                        })

                    }
                }
            } if (action === "Repeat") {
                let data = listdata

                let res =
                    await createWarehouse(data)


                if (res && +res.EC === 0) {
                    toast.success(res.EM)

                    handleShowhideModalCreateWarehouse()
                    setprevireImage("")
                    setListdata(draft => {
                        draft.Product = "";
                        draft.Product_Prince = "";
                        draft.Number = "";
                        draft.Suppliers = "";
                        draft.unit = "";
                        draft.unitMoney = "";
                        draft.Suppliers_address = "";
                        draft.Suppliers_phone = "";
                        draft.image = "";
                        draft.product_statusId = 1
                    });
                    await fetchProjectUser()
                    await getAllInWarehouse()

                    for (let i = 0; i < arr.length; i++) {
                        setValidInput(draft => {
                            draft[arr[i]] = true
                        })

                    }


                }

            }
        }
    }


    useEffect(() => {
        if (action === "Create") {
            setprevireImage("")
            setListdata(draft => {
                draft.Product = "";
                draft.Product_Prince = "";
                draft.Number = "";
                draft.Suppliers = "";
                draft.unit = "";
                draft.unitMoney = "";
                draft.Suppliers_address = "";
                draft.Suppliers_phone = "";
                draft.image = "";
                draft.product_statusId = 1;

            })
        }
        if (action === "Update") {
            setprevireImage("https://huyle-backend-app.onrender.com/image/" + dataWarehouseEdit.image)
            setListdata(draft => {
                draft.id = dataWarehouseEdit.id
                draft.Product = dataWarehouseEdit.product;
                draft.Product_Prince = dataWarehouseEdit.product_cost;
                draft.Number = dataWarehouseEdit.product_number;
                draft.Suppliers = dataWarehouseEdit.Suppliers;
                draft.unit = dataWarehouseEdit.unit;
                draft.unitMoney = dataWarehouseEdit.unitMoney;
                draft.Suppliers_address = dataWarehouseEdit.Suppliers_address;
                draft.Suppliers_phone = dataWarehouseEdit.Suppliers_phone;
                draft.image = dataWarehouseEdit.image;
                draft.product_statusId = dataWarehouseEdit.productstatuss_id;

            })
        }
        if (action === "Repeat" && dataWarehouseRepeat) {
            setprevireImage("https://huyle-backend-app.onrender.com/image/" + dataWarehouseRepeat.image)
            setListdata(draft => {
                draft.Product = dataWarehouseRepeat.product;
                draft.Product_Prince = dataWarehouseRepeat.product_cost;
                draft.Number = dataWarehouseRepeat.product_number;
                draft.Suppliers = dataWarehouseRepeat.Suppliers;
                draft.unit = dataWarehouseRepeat.unit;
                draft.unitMoney = dataWarehouseRepeat.unitMoney;
                draft.Suppliers_address = dataWarehouseRepeat.Suppliers_address;
                draft.Suppliers_phone = dataWarehouseRepeat.Suppliers_phone;
                draft.image = dataWarehouseRepeat.image;
                draft.product_statusId = 1;

            })
        }
    }, [action])
    return (
        <>
            <form
                onSubmit={handleSubmit}
                method='POST'
                encType='multipart/form-data'
                action='upload-warehouse-pic'
            >
                <Modal show={showModalCreateWarehouse} onHide={() => handleCancel()} animation={false} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {action === "Create" && "Create Product"}
                            {action === "Update" && "Update Product"}
                            {action === "Repeat" && "Continue shopping"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='Create-warehouse-container'>
                            <div className='container'>
                                <div className='row'>
                                    {action === "Repeat" ?

                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleOne')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                readOnly
                                                min="1" max="9999"
                                                className={validInput.Product ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Product}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Product")}

                                            />
                                        </div>
                                        :
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleOne')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Product ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Product}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Product")}

                                            />
                                        </div>
                                    }


                                    {action === "Repeat" ?

                                        <div className='product col-12 col-lg-4'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleTwo')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                readOnly
                                                min="1" max="9999"
                                                className={validInput.Product_Prince ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Product_Prince}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Product_Prince")}

                                            />
                                        </div>
                                        :
                                        <div className='product col-12 col-lg-4'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleTwo')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Product_Prince ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Product_Prince}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Product_Prince")}

                                            />
                                        </div>
                                    }
                                    {action === "Repeat" ?

                                        <div className='product col-12 col-lg-2'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleThree')}

                                            </label>
                                            <select
                                                readOnly

                                                className={validInput.unitMoney ? "form-control" : "form-control is-invalid"}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "unitMoney")}
                                                value={listdata.unitMoney}
                                            >
                                                <option value="Đơn vị">Lựa chọn </option>
                                                <option value="VND">VND</option>
                                                <option value="USD">USD</option>
                                                <option value="RMB">RMB</option>
                                            </select >
                                        </div>

                                        :
                                        <div className='product col-12 col-lg-2'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleThree')}

                                            </label>
                                            <select

                                                className={validInput.unitMoney ? "form-control" : "form-control is-invalid"}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "unitMoney")}
                                                value={listdata.unitMoney}
                                            >
                                                <option value="Đơn vị">Lựa chọn </option>
                                                <option value="VND">VND</option>
                                                <option value="USD">USD</option>
                                                <option value="RMB">RMB</option>
                                            </select >
                                        </div>
                                    }
                                    <div className='product col-12 col-lg-4'>
                                        <label htmlFor='input-product' className='mb-2' >
                                            {t('CreateWarehouse.tittleFour')}

                                        </label>
                                        <input
                                            id='input-product'
                                            type="text"
                                            min="1" max="9999"
                                            className={validInput.Number ? "form-control" : "form-control is-invalid"}
                                            value={listdata.Number}
                                            onChange={(event) => handleOnchangeInput(event.target.value, "Number")}

                                        />
                                    </div>
                                    {action === "Repeat" ?

                                        <div className='product col-12 col-lg-2'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleFive')}
                                            </label>

                                            <select
                                                readOnly

                                                className={validInput.unit ? "form-control" : "form-control is-invalid"}
                                                value={listdata.unit}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "unit")}
                                            >
                                                <option value="Đơn vị">Lựa chọn </option>
                                                <option value="Chiếc">Chiếc</option>
                                                <option value="Bộ">Bộ </option>
                                                <option value="Tấm">Tấm</option>
                                                <option value="Miếng">Miếng</option>
                                                <option value="Túi">Túi</option>
                                                <option value="Hộp">Hộp</option>
                                                <option value="Gói">Gói </option>
                                                <option value="Bao tải">Bao tải</option>
                                                <option value="Thùng">Thùng</option>
                                            </select >

                                        </div>
                                        :
                                        <div className='product col-12 col-lg-2'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleFive')}

                                            </label>
                                            <select

                                                className={validInput.unit ? "form-control" : "form-control is-invalid"}
                                                value={listdata.unit}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "unit")}
                                            >
                                                <option value="Đơn vị">Lựa chọn </option>
                                                <option value="Chiếc">Chiếc</option>
                                                <option value="Bộ">Bộ </option>
                                                <option value="Tấm">Tấm</option>
                                                <option value="Miếng">Miếng</option>
                                                <option value="Túi">Túi</option>
                                                <option value="Hộp">Hộp</option>
                                                <option value="Gói">Gói </option>
                                                <option value="Bao tải">Bao tải</option>
                                                <option value="Thùng">Thùng</option>
                                            </select >
                                        </div>
                                    }
                                    {action === "Repeat" ?
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleSix')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                readOnly
                                                min="1" max="9999"
                                                className={validInput.Suppliers ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers")}

                                            />
                                        </div>
                                        :
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleSix')}

                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Suppliers ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers")}

                                            />
                                        </div>
                                    }
                                    {action === "Repeat" ?
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleSeven')}
                                            </label>
                                            <input
                                                readOnly
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Suppliers_address ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers_address}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers_address")}

                                            />
                                        </div>
                                        :
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleSeven')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Suppliers_address ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers_address}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers_address")}

                                            />
                                        </div>
                                    }
                                    {action === "Repeat" ?
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleEight')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                readOnly
                                                min="1" max="9999"
                                                className={validInput.Suppliers_phone ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers_phone}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers_phone")}

                                            />
                                        </div>
                                        :
                                        <div className='product col-12 col-lg-6'>
                                            <label htmlFor='input-product' className='mb-2' >
                                                {t('CreateWarehouse.tittleEight')}
                                            </label>
                                            <input
                                                id='input-product'
                                                type="text"
                                                min="1" max="9999"
                                                className={validInput.Suppliers_phone ? "form-control" : "form-control is-invalid"}
                                                value={listdata.Suppliers_phone}
                                                onChange={(event) => handleOnchangeInput(event.target.value, "Suppliers_phone")}

                                            />
                                        </div>
                                    }
                                    <div className='col-12 col-lg-12 form-group py-3 image' style={{ width: "100%" }}>
                                        {action === "Repeat" ?
                                            <div className='my-3'></div>
                                            :
                                            <div className='image-icon'>
                                                <input
                                                    type="file"
                                                    id='previewimage' hidden
                                                    onChange={(event) => handleOnchangeImage(event.target.files)}
                                                    className="form-control"
                                                />
                                                <label htmlFor="previewimage" className='Update-image '>
                                                    {t('CreateWarehouse.tittleNight')}
                                                    <i className="fa fa-upload" aria-hidden="true"></i>
                                                </label>

                                            </div>
                                        }

                                        <div className='preview-image' style={{ backgroundImage: `url(${previreImage})` }}></div>





                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleCancel()}>
                            {t('CreateWarehouse.tittleTen')}
                        </Button>
                        <Button variant="primary" onClick={() => handleSubmit()}>
                            {t('CreateWarehouse.tittleEleven')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </form >
        </>
    );
}

export default ModalCreateWarehouse;