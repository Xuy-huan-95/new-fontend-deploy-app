import './products.scss'
import Sidebar from "../sidebar/sidebar"
import { Link, NavLink, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { getProjectWithPagination, updateProject, updateNumberProductInWarehouse, createNotification } from "../services/ProjectService"
import moment from "moment"
import NotificationSuccessModal from "./notification-create-success"
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../contexApi/UserContext"
import { fetchImagebyOrder, assignDataToProjectImage } from "../services/imageService"
import { CreateProject, getDataWithTime } from "../services/ProjectService"
import { toast } from 'react-toastify';
import _, { debounce } from "lodash"
import { getDataSearch } from "../services/ProjectService"
import { Calendar, DateRangePicker, DateRange, DefinedRange } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useRef } from 'react';
import { Bars } from 'react-loader-spinner'
import * as XLSX from 'xlsx';
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"

const Products = (props) => {
    const { t, i18n } = useTranslation();

    let history = useHistory()
    let refCalendar = useRef(null)
    const { user } = React.useContext(UserContext);
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);

    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("infomation Page") ? localStorage.getItem("infomation Page") : 1

    )
    const [currentLimit, setCurrentLimit] = useState(7)

    const [listProjectbyUser, setListProjectbyUser] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    let orderNumber = Math.floor(Math.random() * 1000000)

    const [order, setOrder] = useState(orderNumber)


    const [showNotificationCreateSuccess, setShowNotificationCreateSuccess] = useState(false);
    const [sortBy, setSortBy] = useState("")
    const [fieldSort, setFieldSort] = useState("")

    const [sortId, setSortId] = useState(false)
    const [sorttime, setSortTime] = useState(false)
    const [sortmoney, setSortmoney] = useState(false)
    const [sortDataSearch, setSortDataSearch] = useState(false)
    const [isLoading, SetIsLoading] = useState(false)

    const [sortDataSearchWithTime, setSortDataSearchWithTime] = useState(false)

    const [listDataSearch, setListDataSearch] = useState([])
    const [listDataSearchNotime, setListDataSearchNotime] = useState([])
    const [stateDate, setStateDate] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const [StartDateCalendar, setstartDateCalendar] = useState("")
    const [endDateCalendar, setendDateCalendar] = useState("")


    const clickMouseOusideCalendar = (event) => {

        if (refCalendar.current && !refCalendar.current.contains(event.target)) {
            setIsOpenCalendar(false)
        }

    }

    useEffect(() => {
        document.addEventListener("click", clickMouseOusideCalendar, true)
    })


    const handleChangDate = async (item) => {

        setStateDate([item.selection])
        setstartDateCalendar(format(item.selection.startDate, "dd-MM-yyyy"))
        setendDateCalendar(format(item.selection.endDate, "dd-MM-yyyy"))


    }
    const handledeleteSortTime = async () => {
        setstartDateCalendar("")
        setendDateCalendar("")
        await fetchProjectUser()


    }
    const handlegetAllProject = async () => {
        setstartDateCalendar("")
        setendDateCalendar("")
        setSortDataSearch(false)
        setSortDataSearchWithTime(false)
        await fetchProjectUser()

    }



    const handleChangsortItem = async (sortBy, fieldSort) => {
        setSortBy(sortBy);
        setFieldSort(fieldSort)
        if (fieldSort && fieldSort === "id") {
            setSortId(!sortId)
            let _listProjectbyUser = _.cloneDeep(listProjectbyUser)
            _listProjectbyUser = _.orderBy(_listProjectbyUser, [fieldSort], [sortBy])
            setListProjectbyUser(_listProjectbyUser)

        }
        if (fieldSort === "createdAt") {
            setSortTime(!sorttime)
            let _listProjectbyUser = _.cloneDeep(listProjectbyUser)
            _listProjectbyUser = _.orderBy(_listProjectbyUser, [fieldSort], [sortBy])
            setListProjectbyUser(_listProjectbyUser)

        }


    }




    const handleSearch = debounce(async (event) => {

        let data = event.target.value
        if (data) {
            setSortDataSearchWithTime(false)
            setstartDateCalendar("")
            setendDateCalendar("")
            setSortDataSearch(true)


            let res = await getDataSearch(data, user.account.phone)
            if (res && +res.EC === 0) {
                let data = res.DT
                setListDataSearchNotime(data)

            }

        }
        if (!data) {
            setSortDataSearch(false)
            await fetchProjectUser()

        }
    }, 300)

    const handleShowHideModalCreatNewProject = async () => {
        history.push(`/CreateNewOrder`)

    }

    const handleViewProduct = async (item) => {
        history.push(`/detailProduct/${item.id}`)

    }


    const handlePageClick = (event) => {

        setCurrentPage(+event.selected + 1)


        localStorage.setItem("infomation Page", event.selected + 1)

    }


    const fetchProjectUser = async () => {

        let res = await getProjectWithPagination(currentPage, currentLimit, user.account.phone)
        if (res && +res.EC === 0) {

            setTotalPage(+res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataProject.length === 0) {
                console.log("res.DT.dataProject", res.DT.dataProject)
                setCurrentPage(+res.DT.totalPage)
                await getProjectWithPagination(+res.DT.totalPage, currentLimit)

            }
            if (res.DT.totalPage > 0 && res.DT.dataProject.length > 0) {

                let data = res.DT.dataProject
                let resultsFindProjectByUser = data.filter(item => item.createdBy === user.account.phone
                )
                console.log("res.DT.dataProject", res.DT.dataProject)
                if (resultsFindProjectByUser) {
                    setListProjectbyUser(resultsFindProjectByUser)
                    SetIsLoading(true)

                } else {
                    SetIsLoading(false)

                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataProject.length === 0) {
                let data = res.DT.dataProject
                if (data && data.length > 0) {
                    setListProjectbyUser(data)
                    SetIsLoading(true)

                } else {
                    setListProjectbyUser([])


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
        fetchProjectUser();
        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', currentPage);
        currentUrlParams.set("limit", currentLimit);

        history.push(window.location.pathname + "?" + currentUrlParams.toString());

    }, [currentPage])

    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }


    }, [])

    const dataWithSortTime = async () => {
        let res = await getDataWithTime(StartDateCalendar, endDateCalendar, user.account.phone)
        if (StartDateCalendar && endDateCalendar) {
            setSortDataSearchWithTime(true)
            setSortDataSearch(false)

            if (res && +res.EC === 0) {
                let data = res.DT
                let resultsSearch = data.filter(item => item?.createdBy === user.account.phone)
                setListDataSearch(resultsSearch)
                setIsOpenCalendar(false)

            } else {
                setSortDataSearchWithTime(false)

                await fetchProjectUser()

            }
        } else {
            setSortDataSearchWithTime(false)

        }

    }

    useEffect(() => {
        dataWithSortTime()
        setIsOpenCalendar(false)

    }, [StartDateCalendar, endDateCalendar])

    const getDataWithcurrentPage = async () => {
        let currentPageAfterRefesh = +localStorage.getItem("infomation Page")
        let res = await getProjectWithPagination(+currentPageAfterRefesh, +currentLimit, user.account.phone)
        if (res && +res.EC === 0) {
            let data = res.DT.dataProject
            let resultsFindProjectByUser = data.filter(item => item.createdBy === user.account.phone)
            if (resultsFindProjectByUser) {
                SetIsLoading(true)

                setListProjectbyUser(resultsFindProjectByUser)
            }
        }
        else {
            SetIsLoading(false)

            toast.error(res.EM)
        }
    }





    useEffect(() => {
        window.history.pushState('', '', `?page=${localStorage.getItem("infomation Page")}&limit=${currentLimit}`);

        getDataWithcurrentPage()
    }, [window.location.reload, sortDataSearch])



    const [collapsed, setCollapsed] = useState(false)








    const handleExportData = () => {
        if (listProjectbyUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(listProjectbyUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "listProduct");
            XLSX.writeFile(workbook, "ExportListProduct.csv")
        }
    }

    const handleCreateFlag = async (item) => {
        let res = await updateProject({ ...item, flag: true })
        if (res && +res.EC === 0) {
            let abc = await createNotification(item.id, item.order, "đơn gấp", "", item.createdBy, 1, 0, item.shippinginit_id
            )
            if (abc && +abc.EC === 0) {
                setSortDataSearch(false)
                await fetchProjectUser()

                await dataWithSortTime()
            }

        }
    }
    const handleCancelFlag = async (item) => {
        let res = await updateProject({ ...item, flag: false })
        if (res && +res.EC === 0) {
            let abc = await createNotification(item.id, item.order, "huỷ đơn gấp", "", item.createdBy, 1, 0, item.shippingUnit_Id)
            if (abc && +abc.EC === 0) {
                setSortDataSearch(false)
                await fetchProjectUser()

                await dataWithSortTime()
            }

        }
    }

    return (
        <div className='Contact-container'>
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
                <div className='right-body '>
                    <div className='container'>
                        <div className='row'>
                            <div className='header mt-2'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='location-path col-12 col-lg-6'>
                                            <Link to="/"> Home</Link>

                                            <span> <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                            </span>
                                            <Link to="/Products"> Product manager </Link>
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

                            <div className='body '>
                                <div className="container">
                                    <div className='row  '>
                                        <div className='name-page d-none d-lg-block col-lg-12'>
                                            <div className='row'>

                                                <div className='title_name_page col-7'>
                                                    <h4>
                                                        {t('Product.tittleOne')}
                                                    </h4>
                                                    <Link to="/dashboard_Product" style={{ textDecoration: "none", color: "#474141" }}>
                                                        <button className='btn btn-primary'>
                                                            <span>
                                                                <i className="fa fa-line-chart" aria-hidden="true"></i>
                                                            </span>
                                                            <span className='mx-3'>
                                                                {t('Product.tittleTwo')}
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className='more col-5 '>

                                                    <button className='btn btn-warning' onClick={() => handleExportData()}>
                                                        <i className="fa fa-cloud-download" aria-hidden="true"></i>
                                                        {t('Product.tittleThree')}
                                                    </button>
                                                    <button className='btn btn-primary' onClick={() => handleShowHideModalCreatNewProject()}>
                                                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                        {t('Product.tittleFour')}
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                        <div className='name-page d-block d-lg-none col-lg-12'>
                                            {/* mobile */}

                                            <div className='row'>

                                                <div className='title_name_page-mobile col-12'>
                                                    <h4>
                                                        {t('Product.tittleOne')}
                                                    </h4>
                                                    <Link to="/dashboard_Product" style={{ textDecoration: "none", color: "#474141" }}>
                                                        <button className='btn btn-primary'>
                                                            <span>
                                                                <i className="fa fa-line-chart" aria-hidden="true"></i>
                                                            </span>
                                                            <span className='mx-3'>
                                                                {t('Product.tittleTwo')}
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className='more-mobile mx-2 '>
                                                    <div className='container'>
                                                        <div className='row d-flex align-item-center justify-content-center '>
                                                            <button className='btn btn-warning col-5 my-3' onClick={() => handleExportData()}>
                                                                <span className='mx-1' style={{ fontSize: "13px" }}>{t('Product.tittleThree')}</span>
                                                            </button>
                                                            <div className='col-2'></div>
                                                            <button className='btn btn-primary col-5 my-3' style={{ fontSize: "13px" }} onClick={() => handleShowHideModalCreatNewProject()}>
                                                                <span className='mx-1'>{t('Product.tittleFour')}</span>
                                                            </button>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                        <div className='table-wrapper'>
                                            <div className='row'>
                                                <div className=' d-none d-lg-block col-lg-12'>
                                                    <div className='header-table'>
                                                        <span onClick={() => handlegetAllProject()} style={{ borderBottom: "6px solid #61dafb " }}>
                                                            {t('Product.tittleTable')}
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatuspayment" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableOne')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryNull" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableTwo')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryOne" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableThree')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryTwo" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableFoure')}
                                                            </Link>
                                                        </span>


                                                    </div>

                                                </div>
                                                <div className=' d-block d-lg-none col-lg-12'>
                                                    {/* mobile */}
                                                    <div className='header-table-mobile'>
                                                        <span onClick={() => handlegetAllProject()} style={{ borderBottom: "6px solid #61dafb " }}>
                                                            {t('Product.tittleTable')}
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatuspayment" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableOne')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryNull" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableTwo')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryOne" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableThree')}
                                                            </Link>
                                                        </span>
                                                        <span style={{ borderBottom: "6px solid white" }}>
                                                            <Link to="/ProductsWithStatusdeliveryTwo" style={{ textDecoration: "none", color: "#474141" }}>
                                                                {t('Product.tittleTableFoure')}
                                                            </Link>
                                                        </span>


                                                    </div>

                                                </div>
                                                <div className='title d-flex align-items-center justify-content-center my-2'>
                                                    <div className='container '>
                                                        <div className='row mobile'>
                                                            <div className='col-12 col-lg-3' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                {t('Product.TimeTittle')}
                                                            </div>
                                                            <div className='col-12 col-lg-2'>
                                                                <input
                                                                    className="form-control my-3 "
                                                                    readOnly
                                                                    value={StartDateCalendar}
                                                                />
                                                            </div>
                                                            <div className='col-1' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                            </div>
                                                            <div className='col-12 col-lg-2'>
                                                                <input
                                                                    className="form-control my-3 "
                                                                    readOnly
                                                                    value={endDateCalendar}
                                                                />
                                                            </div>
                                                            <div className='col-6 col-lg-2 '
                                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "black" }}
                                                                onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                                                                title='Lọc đơn hàng theo thời gian'
                                                            >
                                                                <button className='btn btn-primary'>
                                                                    {t('Product.tittleTimeSelectButton')}
                                                                </button>

                                                            </div>

                                                            <div className='col-6 col-lg-2'
                                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "black" }}
                                                                onClick={() => handledeleteSortTime()}
                                                                title='xóa thời gian đã chọn'
                                                            >

                                                                <button className='btn btn-danger'>
                                                                    {t('Product.tittleTimeDeleteButton')}

                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className='row '>
                                                            <div className=' col-12 mt-3' ref={refCalendar} style={{ overflow: "auto" }}>
                                                                {isOpenCalendar === true &&
                                                                    <DateRangePicker
                                                                        onChange={item => handleChangDate(item)}
                                                                        showSelectionPreview={true}
                                                                        moveRangeOnFirstSelection={false}
                                                                        months={2}
                                                                        ranges={stateDate}
                                                                        direction="horizontal"
                                                                    />
                                                                }

                                                            </div>
                                                        </div>


                                                    </div>


                                                </div>
                                                <hr />

                                                {isLoading === true
                                                    ?
                                                    <>
                                                        <div className='body-table d-none d-lg-block'>
                                                            <div className=' d-none d-lg-block col-lg-12'>
                                                                <div className='d-flex align-item-center justify-content-between flex-column'>
                                                                    <div className='my-2 d-flex align-item-center justify-content-around gap-3'>
                                                                        <div className='my-2 d-flex align-item-center gap-2'>
                                                                            <div style={{ backgroundColor: "blue", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                            <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                                {t('Product.tittleBodyOne')}
                                                                            </div>
                                                                        </div>
                                                                        <div className='my-2 d-flex align-item-center gap-2'>
                                                                            <div style={{ backgroundColor: "violet", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                            <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                                {t('Product.tittleBodyTwo')}
                                                                            </div>
                                                                        </div>
                                                                        <div className='my-2 d-flex align-item-center gap-2'>
                                                                            <div style={{ backgroundColor: "#A0522D", width: "30px", height: "30px", borderRadius: "50%" }}></div>
                                                                            <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                                {t('Product.tittleBodyThree')}
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                    {sortDataSearch === false && sortDataSearchWithTime === false
                                                                        &&
                                                                        <div className='pagination'>

                                                                            < ReactPaginate
                                                                                nextLabel="next >"
                                                                                onPageChange={handlePageClick}
                                                                                pageRangeDisplayed={2}
                                                                                marginPagesDisplayed={2}
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
                                                                    }
                                                                </div>
                                                            </div>

                                                            <table className="table table-set table-hover ">
                                                                <thead className='table-success'>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th scope="col">
                                                                            {t('Product.tittleBodyOrdersOne')}

                                                                        </th>
                                                                        {sortDataSearch === false && sortDataSearchWithTime === false
                                                                            &&
                                                                            <th scope="col" >
                                                                                {t('Product.tittleBodyOrdersTwo')}

                                                                            </th>
                                                                        }
                                                                        <th scope="col" style={{ width: "50px" }} >
                                                                            {t('Product.tittleBodyOrdersThree')}

                                                                        </th>
                                                                        <th scope="col" style={{ width: "70px" }} >
                                                                            {sortId === true ?
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFour')}
                                                                                    <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                    >
                                                                                        <span onClick={() =>
                                                                                            handleChangsortItem("desc", "id")}
                                                                                        >
                                                                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                        </span>

                                                                                    </span>
                                                                                </span>
                                                                                :
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFour')}
                                                                                    <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                    >
                                                                                        <span onClick={() =>
                                                                                            handleChangsortItem("asc", "id")}
                                                                                        >
                                                                                            <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                                                                        </span>

                                                                                    </span>
                                                                                </span>
                                                                            }


                                                                        </th>

                                                                        <th>
                                                                            {sorttime === true ?
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFive')}
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
                                                                                    {t('Product.tittleBodyOrdersFive')}
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
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesSix')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesSeven')}
                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesEight')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesNight')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesTen')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdeseleven')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdestwelve')}

                                                                        </th>

                                                                    </tr>
                                                                </thead>

                                                                {sortDataSearch === false && sortDataSearchWithTime === false
                                                                    &&
                                                                    < tbody >

                                                                        {listProjectbyUser && listProjectbyUser.length > 0
                                                                            ?

                                                                            listProjectbyUser.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }

                                                                                        <td scope="row">{(currentPage - 1) * currentLimit + index + 1}</td>

                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>
                                                                                            {item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}
                                                                                            <br />
                                                                                            {item?.phoneNumber_customer ? item?.phoneNumber_customer : "chưa cập nhật "}
                                                                                        </td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.statuspayment_id === 1
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.statuspayment_id === 2
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.statuspayment_id === 3
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.totalWithShippingCost}</td>
                                                                                        <td>{item?.Saleschannel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }



                                                                    </tbody>
                                                                }



                                                                {sortDataSearch === true && sortDataSearchWithTime === false &&
                                                                    < tbody >
                                                                        {listDataSearchNotime && listDataSearchNotime.length > 0
                                                                            ?

                                                                            listDataSearchNotime.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }


                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>
                                                                                            {item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}
                                                                                            <br />
                                                                                            {item?.phoneNumber_customer ? item?.phoneNumber_customer : "chưa cập nhật "}
                                                                                        </td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán toàn bộ"
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Thanh toán khi giao hàng"
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán trước một phần"
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.total}</td>
                                                                                        <td>{item?.Saleschannel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }




                                                                    </tbody>
                                                                }
                                                                {sortDataSearchWithTime === true && sortDataSearch === false
                                                                    &&
                                                                    < tbody >
                                                                        {listDataSearch && listDataSearch.length > 0
                                                                            ?
                                                                            listDataSearch.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }


                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>
                                                                                            {item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}
                                                                                            <br />
                                                                                            {item?.phoneNumber_customer ? item?.phoneNumber_customer : "chưa cập nhật "}
                                                                                        </td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán toàn bộ"
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Thanh toán khi giao hàng"
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán trước một phần"
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.total}</td>
                                                                                        <td>{item?.Saleschannel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }



                                                                    </tbody>
                                                                }

                                                            </table>
                                                        </div>

                                                        <div className='body-table d-block d-lg-none'>

                                                            <div className=' d-block d-lg-none col-lg-12 mobile'>
                                                                {/* mobile */}
                                                                <div className='row'>
                                                                    <div className='my-2 col-12 '>

                                                                        <div style={{ backgroundColor: "blue", width: "30px", height: "30px", borderRadius: "50%", margin: "auto" }}></div>
                                                                        <div className='item' style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                            {t('Product.tittleBodyOne')}
                                                                        </div>
                                                                    </div>
                                                                    <div className='my-2 col-12'>
                                                                        <div style={{ backgroundColor: "violet", width: "30px", height: "30px", borderRadius: "50%", margin: "auto" }}></div>
                                                                        <div className='item' style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                            {t('Product.tittleBodyTwo')}
                                                                        </div>
                                                                    </div>
                                                                    <div className='my-2 col-12'>
                                                                        <div style={{ backgroundColor: "#A0522D", width: "30px", height: "30px", borderRadius: "50%", margin: "auto" }}></div>
                                                                        <div className='item' style={{ fontSize: "20px", fontWeight: "700" }}>
                                                                            {t('Product.tittleBodyThree')}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                {sortDataSearch === false && sortDataSearchWithTime === false
                                                                    &&

                                                                    <div className='pagination-mobile my-3'>
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


                                                                }
                                                            </div>
                                                            <table className="table table-set table-hover ">
                                                                <thead className='table-success'>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th scope="col">
                                                                            {t('Product.tittleBodyOrdersOne')}

                                                                        </th>
                                                                        {sortDataSearch === false && sortDataSearchWithTime === false
                                                                            &&
                                                                            <th scope="col" >
                                                                                {t('Product.tittleBodyOrdersTwo')}

                                                                            </th>
                                                                        }
                                                                        <th scope="col" style={{ width: "50px" }} >
                                                                            {t('Product.tittleBodyOrdersThree')}

                                                                        </th>
                                                                        <th scope="col" style={{ width: "80px" }} >
                                                                            {sortId === true ?
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFour')}
                                                                                    <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                    >
                                                                                        <span onClick={() =>
                                                                                            handleChangsortItem("desc", "id")}
                                                                                        >
                                                                                            <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                        </span>

                                                                                    </span>
                                                                                </span>
                                                                                :
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFour')}
                                                                                    <span style={{ paddingLeft: "10px", cursor: "pointer" }}
                                                                                    >
                                                                                        <span onClick={() =>
                                                                                            handleChangsortItem("asc", "id")}
                                                                                        >
                                                                                            <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                                                                                        </span>

                                                                                    </span>
                                                                                </span>
                                                                            }


                                                                        </th>

                                                                        <th>
                                                                            {sorttime === true ?
                                                                                <span>
                                                                                    {t('Product.tittleBodyOrdersFive')}
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
                                                                                    {t('Product.tittleBodyOrdersFive')}
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
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesSix')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesSeven')}
                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesEight')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesNight')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdesTen')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdeseleven')}

                                                                        </th>
                                                                        <th scope="col" >
                                                                            {t('Product.tittleBodyOrdestwelve')}

                                                                        </th>

                                                                    </tr>
                                                                </thead>

                                                                {sortDataSearch === false && sortDataSearchWithTime === false &&
                                                                    < tbody >

                                                                        {listProjectbyUser && listProjectbyUser.length > 0
                                                                            ?

                                                                            listProjectbyUser.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }

                                                                                        <td scope="row">{(currentPage - 1) * currentLimit + index + 1}</td>

                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>{item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}</td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán toàn bộ"
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Thanh toán khi giao hàng"
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán trước một phần"
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.total}</td>
                                                                                        <td>{item?.Sales_Channel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }





                                                                    </tbody>
                                                                }




                                                                {sortDataSearch === true &&
                                                                    < tbody >
                                                                        {listDataSearchNotime && listDataSearchNotime.length > 0
                                                                            ?

                                                                            listDataSearchNotime.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }


                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>{item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}</td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán toàn bộ"
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Thanh toán khi giao hàng"
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán trước một phần"
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.total}</td>
                                                                                        <td>{item?.Sales_Channel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }




                                                                    </tbody>
                                                                }
                                                                {sortDataSearchWithTime === true &&
                                                                    < tbody >
                                                                        {listDataSearch && listDataSearch.length > 0
                                                                            ?
                                                                            listDataSearch.map((item, index) => {
                                                                                return (
                                                                                    <>    <tr key={`row-${index}`}>
                                                                                        {item?.flag === true ?
                                                                                            <td>
                                                                                                <span style={{ fontSize: "20px", color: "red" }}>
                                                                                                    <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                </span>
                                                                                            </td>
                                                                                            :
                                                                                            <td></td>

                                                                                        }

                                                                                        {item?.done_status == 1
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked />

                                                                                                </div>
                                                                                            </td>

                                                                                        }
                                                                                        {item?.done_status == 0
                                                                                            &&
                                                                                            <td>
                                                                                                <div className="form-check">
                                                                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" disabled />

                                                                                                </div>
                                                                                            </td>

                                                                                        }


                                                                                        <td scope="row">{item.order}

                                                                                        </td>
                                                                                        <td scope="row" >{item.id}</td>
                                                                                        {/* <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td> */}
                                                                                        <td>{moment(`${item.createdAt}`).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                                        <td>{item?.name_customer?.toLocaleUpperCase() ? item?.name_customer?.toLocaleUpperCase() : "chưa cập nhật "}</td>
                                                                                        <td>{item?.Warehouse?.product
                                                                                            ? item?.Warehouse?.product
                                                                                            : "chưa cập nhật "}
                                                                                        </td>
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán toàn bộ"
                                                                                            &&
                                                                                            <td >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "blue", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                :
                                                                                                "Đang xử lý"
                                                                                            }</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Thanh toán khi giao hàng"
                                                                                            &&
                                                                                            <td style={{ color: "violet", fontWeight: "700" }}>{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "violet", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {item?.Statuspayment?.status === "Đã thanh toán trước một phần"
                                                                                            &&
                                                                                            <td style={{ color: "#A0522D", fontWeight: "700" }} >{item?.Statuspayment?.status ?
                                                                                                <div style={{ backgroundColor: "#A0522D", width: "20px", height: "20px", borderRadius: "50%" }}></div>
                                                                                                : "Đang xử lý"}</td>

                                                                                        }


                                                                                        {item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        {!item?.Statusdelivery?.status &&
                                                                                            <td > {item?.Statusdelivery?.status ? item?.Statusdelivery?.status : "Đang xử lý"}</td>

                                                                                        }
                                                                                        <td>{item.total}</td>
                                                                                        <td>{item?.Sales_Channel?.name}</td>
                                                                                        <td >
                                                                                            <div className='d-flex'>
                                                                                                <button className='btn btn-primary' style={{ cursor: "pointer", borderRadius: "50%" }} title="Chi tiết đơn hàng" onClick={() => handleViewProduct(item)}>
                                                                                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                                                                                </button>
                                                                                                {item?.flag == 0 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Giục giao hàng nhanh" onClick={() => handleCreateFlag(item)} >
                                                                                                        <i className="fa fa-flag" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                                {item?.flag == 1 &&
                                                                                                    <button className='btn btn-danger mx-2' style={{ cursor: "pointer", borderRadius: "50%" }} title="Tắt giục giao hàng nhanh" onClick={() => handleCancelFlag(item)} >
                                                                                                        <i className="fa fa-times" aria-hidden="true"></i>
                                                                                                    </button>
                                                                                                }
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :
                                                                            <tr>
                                                                                <td colSpan={13}>
                                                                                    <div className='image'>
                                                                                        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/open-box-7072010-5751948.png?f=webp" alt="" />
                                                                                        <h3> Not Found</h3>

                                                                                    </div>
                                                                                </td>

                                                                            </tr>

                                                                        }



                                                                    </tbody>
                                                                }

                                                            </table>
                                                        </div>
                                                    </>



                                                    :
                                                    <tr className=' d-flex align-items-center justify-content-center'>
                                                        <td colSpan={13}>
                                                            <div className='loading-data-container '>
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
                                                        </td>

                                                    </tr>
                                                }

                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>
                    </div>

                </div>

            </div>
            {/* <CreateNewProject
                showModalCreatNewProject={showModalCreatNewProject}
                setShowModalCreatNewProject={setShowModalCreatNewProject}
                handleShowHideModalCreatNewProject={handleShowHideModalCreatNewProject}
                listProjectbyUser={listProjectbyUser}
                fetchProjectUser={fetchProjectUser}
                setShowNotificationCreateSuccess={setShowNotificationCreateSuccess}
                userdata={userdata}
                setUserdata={setUserdata}
                order={order}
                validInput={validInput}
                setValidInput={setValidInput}
                defaultUserData={defaultUserData}
                ValidInputsDefault={ValidInputsDefault}
                productAfterCreate={productAfterCreate}
                setProductAfterCreate={setProductAfterCreate}
                selecCheckSubtmitImage={selecCheckSubtmitImage}
                setSelecCheckSubtmitImage={setSelecCheckSubtmitImage}
                previreImage={previreImage}
                setprevireImage={setprevireImage}
                handleConfirmUser={handleConfirmUser}
                Product={Product}
                SetProduct={SetProduct}
                ProductNumber={ProductNumber}
                SetProductNumber={SetProductNumber}
                handleOnchangeInput={handleOnchangeInput}
                numberProduct={numberProduct}
                setNumberProduct={setNumberProduct}
                setId={setId}
                id={id}

            />
            <NotificationSuccessModal
                showNotificationCreateSuccess={showNotificationCreateSuccess}
                handleShowNotificationCreateSuccess={handleShowNotificationCreateSuccess}
                order={order}
                productAfterCreate={productAfterCreate}
                projectId={projectId}
                numberProduct={numberProduct}
                userdata={userdata}
                id={id}

            /> */}
        </div >

    )
}


export default Products