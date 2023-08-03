import './Warehouse.scss'

import Sidebar from "../sidebar/sidebar"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { UserContext } from "../../contexApi/UserContext"
import { getAllNumberSatusProductInWarehouse, getDataSearchInWarehouse, getListWarehouseWithPaginationproductStatusId } from "../services/ProjectService"
import ReactPaginate from 'react-paginate';
import ModalCreateWarehouse from "./modalCreateWarehouse"
import ModalDeleteWarehouse from "./modalDeleteWarehouse"
import Lightbox from 'react-image-lightbox';
import * as XLSX from 'xlsx';
import moment from "moment"
import _, { assign, debounce } from "lodash"
import { Bars } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"

const Warehouse_status_productId3 = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    let history = useHistory()
    const { user } = React.useContext(UserContext);
    const [collapsed, setCollapsed] = useState(false)
    const [listWarehouse, setListWarehouse] = useState([])
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("Page three warehouse") ? localStorage.getItem("Page three warehouse") : 1

    )
    const [currentLimit, setCurrentLimit] = useState(8)
    const [totalPage, setTotalPage] = useState(0)
    const [action, setAction] = useState("")
    const [dataWarehouseEdit, setDataWarehouseEdit] = useState([])
    const [dataWarehouseRepeat, setDataWarehouseRepeat] = useState([])

    const [dataWarehouseDelete, setDataWarehouseDelete] = useState("")

    const [previreImage, setprevireImage] = useState("")

    const [showModalCreateWarehouse, setShowModalCreateWarehouse] = useState(false);
    const [showModalDeleteWarehouse, setShowModalDeleteWarehouse] = useState(false);
    const [allWarehouseLenght, setAllWarehouseLenght] = useState("")


    const [isOpen, setIsOpen] = useState(false)
    const [sortDataSearch, setSortDataSearch] = useState(false)
    const [isLoading, SetIsLoading] = useState(false)
    const [fieldSort, setFieldSort] = useState("")
    const [sorttime, setSortTime] = useState(false)
    const [sortProduct, setSortProduct] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const getAllInWarehouse = async () => {
        let res = await getAllNumberSatusProductInWarehouse(user.account.phone)
        if (res && +res.EC === 0) {
            setAllWarehouseLenght(res.DT)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
        }

    }


    const handleRefesh = async () => {
        await fetchProjectUser()
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }


    const handleShowhideModalCreateWarehouse = async () => {
        setShowModalCreateWarehouse(!showModalCreateWarehouse)
        setAction("Create")
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }

    const handleShowhideModalEditWarehouse = async (item) => {
        setShowModalCreateWarehouse(!showModalCreateWarehouse)
        setAction("Update")
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        setDataWarehouseEdit(item)

    }
    const handleShowhideModalEditWarehouseRepeat = async (item) => {
        setShowModalCreateWarehouse(!showModalCreateWarehouse)
        setAction("Repeat")
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        setDataWarehouseRepeat(item)

    }
    const handleShowhideModalDelteWarehouse = async (item) => {
        setAction("Delete")
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        setShowModalDeleteWarehouse(!showModalDeleteWarehouse)
        setDataWarehouseDelete(item)
    }
    const fetchProjectUser = async () => {
        let productStatusId = 3
        let res = await getListWarehouseWithPaginationproductStatusId(currentPage, currentLimit, user.account.phone, +productStatusId)
        if (res && +res.EC === 0) {
            setSortDataSearch(false)
            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProduct.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getListWarehouseWithPaginationproductStatusId(+res.DT.totalPage, currentLimit, user.account.phone, +productStatusId)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
            if (res.DT.totalPage > 0 && res.DT.dataProduct.length > 0) {
                let data = res.DT.dataProduct
                setListWarehouse(data)
                SetIsLoading(true)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProduct.length === 0) {
                setListWarehouse(res.DT.dataProduct)
                SetIsLoading(true)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        } else {
            SetIsLoading(false)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
        }
    }
    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
        localStorage.setItem("Page three warehouse", event.selected + 1)

    }
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        fetchProjectUser();
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', currentPage);
        currentUrlParams.set("limit", currentLimit);

        history.push(window.location.pathname + "?" + currentUrlParams.toString());

    }, [currentPage])
    const handleClickImage = (imagebase64) => {
        if (!imagebase64) return;
        setprevireImage(imagebase64)
        setIsOpen(true)
    };
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        fetchProjectUser();
    }, [currentPage])
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        getAllInWarehouse()
    }, [])

    const getDataWithcurrentPage = async () => {
        let productStatusId = 3

        let currentPageAfterRefesh = +localStorage.getItem("Page three warehouse")
        let res = await getListWarehouseWithPaginationproductStatusId(+currentPageAfterRefesh, +currentLimit, user.account.phone, +productStatusId)
        if (res && +res.EC === 0) {
            let data = res.DT.dataProduct
            if (data) {
                setListWarehouse(data)
                SetIsLoading(true)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        }
        else {
            SetIsLoading(false)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            toast.error(res.EM)
        }
    }



    useEffect(() => {
        window.history.pushState('', '', `?page=${localStorage.getItem("Page three warehouse")}&limit=${currentLimit}`);
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
        getDataWithcurrentPage()
    }, [window.location.reload])

    const handleExportData = () => {
        if (listWarehouse.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listWarehouse);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "listProduct");
            XLSX.writeFile(workbook, "ExportListProductinWarehouse.csv")
        }
    }

    const handleSearch = debounce(async (event) => {

        let data = event.target.value
        if (data) {

            let res = await getDataSearchInWarehouse(data)
            if (res && +res.EC === 0) {
                let data = res.DT
                let resultsSearch = data.filter(item => item.createdBy === user.account.phone)
                let resultsSearchOne = resultsSearch.filter(item => item.productstatuss_id === 3)
                if (resultsSearchOne) {
                    setListWarehouse(resultsSearchOne)
                    setSortDataSearch(true)
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                    }
                } else {
                    setListWarehouse("")
                    if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                        await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                    }
                    if (user?.account?.groupName === "Dev") {
                        await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                    }
                }

            }

        } else {
            setSortDataSearch(false)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
            await fetchProjectUser()
        }

    }, 300)
    const handleChangsortItem = async (sortBy, fieldSort) => {


        setSortBy(sortBy);
        setFieldSort(fieldSort)
        if (fieldSort && fieldSort === "product") {
            setSortProduct(!sortProduct)
            let _listWarehouse = _.cloneDeep(listWarehouse)
            _listWarehouse = _.orderBy(_listWarehouse, [fieldSort], [sortBy])
            setListWarehouse(_listWarehouse)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }

        }
        if (fieldSort && fieldSort === "createdAt") {
            setSortTime(!sorttime)
            let _listWarehouse = _.cloneDeep(listWarehouse)
            _listWarehouse = _.orderBy(_listWarehouse, [fieldSort], [sortBy])
            setListWarehouse(_listWarehouse)
            if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
            }
            if (user?.account?.groupName === "Dev") {
                await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
            }
        }



    }
    return (

        <div className='Contact-container '>
            <div className='left d-none d-lg-block '>
                <Sidebar collapsed={collapsed} />

            </div>
            <div className='right  '>
                <div className='btn-toggle d-none d-lg-block'>
                    <span onClick={() => setCollapsed(!collapsed)} className=" d-sm-block ">
                        {collapsed === false ?
                            <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                            :
                            <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>

                        }
                    </span>
                </div>
                {isLoading === true ?
                    <div className='right-body'>
                        <div className='container'>
                            <div className='row'>

                                <div className='header mt-2'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='location-path col-12 col-lg-6'>
                                                <Link to="/"> Home</Link>
                                                <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                </span>
                                                <Link to="/Warehouse">Warehouse </Link>
                                            </div>
                                            <div className='col-12 mt-2 col-lg-6 search'>
                                                <div className='search-icon'>
                                                    <i className="fa fa-search" aria-hidden="true"></i>

                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder='Search infomation'
                                                    onChange={(event) => handleSearch(event)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='body'>
                                    <div className="container">
                                        <div className='row'>
                                            <div className='name-page d-none d-lg-block col-lg-12'>
                                                <div className='row'>

                                                    <div className='col-6'>
                                                        <h4>
                                                            {t('Warehouse.tittle')}
                                                        </h4>
                                                        <Link to="/dashboard_Warehouse">
                                                            <button className='btn btn-warning' style={{ fontSize: "20px" }}>
                                                                <span >
                                                                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                                                                </span>
                                                                <span className='mx-3'>
                                                                    {t('Warehouse.tittleOne')}

                                                                </span>
                                                            </button>
                                                        </Link>
                                                    </div>

                                                    <div className='more col-6'>

                                                        <button className='btn btn-success' onClick={() => handleRefesh()} >
                                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleTwo')}

                                                        </button>
                                                        <button className='btn btn-warning' onClick={() => handleExportData()} >
                                                            <i className="fa fa-cloud-download" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleThree')}
                                                        </button>
                                                        <button className='btn btn-primary' onClick={() => handleShowhideModalCreateWarehouse()}>
                                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleFour')}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='name-page d-block d-lg-none col-lg-12'>
                                                <div className='row'>

                                                    <div className='d-flex align-item-center justify-content-center flex-column'>
                                                        <h4 className='d-flex align-item-center justify-content-center'>
                                                            {t('Warehouse.tittle')}
                                                        </h4>
                                                        <div className='d-flex align-item-center justify-content-center '>
                                                            <Link to="/dashboard_Warehouse" >
                                                                <button className='btn btn-warning ' style={{ fontSize: "20px" }}>
                                                                    <span >
                                                                        <i className="fa fa-line-chart" aria-hidden="true"></i>
                                                                    </span>
                                                                    <span className='mx-3'>
                                                                        {t('Warehouse.tittleOne')}

                                                                    </span>
                                                                </button>
                                                            </Link>
                                                        </div>

                                                    </div>

                                                    <div className='more d-flex align-item-center justify-content-center flex-column mt-3'>

                                                        <button className='btn btn-success' onClick={() => handleRefesh()} >
                                                            <i className="fa fa-refresh" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleTwo')}

                                                        </button>
                                                        <button className='btn btn-warning' onClick={() => handleExportData()} >
                                                            <i className="fa fa-cloud-download" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleThree')}
                                                        </button>
                                                        <button className='btn btn-primary' onClick={() => handleShowhideModalCreateWarehouse()}>
                                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            {t('Warehouse.tittleFour')}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='table-wrapper'>
                                                <div className='container'>
                                                    <div className='row'>

                                                        <div className='infomation-goods my-3'>
                                                            <div className=' name d-flex align-item-center justify-content-center my-3'>
                                                                {t('Warehouse.informationTittle')}
                                                            </div>
                                                            <div className='item-goods'>
                                                                <div className='container'>
                                                                    {allWarehouseLenght && allWarehouseLenght.length > 0
                                                                        &&
                                                                        allWarehouseLenght.map((item, index) => {
                                                                            return (
                                                                                <div className='row d-flex justify-content-center' key={`lenght-${index}`}>
                                                                                    <div className="item col-2 d-none d-lg-block">
                                                                                        <h3>{item.AllProduct ? item.AllProduct : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleOne')}

                                                                                        </div>
                                                                                        <Link to="/Warehouse" className='d-flex justify-content-center'>
                                                                                            <button className='btn btn-primary' style={{ cursor: 'pointer' }} >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>


                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="item col-12 d-block d-lg-none">
                                                                                        <h3>{item.AllProduct ? item.AllProduct : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleOne')}

                                                                                        </div>
                                                                                        <Link to="/Warehouse" className='d-flex justify-content-center'>
                                                                                            <button className='btn btn-primary' style={{ cursor: 'pointer' }} >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>


                                                                                        </Link>
                                                                                    </div>
                                                                                    <div className="item col-2 d-none d-lg-block">
                                                                                        <h3>{item.productstatuss_id4 ? item.productstatuss_id4 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleTwo')}

                                                                                        </div>

                                                                                        <Link to="/Warehouse_status_productId4" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary'  >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>


                                                                                        </Link>



                                                                                    </div>
                                                                                    <div className="item col-12 d-block d-lg-none mobile mt-2">
                                                                                        <h3>{item.productstatuss_id4 ? item.productstatuss_id4 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleTwo')}

                                                                                        </div>

                                                                                        <Link to="/Warehouse_status_productId4" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary'  >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>


                                                                                        </Link>



                                                                                    </div>
                                                                                    <div className="item col-2 d-none d-lg-block">
                                                                                        <h3>{item.productstatuss_id3 ? item.productstatuss_id3 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleThree')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId3" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' style={{ cursor: "no-drop", opacity: "0.5" }} >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                    <div className="item col-12 d-block d-lg-none mobile mt-2">
                                                                                        <h3>{item.productstatuss_id3 ? item.productstatuss_id3 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleThree')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId3" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' style={{ cursor: "no-drop", opacity: "0.5" }} >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                    <div className="item col-2 d-none d-lg-block">
                                                                                        <h3>{item.productstatuss_id1 ? item.productstatuss_id1 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleFour')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId1" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                    <div className="item col-12 d-block d-lg-none mobile mt-2">
                                                                                        <h3>{item.productstatuss_id1 ? item.productstatuss_id1 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleFour')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId1" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' >
                                                                                                {t('Warehouse.ViewDetail')}
                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                    <div className="item col-2 d-none d-lg-block">
                                                                                        <h3>{item.productstatuss_id2 ? item.productstatuss_id2 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleFive')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId2" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' >
                                                                                                {t('Warehouse.ViewDetail')}

                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                    <div className="item col-12 d-block d-lg-none mobile mt-2">
                                                                                        <h3>{item.productstatuss_id2 ? item.productstatuss_id2 : "0"}</h3>
                                                                                        <div className='content mb-3' style={{ fontWeight: "700" }}>
                                                                                            {t('Warehouse.informationTittleFive')}
                                                                                        </div>
                                                                                        <Link to="/Warehouse_status_productId2" className='d-flex justify-content-center'>

                                                                                            <button className='btn btn-primary' >
                                                                                                {t('Warehouse.ViewDetail')}

                                                                                            </button>

                                                                                        </Link>

                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }


                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='table-wrapper'>
                                                <div className='container'>
                                                    <div className='row '>
                                                        <div className='col-12 my-3 '>
                                                            <div className='row'>

                                                                <div className='my-2 d-flex align-item-center gap-2 col-12 col-lg-3'>
                                                                    <div style={{ backgroundColor: "blueviolet", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                        {t('Warehouse.tableTittleOne')}
                                                                    </div>
                                                                </div>
                                                                <div className='my-2 d-flex align-item-center gap-2 col-12 col-lg-3'>
                                                                    <div style={{ backgroundColor: "violet", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                        {t('Warehouse.tableTittleTwo')}

                                                                    </div>
                                                                </div>
                                                                <div className='my-2 d-flex align-item-center gap-2 col-12 col-lg-3'>
                                                                    <div style={{ backgroundColor: "red", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                        {t('Warehouse.tableTittleThree')}

                                                                    </div>
                                                                </div>
                                                                <div className='my-2 d-flex align-item-center gap-2 col-12 col-lg-3'>
                                                                    <div style={{ backgroundColor: "green", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                    <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                        {t('Warehouse.tableTittleFour')}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {sortDataSearch === false &&
                                                            <>
                                                                <div className=' d-none d-lg-block pagination  my-1 '>
                                                                    < ReactPaginate
                                                                        nextLabel="next >"
                                                                        onPageChange={handlePageClick}
                                                                        pageRangeDisplayed={1}
                                                                        marginPagesDisplayed={1}
                                                                        pageCount={totalPage}
                                                                        previousLabel="< previous"
                                                                        pageClassName="page-item"
                                                                        pageLinkClassName="page-link"
                                                                        previousClassName="page-item"
                                                                        previousLinkClassName="page-link"
                                                                        nextClassName="page-item"
                                                                        nextLinkClassName="page-link"
                                                                        breakLabel="..."
                                                                        breakClassName="page-item"
                                                                        breakLinkClassName="page-link"
                                                                        containerClassName="pagination"
                                                                        activeClassName="active"
                                                                        renderOnZeroPageCount={null}
                                                                        forcePage={+currentPage - 1}

                                                                    />
                                                                </div>
                                                                <div className=' d-block d-lg-none pagination-mobile  my-1 '>
                                                                    < ReactPaginate
                                                                        nextLabel="next >"
                                                                        onPageChange={handlePageClick}
                                                                        pageRangeDisplayed={1}
                                                                        marginPagesDisplayed={1}
                                                                        pageCount={totalPage}
                                                                        previousLabel="< previous"
                                                                        pageClassName="page-item"
                                                                        pageLinkClassName="page-link"
                                                                        previousClassName="page-item"
                                                                        previousLinkClassName="page-link"
                                                                        nextClassName="page-item"
                                                                        nextLinkClassName="page-link"
                                                                        breakLabel="..."
                                                                        breakClassName="page-item"
                                                                        breakLinkClassName="page-link"
                                                                        containerClassName="pagination"
                                                                        activeClassName="active"
                                                                        renderOnZeroPageCount={null}
                                                                        forcePage={+currentPage - 1}

                                                                    />
                                                                </div>
                                                            </>

                                                        }

                                                    </div>


                                                    <div style={{ overflow: "scroll" }}>
                                                        <table className="table table-bordered table-hover my-3" >
                                                            <thead className='table-success' >
                                                                <tr>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyOne')}

                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyTwo')}

                                                                    </th>
                                                                    <th scope="col" style={{ width: "100px" }}>
                                                                        {t('Warehouse.tableBodyImage')}

                                                                    </th>
                                                                    <th style={{ width: "150px" }}>
                                                                        {sortProduct === true ?
                                                                            <span>
                                                                                <span>
                                                                                    {t('Warehouse.tableBodyThree')}

                                                                                </span>
                                                                                <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                >
                                                                                    <span onClick={() =>
                                                                                        handleChangsortItem("desc", "product")}
                                                                                    >
                                                                                        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                    </span>

                                                                                </span>
                                                                            </span>
                                                                            :
                                                                            <span>
                                                                                <span>
                                                                                    {t('Warehouse.tableBodyThree')}

                                                                                </span>
                                                                                <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                >
                                                                                    <span onClick={() =>
                                                                                        handleChangsortItem("asc", "product")}
                                                                                    >
                                                                                        <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                                                                    </span>

                                                                                </span>
                                                                            </span>
                                                                        }
                                                                    </th>

                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyFour')}

                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyFive')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodySix')}

                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodySeven')}

                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyEight')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyNight')}
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyTen')}

                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyEleven')}

                                                                    </th>
                                                                    <th style={{ width: "150px" }} >
                                                                        {sorttime === true ?
                                                                            <span>
                                                                                {t('Warehouse.tableBodyTwelve')}
                                                                                <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                >
                                                                                    <span onClick={() =>
                                                                                        handleChangsortItem("desc", "createdAt")}
                                                                                    >
                                                                                        <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                    </span>

                                                                                </span>
                                                                            </span>
                                                                            :
                                                                            <span>
                                                                                {t('Warehouse.tableBodyTwelve')}
                                                                                <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                >
                                                                                    <span onClick={() =>
                                                                                        handleChangsortItem("asc", "createdAt")}
                                                                                    >
                                                                                        <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                                                                    </span>

                                                                                </span>
                                                                            </span>
                                                                        }
                                                                    </th>
                                                                    <th scope="col">
                                                                        {t('Warehouse.tableBodyThirteen')}
                                                                    </th>


                                                                </tr>
                                                            </thead>
                                                            {sortDataSearch === false
                                                                &&
                                                                <tbody>
                                                                    {listWarehouse && listWarehouse.length > 0
                                                                        ?
                                                                        listWarehouse.map((item, index) => {

                                                                            return (
                                                                                <tr key={`row-${index}`} >

                                                                                    <td scope="row">{(currentPage - 1) * currentLimit + index + 1}</td>
                                                                                    <td scope="row" >{item.id}</td>
                                                                                    <td scope="row" onClick={() => handleClickImage("https://huyle-backend-app.onrender.com/image/" + item.image)} style={{ cursor: "pointer", width: "70px", height: "70px" }}>
                                                                                        <img style={{ width: "100%", height: "100%" }} src={"https://huyle-backend-app.onrender.com/image/" + item.image} alt="" />
                                                                                    </td>
                                                                                    <td>{item?.product}</td>
                                                                                    {
                                                                                        +item?.productstatuss_id === 1 &&
                                                                                        <td style={{ color: "blueviolet", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "blueviolet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 2 &&
                                                                                        <td style={{ color: "violet", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 3 &&
                                                                                        <td style={{ color: "red", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "red", width: "20px", height: "20px", borderRadius: "50%" }}></div>

                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 4 &&
                                                                                        <td style={{ color: "green", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "green", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        !item?.Productstatuss?.status &&
                                                                                        <td >
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "green", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    <td >
                                                                                        <div className='d-flex'>
                                                                                            <span style={{ fontSize: "20px" }}> {item?.product_cost}</span>
                                                                                            <span style={{ color: "#7790b6", fontSize: "15px" }} className='mx-1'> /products</span>
                                                                                        </div>

                                                                                    </td>
                                                                                    <td>{item?.unitMoney}</td>

                                                                                    <td>{item?.product_number}</td>
                                                                                    <td>{item?.unit}</td>

                                                                                    <td>{item?.Suppliers}</td>
                                                                                    <td style={{ overflowWrap: "anywhere" }}>{item?.Suppliers_address}</td>
                                                                                    <td>{item?.Suppliers_phone}</td>
                                                                                    <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>



                                                                                    {
                                                                                        item?.productstatuss_id === 2
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' onClick={() => handleShowhideModalEditWarehouseRepeat(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }


                                                                                    {
                                                                                        item?.productstatuss_id === 3
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }

                                                                                    {
                                                                                        item?.productstatuss_id === 1
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' onClick={() => handleShowhideModalEditWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' onClick={() => handleShowhideModalDelteWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }
                                                                                    {
                                                                                        item?.productstatuss_id === 4
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' onClick={() => handleShowhideModalEditWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' onClick={() => handleShowhideModalDelteWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }
                                                                                    {
                                                                                        isOpen && previreImage &&
                                                                                        <Lightbox
                                                                                            mainSrc={previreImage}

                                                                                            onCloseRequest={() => setIsOpen(false)}

                                                                                        />
                                                                                    }
                                                                                </tr>
                                                                            )

                                                                        }
                                                                        )
                                                                        :
                                                                        <tr>
                                                                            <td colSpan={15}>
                                                                                <div className='imageNotFound'>
                                                                                    <img src="https://www.wolfgangdigital.com/uploads/blog/How_to_manage_out_of_date_stock_for_eCommerce.jpg" alt="" />

                                                                                </div>
                                                                            </td>

                                                                        </tr>

                                                                    }


                                                                </tbody>


                                                            }
                                                            {sortDataSearch === true
                                                                &&
                                                                <tbody>
                                                                    {listWarehouse && listWarehouse.length > 0
                                                                        ?
                                                                        listWarehouse.map((item, index) => {

                                                                            return (
                                                                                <tr key={`row-${index}`} >

                                                                                    <td scope="row">{(currentPage - 1) * currentLimit + index + 1}</td>
                                                                                    <td scope="row" >{item.id}</td>
                                                                                    <td scope="row" onClick={() => handleClickImage("https://huyle-backend-app.onrender.com/image/" + item.image)} style={{ cursor: "pointer", width: "70px", height: "70px" }}>
                                                                                        <img style={{ width: "100%", height: "100%" }} src={"https://huyle-backend-app.onrender.com/image/" + item.image} alt="" />
                                                                                    </td>
                                                                                    <td>{item?.product}</td>
                                                                                    {
                                                                                        +item?.productstatuss_id === 1 &&
                                                                                        <td style={{ color: "blueviolet", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "blueviolet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 2 &&
                                                                                        <td style={{ color: "violet", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 3 &&
                                                                                        <td style={{ color: "red", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "red", width: "20px", height: "20px", borderRadius: "50%" }}></div>

                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        +item?.productstatuss_id === 4 &&
                                                                                        <td style={{ color: "green", fontWeight: "800" }}>
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "green", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    {
                                                                                        !item?.Productstatuss?.status &&
                                                                                        <td >
                                                                                            {item?.Productstatuss?.status
                                                                                                ?
                                                                                                <div style={{ backgroundColor: "green", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }
                                                                                        </td>
                                                                                    }
                                                                                    <td >
                                                                                        <div className='d-flex'>
                                                                                            <span style={{ fontSize: "20px" }}> {item?.product_cost}</span>
                                                                                            <span style={{ color: "#7790b6", fontSize: "15px" }} className='mx-1'> /products</span>
                                                                                        </div>

                                                                                    </td>
                                                                                    <td>{item?.unitMoney}</td>

                                                                                    <td>{item?.product_number}</td>
                                                                                    <td>{item?.unit}</td>

                                                                                    <td>{item?.Suppliers}</td>
                                                                                    <td style={{ overflowWrap: "anywhere" }}>{item?.Suppliers_address}</td>
                                                                                    <td>{item?.Suppliers_phone}</td>
                                                                                    <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>



                                                                                    {
                                                                                        item?.productstatuss_id === 2
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' onClick={() => handleShowhideModalEditWarehouseRepeat(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }


                                                                                    {
                                                                                        item?.productstatuss_id === 3
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }

                                                                                    {
                                                                                        item?.productstatuss_id === 1
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' onClick={() => handleShowhideModalEditWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' onClick={() => handleShowhideModalDelteWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }
                                                                                    {
                                                                                        item?.productstatuss_id === 4
                                                                                        &&
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className="btn btn-success " title='Đặt hàng tiếp sản phẩm này' style={{ borderRadius: "50%", opacity: "0.2", cursor: "no-drop" }}>
                                                                                                    <i className="fa fa-repeat" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-warning mx-2" title='chỉnh sửa sản phẩm' onClick={() => handleShowhideModalEditWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                <button className="btn btn-danger " title='xóa sản phẩm' onClick={() => handleShowhideModalDelteWarehouse(item)} style={{ borderRadius: "50%" }}>
                                                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                                </button>

                                                                                            </div>


                                                                                        </td>

                                                                                    }
                                                                                    {
                                                                                        isOpen && previreImage &&
                                                                                        <Lightbox
                                                                                            mainSrc={previreImage}

                                                                                            onCloseRequest={() => setIsOpen(false)}

                                                                                        />
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        }
                                                                        )
                                                                        :
                                                                        <tr>
                                                                            <td colSpan={15}>
                                                                                <div className='imageNotFound'>
                                                                                    <img src="https://www.wolfgangdigital.com/uploads/blog/How_to_manage_out_of_date_stock_for_eCommerce.jpg" alt="" />

                                                                                </div>
                                                                            </td>

                                                                        </tr>

                                                                    }
                                                                </tbody>




                                                            }
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    :
                    <div className='loading-data-container'>
                        <Bars
                            height={100}
                            width={100}
                            radius={5}
                            color="#1877f2"
                            ariaLabel="ball-triangle-loading"
                            wrapperclassName={{}}
                            wrapperStyle=""
                            visible={true}
                        />
                        <h3>...Loading</h3>
                    </div>
                }
                <ModalCreateWarehouse
                    showModalCreateWarehouse={showModalCreateWarehouse}
                    handleShowhideModalCreateWarehouse={handleShowhideModalCreateWarehouse}
                    action={action}
                    dataWarehouseEdit={dataWarehouseEdit}
                    dataWarehouseRepeat={dataWarehouseRepeat}
                    fetchProjectUser={fetchProjectUser}
                    previreImage={previreImage}
                    setprevireImage={setprevireImage}
                    getAllInWarehouse={getAllInWarehouse}

                />
                <ModalDeleteWarehouse
                    showModalDeleteWarehouse={showModalDeleteWarehouse}
                    handleShowhideModalDelteWarehouse={handleShowhideModalDelteWarehouse}
                    dataWarehouseDelete={dataWarehouseDelete}
                    fetchProjectUser={fetchProjectUser}
                    action={action}

                />
            </div >

        </div >








    )


}

export default Warehouse_status_productId3;