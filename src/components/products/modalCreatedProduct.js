import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './createProject.scss'
import getBase64 from "../commondUtils/commondUtils"
import _ from "lodash"
import { toast } from 'react-toastify';
import { UserContext } from "../../contexApi/UserContext"
import {
    getAllProvinceCustomer, getAllProvince, fetchDistrictCustomerByProvinceCustomer, fetchWarCustomerdByDistrictCustomer,
    fetchWardByDistrict, getAddress_from, getAddress_to, fetchDistrictByProvince
} from "../services/addressService"
import { getAllShippingUnit, fetchShippingCostByShippingUnit, getPriceByAddress } from "../services/shippingService"
import { CreateProject, getSaleChannel, getStastusPayment, getNameProduct, getNumberProductinWarehouse } from "../services/ProjectService"
import { Link, NavLink, useHistory } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { getProjectWithPagination, updateProject, updateNumberProductInWarehouse, createNotification } from "../services/ProjectService"
import { fetchImagebyOrder, assignDataToProjectImage } from "../services/imageService"

const CreateNewProduct = (props) => {
    const { t, i18n } = useTranslation();
    let history = useHistory()

    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);


    const [allProvince, setAllProvince] = useState("")
    const [allProvinceCutomer, setAllProvinceCustomer] = useState("")

    const [allAddressFrom, setAllAddressFrom] = useState("")
    const [allAddressTo, setAllAddressTo] = useState("")
    const [SaleChannel, setSaleChannel] = useState("")
    const [StatusPayment, setStatusPayment] = useState("")
    const [assignDistrictByProvinceOfReceipt, setassignDistrictByProvinceOfReceipt] = useState([])
    const [assignDistrictByProvince, setassignDistrictByProvince] = useState([])
    const [selectProvince, setSelectProvince] = useState('')
    const [assignWardtByDistric, setassignWardtByDistric] = useState([])
    const [assignWardtByDistricOfReceipt, setassignWardtByDistricOfReceipt] = useState([])
    const [shippingUnit, setShippingUnit] = useState([])
    const [assignShippingCostByShippingunit, setassignShippingCostByShippingunit] = useState([])
    const [selectShippingCost, setSelectShippingCost] = useState('')
    const [shippingCost, setshippingCost] = useState([])
    const { user } = React.useContext(UserContext);
    const [image, setimage] = useState([])
    const [numberProduct, setNumberProduct] = useState("")
    const [id, setId] = useState("")
    const [selecCheckSubtmitImage, setSelecCheckSubtmitImage] = useState(false)
    const [projectId, setProjectId] = useState("")
    const [Product, SetProduct] = useState([])
    const [ProductNumber, SetProductNumber] = useState([])
    const [productAfterCreate, setProductAfterCreate] = useState({})



    let orderNumber = Math.floor(Math.random() * 1000000)

    const [order, setOrder] = useState(orderNumber)


    const defaultUserData = {
        order: "",
        name_Product: "",
        number: "",
        money: "",
        total: "",
        totalWithShippingCost: "",
        price_drop: "",
        paid: "",
        customer_name: "",
        customer_name_phone: "",
        note: "",
        age: "",
        Province_customer: "",
        District_customer: "",
        Ward_customer: "",
        detail_address_customer: "",
        Note_More: "",
        createdByName: user.account.usersname,
        createdBy: user.account.phone,
        shippingUnitId: "",
        shipping_Cost: "",
        From_address: "",
        To_address: "",
        salesChannel: "",
        StatusPaymentId: "",
        Province_of_receipt: "",
        District_of_receipt: "",
        Ward_of_receipt: "",
        Detail_Place_of_receipt: "",
        flag: 0,
        done_status: 0,
        unit: "",
        unit_money: "",
        name_account: "",
        Mode_of_payment: "",
        Bank_name: "",
        Main_Account: ""

    }


    const ValidInputsDefault = {
        order: true,
        name_Product: true,
        number: true,
        money: true,
        total: true,
        totalWithShippingCost: true,
        price_drop: true,
        paid: true,
        customer_name: true,
        customer_name_phone: true,
        note: true,
        age: true,
        Province_customer: true,
        District_customer: true,
        Ward_customer: true,
        detail_address_customer: true,
        Province_of_receipt: true,
        District_of_receipt: true,
        Ward_of_receipt: true,
        Detail_Place_of_receipt: true,
        image: true,
        Note_More: true,
        createdBy: true,
        shippingUnitId: true,
        shipping_Cost: true,
        From_address: true,
        To_address: true,
        salesChannel: true,
        StatusPaymentId: true,
        flag: true,
        done_status: true,
        unit: true,
        unit_money: true,
        name_account: true,
        Mode_of_payment: true,
        Bank_name: true,
        Main_Account: true



    }
    const [previreImage, setprevireImage] = useState([])

    const [userdata, setUserdata] = useState(defaultUserData)
    const [validInput, setValidInput] = useState(ValidInputsDefault)

    const checkValueDate = () => {
        setValidInput(ValidInputsDefault)
        let arr = ["name_Product", "number", "unit", "salesChannel", "money", "price_drop", "StatusPaymentId", "paid", "total", "unit_money",
            "customer_name", "customer_name_phone", "age",
            "Province_customer", "District_customer", "Ward_customer", "detail_address_customer",
            "Province_of_receipt", "District_of_receipt", "Ward_of_receipt", "Detail_Place_of_receipt",
            "shippingUnitId", "From_address",
            "To_address", "shipping_Cost", "Mode_of_payment"
        ]
        let check = true
        const re = /^[0-9\b]+$/;
        const regxPhone = /^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/;


        if (userdata[arr[0]] === "sản phẩm") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[0]] = false
            setValidInput(_validInput)
            toast.error(`Empty input ${arr[0]}`)
            return;
        }
        if (userdata[arr[1]] && !re.test(userdata[arr[1]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[1]] = false
            setValidInput(_validInput)
            toast.error("number only or number greater than 0")
            return;
        }

        if (+userdata[arr[1]] > +numberProduct) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[1]] = false
            setValidInput(_validInput)
            toast.error("numberProduct selected  greater than numberProduct in warehouse")
            return
        }
        if (userdata[arr[3]] && !re.test(userdata[arr[3]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[3]] = false
            setValidInput(_validInput)
            toast.error("money is number only or money greater than 0")
            return;
        }
        if (userdata[arr[4]] && !re.test(userdata[arr[4]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[4]] = false
            setValidInput(_validInput)
            toast.error("price_drop is number only or price_drop greater than 0")
            return;

        }

        if (userdata[arr[6]] && !re.test(userdata[arr[6]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[6]] = false
            setValidInput(_validInput)
            toast.error("paid is number only")
            return;

        }
        if (userdata[arr[7]] < 0) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[7]] = false
            setValidInput(_validInput)
            toast.error("total money is number only greater than 0")
            return;

        }

        if (userdata[arr[11]] && !regxPhone.test(userdata[arr[11]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[11]] = false
            setValidInput(_validInput)
            toast.error("please enter a valid Phone Number")
            return;

        }

        if (userdata[arr[12]] && !re.test(userdata[arr[12]])) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[12]] = false
            setValidInput(_validInput)
            toast.error("age is number only")
            return;

        }
        if (userdata[arr[10]] && userdata[arr[10]] === "Tỉnh/thành phố") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[10]] = false
            setValidInput(_validInput)
            toast.error("Empty Province customer")
            return;

        }
        if (userdata[arr[12]] && userdata[arr[12]] === "Quận/huyện") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[12]] = false
            setValidInput(_validInput)
            toast.error("Empty District customer")
            return;

        }
        if (userdata[arr[13]] && userdata[arr[13]] === "Phường/xã") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[13]] = false
            setValidInput(_validInput)
            toast.error("Empty Ward customer")
            return;

        }

        if (userdata[arr[15]] && userdata[arr[15]] === "Tỉnh/thành phố") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[15]] = false
            setValidInput(_validInput)
            toast.error("Empty Province Of Receipt")
            return;

        }
        if (userdata[arr[16]] && userdata[arr[16]] === "Quận/huyện") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[16]] = false
            setValidInput(_validInput)
            toast.error("Empty District Of Receipt")
            return;

        }
        if (userdata[arr[17]] && userdata[arr[17]] === "Phường/xã") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput[arr[17]] = false
            setValidInput(_validInput)
            toast.error("Empty Ward Of Receipt")
            return;

        }
        if (userdata[arr[25]] === "Nhận tiền thanh toán qua tài khoản ngân hàng" && !userdata.name_account) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.name_account = false
            setValidInput(_validInput)
            toast.error("can not empty Account name")
            return;
        }
        if (userdata[arr[25]] === "Nhận tiền thanh toán qua tài khoản ngân hàng" && !userdata.Bank_name) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.Bank_name = false
            setValidInput(_validInput)
            toast.error("can not empty Bank name")
            return;
        }
        if (userdata[arr[25]] === "Nhận tiền thanh toán qua tài khoản ngân hàng" && !userdata.Main_Account) {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.Main_Account = false
            setValidInput(_validInput)
            toast.error("can not empty Main Account")
            return;
        }
        if (userdata[arr[25]] === "Lựa chọn") {
            let _validInput = _.cloneDeep(ValidInputsDefault);
            _validInput.Main_Account = false
            setValidInput(_validInput)
            toast.error(" Empty Mode_of_payment !!!")
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            if (!userdata[arr[i]]) {
                let _validInput = _.cloneDeep(ValidInputsDefault);
                _validInput[arr[i]] = false
                setValidInput(_validInput)
                toast.error(`Empty input ${arr[i]}`)

                check = false
                break
            }

        }
        return check
    }


    const getNumberProduct = async (id) => {
        setId(id)
        if (id !== "sản phẩm") {
            let res = await getNumberProductinWarehouse(id)
            if (res && +res.EC === 0) {
                setNumberProduct(res.DT?.product_number)

            }
        } else {
            setNumberProduct("")
        }

    }

    const handleConfirmUser = async () => {
        console.log(userdata)
        let check = checkValueDate();

        if (check === true && previreImage.length === 0) {
            toast.error("please add image !!!")

        }
        if (check === true && previreImage.length > 0 && selecCheckSubtmitImage === false) {
            toast.error("please save image !!!")
            return
        }

        if (check === true && previreImage && previreImage.length > 0 && selecCheckSubtmitImage === true) {

            let res =

                await CreateProject({ ...userdata })

            if (res && +res.EC === 0) {
                await createNotification(res.DT.id, res.DT.order, "thêm mới", "", res.DT.createdBy, 1, 0, userdata.shippingUnitId)

                if (userdata && userdata.number > 0) {

                    let number = +numberProduct - +userdata.number

                    let dataOne = await updateNumberProductInWarehouse(+id, +number)
                    if (dataOne && +dataOne.EC === 0) {
                        setSelecCheckSubtmitImage(false)
                        setUserdata(defaultUserData)
                        setprevireImage("")
                        setNumberProduct("")
                        history.push("/Products")

                    }

                    setOrder(`#-${orderNumber}`)


                } else {
                    toast.error("bạn gặp vấn đề , vui lòng kiểm tra lại thông tin")
                    return;

                }





            }

        }
    }





    const getnameProduct = async () => {
        let res = await getNameProduct()
        if (res && +res.EC === 0) {
            console.log("res", res.DT)

            let data = res.DT.filter(item => item.productstatuss_id !== 3 && item.productstatuss_id !== 2 && item.createdBy === user.account.phone)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            SetProduct(data)
        }
    }




    const handleOnchangeImage = async (value) => {
        const fileArray = Array.from(value).map((file) => URL.createObjectURL(file))

        setimage(value)
        setprevireImage(fileArray)

    }


    const handleOnchangeProvinceOfReceipt = async (value) => {
        setSelectProvince(value)
        if (value) {
            let res = await fetchDistrictByProvince(value)


            if (res && +res.EC === 0) {
                setassignDistrictByProvinceOfReceipt(res?.DT)

            }

        }
    }



    const handleOnchangeProviceCustomer = async (value) => {
        // setSelectProvince(value)
        if (value) {
            let res = await fetchDistrictCustomerByProvinceCustomer(value)


            if (res && +res.EC === 0) {
                setassignDistrictByProvince(res?.DT
                )

            }

        }
    }

    const handleOnchangeDistrictOfReceipt = async (value) => {
        if (value) {
            let res = await fetchWardByDistrict(value)
            if (res && +res.EC === 0) {
                setassignWardtByDistricOfReceipt(res?.DT)
            }


        }
    }

    const handleOnchangeDistrict = async (value) => {

        if (value) {
            let res = await fetchWarCustomerdByDistrictCustomer(value)

            if (res && +res.EC === 0) {

                setassignWardtByDistric(res?.DT
                )

            }

        }
    }

    const handleOnchangeShippingUnit = async (value) => {
        setSelectShippingCost(value)
        if (value) {
            let res = await fetchShippingCostByShippingUnit(value)

            if (res && +res.EC === 0) {
                setassignShippingCostByShippingunit(res?.DT
                )

            }

        }
    }


    const handleRenderCost = async (From, to, shippingUnit_Id) => {

        if (From, to, +shippingUnit_Id) {



            let res = await getPriceByAddress(From, to, +shippingUnit_Id)
            if (res && +res.EC === 0) {
                setshippingCost(res?.DT?.Cost)
            }


        }
    }
    const getAllSaleChannel = async () => {
        let res = await getSaleChannel()
        if (res && +res.EC === 0) {
            setSaleChannel(res.DT)

        } else {
            toast.error(res.EM)

        }
    }

    const getAllStastusPayment = async () => {
        let res = await getStastusPayment()
        if (res && +res.EC === 0) {
            setStatusPayment(res.DT)

        } else {
            toast.error(res.EM)

        }
    }


    const getProvinceCustomer = async () => {
        let res = await getAllProvinceCustomer()
        if (res && +res.EC === 0) {
            setAllProvinceCustomer(res.DT)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }

        } else {
            toast.error(res.EM)

        }
    }
    const getProvince = async () => {
        let res = await getAllProvince()
        if (res && +res.EC === 0) {
            setAllProvince(res.DT)

        } else {
            toast.error(res.EM)

        }
    }
    const getAddressFrom = async () => {
        let res = await getAddress_from()
        if (res && +res.EC === 0) {
            setAllAddressFrom(res.DT)

        } else {
            toast.error(res.EM)

        }
    }
    const getAddressTo = async () => {
        let res = await getAddress_to()
        if (res && +res.EC === 0) {
            setAllAddressTo(res.DT)

        } else {
            toast.error(res.EM)

        }
    }
    const getShippingUnit = async () => {
        let res = await getAllShippingUnit()
        if (res && +res.EC === 0) {
            setShippingUnit(res.DT)

        } else {
            toast.error(res.EM)

        }
    }

    const handleOnchangeInput = async (value, name) => {
        let _userdata = _.cloneDeep(userdata)
        _userdata[name] = value

        setUserdata(_userdata)

    }

    const handleSubmitImage = async (e) => {

        e.preventDefault();
        const formData = new FormData();

        for (let i = 0; i < image.length; i++) {

            formData.append('multiple_image', image[i]);


        }
        formData.append("order", userdata.order);


        fetch("https://huyle-backend-app.onrender.comapi/v6/upload-multiple-pic", {
            method: "POST",
            body: formData,

        }).then((res) => res.status === 500 ? toast.error(" địnhg dạng ảnh không đúng hoặc dung lượng ảnh quá lớn") : toast.success(`Đã thêm ${previreImage.length} ảnh thành công vào đơn hàng`));

        setSelecCheckSubtmitImage(true)
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }



    const handleDeleteImage = (link) => {

        let numberdeleteImage = []
        for (let i = 0; i < previreImage.length; i++) {
            if (previreImage[i] === link) {
                numberdeleteImage.push(i)
            }
        }

        let abc = Object.values(image);
        let resultImage = abc.filter(item => item !== abc[numberdeleteImage])
        setimage(resultImage)

        let result = previreImage.filter(item => item !== link)
        setprevireImage(result)
    }






    useEffect(() => {
        getProvinceCustomer()
        getProvince()
        getShippingUnit()
        getAddressFrom()
        getAddressTo()
        getAllSaleChannel()
        getAllStastusPayment()
        getnameProduct()
        handleRenderCost()
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }, [])




    return (
        <div className='Modal-container'>
            <div className='container'>
                <div className='navigate col-12 col-lg-6 mt-3'>
                    <Link to="/"> Home</Link>

                    <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </span>
                    <Link to="/CreateNewOrder"> Create new Order </Link>
                </div>

                <button className='btn btn-primary btn-BackPage my-3'>
                    <span>
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </span>
                    <Link to="/Products">
                        {t('detail.tittle')}
                    </Link>
                </button>

                <div className='body-modal'>
                    <div className='container'>
                        <div className='row'>
                            <div className='title col-12'>
                                {t('CreateProduct.tittleOne')}
                            </div>
                            <h4 className='order '>
                                <span className='mx-2 name-order' >
                                    {t('CreateProduct.tittleEighteen')}
                                </span>
                                <span className='name-order_number'
                                >{order ? userdata.order = order : "Đang cập nhật"}</span>
                            </h4>

                            <hr />
                            <div className='container'>
                                <div className='row'>
                                    <div className='left-table col-12 '>

                                        <div className='create-product '

                                        >
                                            <h4 className='mb-3 d-flex align-item-center justify-content-center' style={{ fontSize: "18px" }}>
                                                {t('CreateProduct.tittleNineteen')}
                                            </h4>
                                            <div className='row'>
                                                <div className='name-product col-12 col-lg-5 mb-2'>
                                                    <label htmlFor='input-name-product' className='mb-2' >
                                                        {t('CreateProduct.tittleTwo')} (<span className='red'>*</span>)</label>

                                                    <select
                                                        style={{ fontWeight: "700" }}
                                                        className={validInput.name_Product ? "form-select " : "form-select  is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "name_Product")}
                                                        onClick={(event) => { getNumberProduct(event.target.value); }}
                                                        value={userdata.name_Product}
                                                    >

                                                        <option value="sản phẩm">Chọn sản phẩm muốn bán</option>

                                                        {Product && Product.length > 0 &&
                                                            Product.map((item, index) => {


                                                                return (
                                                                    <option key={`Province - ${index}`} value={item.id} style={{ fontWeight: "700" }}>
                                                                        Id sản phẩm  {item.id} : {item.product}
                                                                    </option>

                                                                )
                                                            })
                                                        }

                                                    </select >
                                                    {Product && Product.length === 0 &&
                                                        <label htmlFor='input-name-product' className='mb-2'  >
                                                            <b>{t('CreateProduct.tittleTwenty')} </b>
                                                            <br />
                                                            <Link to="/Warehouse">
                                                                <i className="fa fa-wrench" aria-hidden="true"></i>
                                                                <span className='mx-2'>
                                                                    {t('CreateProduct.tittleTwentyOne')}
                                                                </span>
                                                            </Link>

                                                        </label>
                                                    }

                                                </div>
                                                <div className='number-product col-12 col-lg-4 mb-2'>
                                                    <label htmlFor='input-number-product' className='mb-2' >
                                                        {t('CreateProduct.tittleThree')} (<span className='red'>*</span>)</label>
                                                    <input
                                                        id='input-number-product'
                                                        type="text"
                                                        min="1" max="9999"
                                                        className={validInput.number ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.number}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "number")}

                                                    />

                                                    {numberProduct > 0 &&
                                                        <label htmlFor='input-number-product' className='mb-2'>
                                                            {t('CreateProduct.tittleTwentyTwo')} <b>{numberProduct ? numberProduct : ""} </b></label>

                                                    }
                                                    {numberProduct === 0 &&
                                                        <label htmlFor='input-number-product' className='mb-2' >
                                                            {t('CreateProduct.tittleTwentyTwo')}
                                                            <b> {t('CreateProduct.tittleTwentyThree')} </b></label>

                                                    }

                                                </div>
                                                <div className='unit col-12 col-lg-3 mb-2'>
                                                    <label htmlFor='input-product'>
                                                        {t('CreateProduct.tittleFour')}
                                                    </label>
                                                    <select
                                                        readOnly
                                                        className={validInput.unit ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "unit")}
                                                        value={userdata.unit}
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
                                                <div className='number-product col-12 mb-2'>
                                                    <label htmlFor='input-number-product' className='mb-2' >
                                                        {t('CreateProduct.tittleFive')} (<span className='red'>*</span>)
                                                    </label>
                                                    <select
                                                        className={validInput.salesChannel ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "salesChannel")}
                                                        value={userdata.salesChannel}


                                                    >
                                                        <option defaultValue="Phường/xã">...</option>
                                                        {SaleChannel && SaleChannel.length > 0 &&
                                                            SaleChannel.map((item, index) => {
                                                                return (
                                                                    <option key={`SaleChannel-${index}`} value={item.id}>{item.name}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >
                                                </div>

                                                <div className='money-product col-12 col-lg-6'>
                                                    <label htmlFor='input-money-product' className='mb-2' >
                                                        {t('CreateProduct.tittleSix')} (<span className='red'>*</span>)</label>
                                                    <input
                                                        id='input-money-product'
                                                        type="text"
                                                        min="1" max="9999"
                                                        className={validInput.money ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.money}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "money")}

                                                    />
                                                </div>
                                                <div className='total-product col-12 col-lg-6'>
                                                    <label htmlFor='input-total-product' className='mb-2' >
                                                        {t('CreateProduct.tittleSeven')}
                                                    </label>
                                                    <input
                                                        id='input-total-product'
                                                        type="text"
                                                        min="1" max="9999"
                                                        className={validInput.price_drop ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.price_drop}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "price_drop")}

                                                    />
                                                </div>
                                                <div className='StatusPayment col-12 col-lg-6 mb-1'>
                                                    <label htmlFor='input-StatusPayment' className='mb-2' >
                                                        {t('CreateProduct.tittleEight')} (<span className='red'>*</span>)</label>
                                                    <select
                                                        className={validInput.StatusPaymentId ? "form-select " : "form-select  is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "StatusPaymentId")}
                                                        value={userdata.StatusPaymentId}


                                                    >
                                                        <option defaultValue="Phường/xã">Chọn trạng thái thanh toán</option>
                                                        {StatusPayment && StatusPayment.length > 0 &&
                                                            StatusPayment.map((item, index) => {
                                                                return (
                                                                    <option key={`SaleChannel-${index}`} value={item.id}>{item.status}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >
                                                </div>
                                                {userdata.StatusPaymentId === "3" &&
                                                    <div className='total-product col-12 col-lg-6'>
                                                        <label htmlFor='input-total-product' className='mb-2' >
                                                            {t('CreateProduct.tittleTwentyFour')}
                                                        </label>
                                                        <input
                                                            id='input-total-product'
                                                            type="text"
                                                            min="1" max="9999"
                                                            className={validInput.paid ? "form-control" : "form-control is-invalid"}
                                                            value={userdata.paid}
                                                            onChange={(event) => handleOnchangeInput(event.target.value, "paid")}

                                                        />
                                                    </div>

                                                }
                                                {userdata.StatusPaymentId === "2" &&
                                                    <div className='total-product col-12 col-lg-6'>
                                                        <label htmlFor='input-total-product' className='mb-2' >
                                                            {t('CreateProduct.tittleTwentyFour')}
                                                        </label>
                                                        <input
                                                            id='input-total-product'
                                                            type="text"
                                                            min="1" max="9999"
                                                            className={validInput.paid ? "form-control" : "form-control is-invalid"}
                                                            value={userdata.paid = "0"}
                                                            onChange={(event) => handleOnchangeInput(event.target.value, "paid")}

                                                        />
                                                    </div>

                                                }
                                                {userdata.StatusPaymentId === "1" &&
                                                    <div className='total-product col-12 col-lg-6'>
                                                        <label htmlFor='input-total-product' className='mb-2' >
                                                            {t('CreateProduct.tittleTwentyFour')}
                                                        </label>
                                                        <input
                                                            id='input-total-product'
                                                            type="text"
                                                            min="1" max="9999"
                                                            className={validInput.paid ? "form-control" : "form-control is-invalid"}
                                                            value={userdata.paid = Number(`${userdata.money}`) * Number(`${userdata.number}`) - Number(`${userdata.price_drop ? userdata.price_drop : "0"}`)}
                                                            onChange={(event) => handleOnchangeInput(event.target.value, "paid")}

                                                        />
                                                    </div>

                                                }

                                                <div className='total-product col-12 col-lg-6'>
                                                    <label htmlFor='input-total-product' className='mb-2' >
                                                        {t('CreateProduct.tittleNight')} <b>{userdata.number}</b> {t('CreateProduct.tittleTwentyFive')} </label>
                                                    <input
                                                        id='input-total-product'
                                                        type="text"

                                                        className={validInput.total ? "form-control" : "form-control is-invalid"}
                                                        disabled
                                                        value={Number(`${userdata.money}`) * Number(`${userdata.number}`) - Number(`${userdata.price_drop ? userdata.price_drop : "0"}`) - Number(`${userdata.paid ? userdata.paid : "0"}`)
                                                            ? userdata.total = Number(`${userdata.money}`) * Number(`${userdata.number}`) - Number(`${userdata.price_drop ? userdata.price_drop : "0"}`) - Number(`${userdata.paid ? userdata.paid : "0"}`)
                                                            : userdata.total = "0"
                                                        }

                                                    />
                                                </div>


                                                <div className='unitMoney col-12 col-lg-6 mb-2'>
                                                    <label htmlFor='input-product'>
                                                        {t('CreateProduct.tittleTen')}
                                                    </label>
                                                    <select
                                                        className={validInput.unit_money ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "unit_money")}
                                                        value={userdata.unit_money}
                                                    >
                                                        <option value="Đơn vị">Lựa chọn </option>
                                                        <option value="VND">VND</option>
                                                        <option value="USD">USD</option>
                                                        <option value="RMB">RMB</option>




                                                    </select >
                                                </div>


                                                <div className='unitMoney col-12 col-lg-6 mb-2'>
                                                    <label htmlFor='input-product'>
                                                        {t('CreateProduct.tittleTwelve')}
                                                    </label>
                                                    <select
                                                        className={validInput.Mode_of_payment ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "Mode_of_payment")}
                                                        value={userdata.Mode_of_payment}
                                                    >
                                                        <option value="Lựa chọn">Lựa chọn </option>
                                                        <option value="Nhận tiền thanh toán ở trung tâm">Nhận tiền ở trung tâm giao dịch</option>
                                                        <option value="Nhận tiền thanh toán qua tài khoản ngân hàng">Nhận tiền qua tài khoản ngân hàng</option>




                                                    </select >
                                                </div>
                                                {userdata.Mode_of_payment === "Nhận tiền thanh toán qua tài khoản ngân hàng"

                                                    &&
                                                    <>

                                                        <div className='total-product col-12 col-lg-6'>
                                                            <label htmlFor='input-total-product' className='mb-2' >
                                                                {t('CreateProduct.tittleThirteen')}
                                                            </label>
                                                            <input
                                                                id='input-total-product'
                                                                type="text"
                                                                className={validInput.name_account ? "form-control" : "form-control is-invalid"}
                                                                value={userdata.name_account}
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "name_account")}

                                                            />

                                                        </div>

                                                        <div className='unitMoney col-12 col-lg-6 mb-2'>
                                                            <label htmlFor='input-product'>
                                                                {t('CreateProduct.tittleFourteen')}
                                                            </label>
                                                            <select
                                                                className={validInput.Bank_name ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "Bank_name")}
                                                                value={userdata.Bank_name}
                                                            >
                                                                <option value="Lựa chọn ">Lựa chọn </option>
                                                                <option value="Vietcombank">Vietcombank</option>
                                                                <option value="Vietinbank">Vietinbank</option>
                                                                <option value="Agribank">Agribank</option>
                                                                <option value="Techcombank">Techcombank</option>
                                                                <option value="Tpbank">Tpbank</option>
                                                                <option value="Vpbank">Vpbank</option>
                                                                <option value="Mbbank">Mbbank</option>
                                                                <option value="Oceanbank">Oceanbank</option>
                                                                <option value="Bidv">Bidv</option>
                                                                <option value="Acbbank">Acbbank</option>
                                                                <option value="Sacombank">Sacombank</option>
                                                                <option value="VIB">VIB</option>
                                                            </select >
                                                        </div>
                                                        <div className='total-product col-12 col-lg-6'>
                                                            <label htmlFor='input-total-product' className='mb-2' >
                                                                {t('CreateProduct.tittleFifteen')}
                                                            </label>
                                                            <input
                                                                id='input-total-product'
                                                                type="text"
                                                                className={validInput.Main_Account ? "form-control" : "form-control is-invalid"}
                                                                value={userdata.Main_Account}
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "Main_Account")}

                                                            />

                                                        </div>
                                                    </>
                                                }

                                            </div>

                                        </div>
                                        <div className='create-customer my-5 '>
                                            <h4 className='mb-4 d-flex align-item-center justify-content-center'>
                                                {t('CreateProduct.Customer.tittleOne')}

                                            </h4>
                                            <div className='row'>
                                                <div className='name-customer col-12 col-lg-6 mb-2'>
                                                    <label htmlFor='input-name-customer' className='mb-2' >
                                                        {t('CreateProduct.Customer.tittleTwo')}

                                                        (<span className='red'>*</span>)</label>
                                                    <input
                                                        id='input-name-customer'
                                                        type="text"
                                                        className={validInput.customer_name ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.customer_name}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "customer_name")}

                                                    />
                                                </div>
                                                <div className='phone-customer col-12 col-lg-6 mb-2'>
                                                    <label htmlFor='input-phone-customer' className='mb-2' >
                                                        {t('CreateProduct.Customer.tittleThree')} (<span className='red'>*</span>)</label>
                                                    <input
                                                        id='input-phone-customer'
                                                        type="text"
                                                        className={validInput.customer_name_phone ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.customer_name_phone}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "customer_name_phone")}

                                                    />
                                                </div>
                                                <div className='note-customer col-12 mb-2'>
                                                    <label htmlFor='input-note-customer' className='mb-2' >
                                                        {t('CreateProduct.Customer.tittleFour')}
                                                    </label>
                                                    <input
                                                        id='input-note-customer'
                                                        type="text"
                                                        className='form-control'
                                                        value={userdata.note}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "note")}

                                                    />
                                                </div>
                                                <div className='age-customer col-12 col-lg-6'>
                                                    <label htmlFor='input-age-customer' className='mb-2' >
                                                        {t('CreateProduct.Customer.tittleFive')}

                                                    </label>
                                                    <input
                                                        id='input-age-customer'
                                                        type="text"
                                                        className={validInput.age ? "form-control" : "form-control is-invalid"}
                                                        value={userdata.age}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "age")}

                                                    />
                                                </div>
                                                <div className='address-customer col-12 col-lg-6'>
                                                    <label htmlFor='select-address-product' >
                                                        {t('CreateProduct.Customer.tittleSix')} (<span className='red'>*</span>)
                                                    </label>
                                                    <select
                                                        id='select-address-product'
                                                        className={validInput.Province_customer ? "form-select my-2" : "form-select my-2 is-invalid"}

                                                        onChange={(event) => { handleOnchangeProviceCustomer(event.target.value); handleOnchangeInput(event.target.value, "Province_customer") }}
                                                        value={userdata.Province_customer}

                                                    >
                                                        <option defaultValue="Tỉnh/thành phố">Tỉnh/thành phố</option>


                                                        {allProvinceCutomer && allProvinceCutomer.length > 0 &&
                                                            allProvinceCutomer.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item.id}>{item.name}</option>

                                                                )
                                                            })
                                                        }
                                                    </select >
                                                    <select
                                                        className={validInput.District_customer ? "form-select my-2" : "form-select my-2 is-invalid"}

                                                        onChange={(event) => { handleOnchangeDistrict(event.target.value); handleOnchangeInput(event.target.value, "District_customer") }}
                                                        value={userdata.District_customer}

                                                    >
                                                        <option defaultValue="Quận/huyện">Quận/huyện</option>
                                                        {assignDistrictByProvince && assignDistrictByProvince.length > 0
                                                            &&
                                                            assignDistrictByProvince.map((item, index) => {
                                                                return (
                                                                    <option key={`District - ${index}`} value={item?.Districtcustomers?.id}>{item?.Districtcustomers?.name}</option>

                                                                )
                                                            })
                                                        }
                                                    </select >
                                                    <select
                                                        className={validInput.Ward_customer ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "Ward_customer")}
                                                        value={userdata.Ward_customer}


                                                    >
                                                        <option defaultValue="Phường/xã">Phường/xã</option>
                                                        {assignWardtByDistric && assignWardtByDistric.length > 0 &&
                                                            assignWardtByDistric.map((item, index) => {
                                                                return (
                                                                    <option key={`Ward - ${index}`} value={item?.Wardcustomers?.id}>{item?.Wardcustomers?.name}</option>

                                                                )
                                                            })
                                                        }
                                                    </select >
                                                    <input
                                                        id='input-total-product'
                                                        type="text"
                                                        className={validInput.detail_address_customer ? "form-control" : "form-control is-invalid"}
                                                        placeholder='địa chỉ chi tiết '
                                                        value={userdata.detail_address_customer}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "detail_address_customer")}

                                                    />
                                                </div>

                                            </div>


                                        </div>

                                        <div className='create-note my-3'>
                                            <h5 className='mb-4 d-flex align-item-center justify-content-center'>
                                                {t('CreateProduct.Additional information.tittleOne')}
                                            </h5>
                                            <div className='row'>
                                                <div className=' col-12 mb-2'>
                                                    <label htmlFor='input-name-customer' className='mb-2' >
                                                        {t('CreateProduct.Additional information.tittleTwo')}
                                                    </label>
                                                    <input
                                                        id='input-name-customer'
                                                        type="text"
                                                        className='form-control'
                                                        value={userdata.Note_More}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "Note_More")}

                                                    />
                                                </div>






                                            </div>

                                        </div>

                                        <div className='user-create '>
                                            <h5 className='mb-4 d-flex align-item-center justify-content-center'>
                                                {t('CreateProduct.Creator.tittle')}
                                            </h5>
                                            <div className='row'>
                                                <div className=' col-6 mb-2'>
                                                    <label htmlFor='input-name-customer' className='mb-2' >
                                                        {t('CreateProduct.Creator.tittleOne')}

                                                    </label>
                                                    {user &&

                                                        <input
                                                            id='input-name-customer'
                                                            type="text"
                                                            className='form-control'
                                                            disabled
                                                            value={user.account.usersname}

                                                        />
                                                    }
                                                </div>
                                                <div className=' col-6 mb-2'>
                                                    <label htmlFor='input-name-customer' className='mb-2' >
                                                        {t('CreateProduct.Creator.tittleTwo')}
                                                    </label>
                                                    {user &&

                                                        <input
                                                            id='input-name-customer'
                                                            type="text"
                                                            className='form-control'
                                                            disabled
                                                            value={user.account.phone}

                                                        />
                                                    }
                                                </div>

                                                <div className=' col-12 mb-2'>
                                                    <label htmlFor='delivery_From' className='mb-2' >
                                                        {t('CreateProduct.Creator.tittleThree')} (<span className='red'>*</span>)
                                                    </label>
                                                    <select
                                                        id='select-address-product'
                                                        className={validInput.Province_of_receipt ? "form-select my-2" : "form-select my-2 is-invalid"}

                                                        onChange={(event) => {
                                                            handleOnchangeProvinceOfReceipt(event.target.value);
                                                            handleOnchangeInput(event.target.value, "Province_of_receipt")
                                                        }}
                                                        value={userdata.Province_of_receipt}

                                                    >
                                                        <option defaultValue="Tỉnh/thành phố">Tỉnh/thành phố</option>


                                                        {allProvince && allProvince.length > 0 &&
                                                            allProvince.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item.id}>{item.name}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >

                                                    <select
                                                        id='select-address-product'
                                                        className={validInput.District_of_receipt ? "form-select my-2" : "form-select my-2 is-invalid"}

                                                        onChange={(event) => {
                                                            handleOnchangeDistrictOfReceipt(event.target.value);
                                                            handleOnchangeInput(event.target.value, "District_of_receipt")
                                                        }}
                                                        value={userdata.District_of_receipt}


                                                    >
                                                        <option defaultValue="Quận/huyện">Quận/huyện</option>
                                                        {assignDistrictByProvinceOfReceipt && assignDistrictByProvinceOfReceipt.length > 0 &&
                                                            assignDistrictByProvinceOfReceipt.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item?.Addressdistricts?.id}>{item?.Addressdistricts?.name}</option>

                                                                )
                                                            })
                                                        }
                                                    </select >
                                                    <select
                                                        className={validInput.Ward_of_receipt ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "Ward_of_receipt")}
                                                        value={userdata.Ward_of_receipt}


                                                    >
                                                        <option defaultValue="Phường/xã">Phường/xã</option>
                                                        {assignWardtByDistricOfReceipt && assignWardtByDistricOfReceipt.length > 0 &&
                                                            assignWardtByDistricOfReceipt.map((item, index) => {
                                                                return (
                                                                    <option key={`Province - ${index}`} value={item?.Addresswards?.id}>{item?.Addresswards?.name}</option>

                                                                )
                                                            })
                                                        }



                                                    </select >

                                                    <input
                                                        id='input-total-product'
                                                        type="text"
                                                        className={validInput.Detail_Place_of_receipt ? "form-control" : "form-control is-invalid"}
                                                        placeholder='địa chỉ gửi hàng chi tiết '
                                                        value={userdata.Detail_Place_of_receipt}
                                                        onChange={(event) => handleOnchangeInput(event.target.value, "Detail_Place_of_receipt")}

                                                    />
                                                </div>

                                                <div className='create-delivery my-3 '>
                                                    <h5 className='mb-4 d-flex align-item-center justify-content-center'>
                                                        {t('CreateProduct.Delivery information.tittleOne')}
                                                    </h5>
                                                    <div className='row'>
                                                        <div className=' col-12 mb-2'>

                                                            <label htmlFor='delivery_unit' className='mb-2' >
                                                                {t('CreateProduct.Delivery information.tittleTwo')} (<span className='red'>*</span>)
                                                            </label>
                                                            <select
                                                                className={validInput.shippingUnitId ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                                onChange={(event) => { handleOnchangeShippingUnit(event.target.value); handleOnchangeInput(event.target.value, "shippingUnitId") }}
                                                                onClick={() => handleRenderCost(userdata.From_address, userdata.To_address, +selectShippingCost)}

                                                                value={userdata.shippingUnitId}


                                                            >
                                                                <option defaultValue="Phường/xã">Lựa chọn đơn vị giao hàng</option>

                                                                {shippingUnit && shippingUnit.length > 0 &&
                                                                    shippingUnit.map((item, index) => {
                                                                        return (
                                                                            <option key={`Province - ${index}`} value={item.id}>{item.NameUnit}</option>

                                                                        )
                                                                    })
                                                                }



                                                            </select >

                                                        </div>

                                                        <div className=' col-12 mb-2'>
                                                            <label htmlFor='delivery_From' className='mb-2' >
                                                                {t('CreateProduct.Delivery information.tittleThree')} (<span className='red'>*</span>)
                                                            </label>
                                                            <select
                                                                className={validInput.From_address ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "From_address")}
                                                                onClick={() => handleRenderCost(userdata.From_address, userdata.To_address, +selectShippingCost)}

                                                                value={userdata.From_address}


                                                            >
                                                                <option defaultValue="Phường/xã">Nơi gửi hàng</option>
                                                                {allAddressFrom && allAddressFrom.length > 0 &&
                                                                    allAddressFrom.map((item, index) => {
                                                                        return (
                                                                            <option key={`Province - ${index}`} value={item.name}>{item.name}</option>

                                                                        )
                                                                    })
                                                                }
                                                            </select >


                                                        </div>

                                                        <div className=' col-12 mb-2'>
                                                            <label htmlFor='delivery_To' className='mb-2' >
                                                                {t('CreateProduct.Delivery information.tittleFour')} (<span className='red'>*</span>)
                                                            </label>
                                                            <select
                                                                className={validInput.To_address ? "form-select my-2" : "form-select my-2 is-invalid"}
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "To_address")}
                                                                onClick={() => handleRenderCost(userdata.From_address, userdata.To_address, +selectShippingCost)}

                                                                value={userdata.To_address}


                                                            >
                                                                <option defaultValue="Phường/xã">Nơi nhận hàng</option>
                                                                {allAddressTo && allAddressTo.length > 0 &&
                                                                    allAddressTo.map((item, index) => {
                                                                        return (
                                                                            <option key={`Province - ${index}`} value={item.name}>{item.name}</option>

                                                                        )
                                                                    })
                                                                }
                                                            </select >
                                                        </div>
                                                        <div className=' col-12 mb-2'>
                                                            <label htmlFor='delivery_To' className='mb-2' >
                                                                {t('CreateProduct.Delivery information.tittleFive')}
                                                            </label>

                                                            <input
                                                                id='elivery_To'
                                                                type="text"
                                                                disabled
                                                                className='form-control'
                                                                onChange={() => handleOnchangeInput(shippingCost, "shipping_Cost")}
                                                                value={shippingCost ? userdata.shipping_Cost = shippingCost : "Đang cập nhật"
                                                                }

                                                            />




                                                        </div>
                                                        <div className=' col-12 mb-2'>
                                                            <label htmlFor='delivery_To' className='mb-2' >
                                                                {t('CreateProduct.Delivery information.tittleSix')}
                                                            </label>

                                                            <input
                                                                id='elivery_To'
                                                                type="text"
                                                                disabled
                                                                className='form-control'
                                                                onChange={(event) => handleOnchangeInput(event.target.value, "totalWithShippingCost")}
                                                                value={userdata.shipping_Cost && userdata.total
                                                                    ?
                                                                    userdata.totalWithShippingCost = Number(`${userdata.shipping_Cost}`) + Number(`${userdata.total}`)
                                                                    : userdata.totalWithShippingCost = "Đang cập nhật"
                                                                }

                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                        </div>


                                        <div className='create-image d-none d-lg-block col-lg-12 mt-3 '>
                                            <div className='row'>

                                                <h4 className=' d-flex align-item-center justify-content-center col-12 '>
                                                    {t('CreateProduct.Upload image.tittleOne')}
                                                </h4>
                                                {selecCheckSubtmitImage === true &&
                                                    <div className=' d-flex align-item-center justify-content-center '>
                                                        {t('CreateProduct.Upload image.tittleThree')} <h5 className='mx-2'>{previreImage.length}</h5> {t('CreateProduct.Upload image.tittleFour')}
                                                    </div>}
                                                <div className='image-product col-12 '>
                                                    <div className='container'>
                                                        <form
                                                            onSubmit={handleSubmitImage}
                                                            method='POST'
                                                            encType='multipart/form-data'
                                                            action='upload-multiple-pic'
                                                        >
                                                            <div className='image col-12' style={{ width: "100%" }}>
                                                                <div className='row'>
                                                                    <div className='col-12 d-flex icon '>

                                                                        <input
                                                                            type="file"
                                                                            id='previewimage'
                                                                            name="multiple-image"
                                                                            multiple
                                                                            hidden
                                                                            onChange={(event) => handleOnchangeImage(event.target.files)}
                                                                        />
                                                                        <label
                                                                            htmlFor="previewimage"
                                                                            className='Update-image col-6 col-lg-3  d-flex align-item-center justify-content-center'>
                                                                            <span>
                                                                                <i className="fa fa-upload " aria-hidden="true"></i>
                                                                            </span>
                                                                            <span > {t('CreateProduct.Upload image.tittleTwo')}</span>

                                                                        </label>
                                                                        <div className='col-6'></div>
                                                                        {previreImage.length > 0 &&
                                                                            <button className='btn btn-success col-3'>
                                                                                <i className="fa fa-check" aria-hidden="true"></i>

                                                                                <span className='mx-2'>
                                                                                    {t('CreateProduct.Upload image.tittleFive')}
                                                                                </span>
                                                                            </button>


                                                                        }


                                                                    </div>

                                                                </div>

                                                                <div className=' container '>
                                                                    <div className='row d-flex justify-content-center gap-1'>

                                                                        {previreImage && previreImage.length > 0 &&
                                                                            previreImage.map((item, index) => {


                                                                                return (
                                                                                    <div className='preview-image  ' key={`image - ${index}`}

                                                                                        style={{ backgroundImage: `url(${item})`, height: "150px" }}
                                                                                    >
                                                                                        <div className='cancel' onClick={() => handleDeleteImage(item)} title="Delete Image">
                                                                                            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
                                                                                        </div>
                                                                                    </div>

                                                                                )
                                                                            })

                                                                        }

                                                                    </div>



                                                                </div>


                                                            </div>
                                                        </form>
                                                    </div>



                                                </div>


                                            </div>
                                        </div>
                                        <div className='create-image d-block d-lg-none col-lg-12 '>
                                            <div className='row'>

                                                <h4 className=' d-flex align-item-center justify-content-center col-12 '>
                                                    {t('CreateProduct.Upload image.tittleOne')}
                                                </h4>
                                                {selecCheckSubtmitImage === true &&
                                                    <div className=' d-flex align-item-center justify-content-center '>
                                                        {t('CreateProduct.Upload image.tittleThree')} <h5 className='mx-2'>{previreImage.length}</h5> {t('CreateProduct.Upload image.tittleFour')}
                                                    </div>}
                                                <div className='image-product col-12 '>
                                                    <div className='row'>
                                                        <form
                                                            onSubmit={handleSubmitImage}
                                                            method='POST'
                                                            encType='multipart/form-data'
                                                            action='upload-multiple-pic'
                                                        >
                                                            <div className='image col-12'>
                                                                <div className='row'>
                                                                    <div className='col-12  icon '>

                                                                        <input
                                                                            type="file"
                                                                            id='previewimage'
                                                                            name="multiple-image"
                                                                            multiple
                                                                            hidden
                                                                            onChange={(event) => handleOnchangeImage(event.target.files)}
                                                                        />
                                                                        <label
                                                                            htmlFor="previewimage"
                                                                            className='Update-image col-12  d-flex align-item-center justify-content-center'>
                                                                            <span>
                                                                                <i className="fa fa-upload " aria-hidden="true"></i>
                                                                            </span>
                                                                            <span > {t('CreateProduct.Upload image.tittleTwo')}</span>

                                                                        </label>
                                                                        {previreImage.length > 0 &&
                                                                            <button className='btn btn-success col-12 mt-3'>
                                                                                <i className="fa fa-check" aria-hidden="true"></i>

                                                                                <span className='mx-2'>
                                                                                    {t('CreateProduct.Upload image.tittleFive')}
                                                                                </span>
                                                                            </button>


                                                                        }


                                                                    </div>

                                                                </div>

                                                                <div className=' container '>
                                                                    <div className='row d-flex justify-content-center gap-1'>

                                                                        {previreImage && previreImage.length > 0 &&
                                                                            previreImage.map((item, index) => {


                                                                                return (
                                                                                    <div className='preview-image ' key={`image - ${index}`}

                                                                                        style={{ backgroundImage: `url(${item})`, height: "150px" }}
                                                                                    >
                                                                                        <div className='cancel' onClick={() => handleDeleteImage(item)} title="Delete Image">
                                                                                            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
                                                                                        </div>
                                                                                    </div>

                                                                                )
                                                                            })

                                                                        }

                                                                    </div>



                                                                </div>


                                                            </div>
                                                        </form>
                                                    </div>



                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className='comfirm-btn my-5'>
                                        <div className='container'>
                                            <div className='row d-flex align-item-center justify-content-around'>
                                                <button className='btn btn-primary col-12 col-md-3 mt-2' onClick={() => handleConfirmUser()}> {t('CreateProduct.tittleSeventeen')} </button>
                                                <button className='btn btn-danger col-12 col-md-3 mt-2' onClick={() => history.push("/Products")} > {t('CreateProduct.tittleSixteen')} </button>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div >


    );
}

export default CreateNewProduct;