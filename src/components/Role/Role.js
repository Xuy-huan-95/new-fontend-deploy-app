import './Role.scss'
import React, { useEffect, useState } from 'react'
import _ from "lodash"
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { CreateRole } from "../services/RoleService"
import TableRole from "./tableRole"
import { getRoleWithPagination } from "../services/RoleService"
import ReactPaginate from 'react-paginate'
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { UserContext } from "../../contexApi/UserContext"

const Role = (props) => {
    const { t, i18n } = useTranslation();
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("infomation Page Role") ? localStorage.getItem("infomation Page Role") : 1
    )
    const [currentLimit, setCurrentLimit] = useState(15)
    const [listRole, setListRole] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { user } = React.useContext(UserContext);


    const handlePageClick = (event) => {

        setCurrentPage(+event.selected + 1)
        localStorage.setItem("infomation Page Role", event.selected + 1)

    };
    const fetchUserRole = async () => {

        let res = await getRoleWithPagination(currentPage, currentLimit)
        if (res && +res.EC === 0) {
            setTotalPage(res.DT.totalPage)
            if (res.DT.totalPage > 0 && res.DT.dataUser.length === 0) {
                setCurrentPage(+res.DT.totalPage)
                await getRoleWithPagination(+res.DT.totalPage, currentLimit)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
            if (res.DT.totalPage > 0 && res.DT.dataUser.length > 0) {
                setListRole(res.DT.dataUser)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
            if (res.DT.totalPage === 0 && res.DT.dataUser.length === 0) {
                setListRole(res.DT.dataUser)
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }

        }

    }


    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingnit_id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingnit_id, "Dev")
        }
        window.history.pushState('', '', `?page=${localStorage.getItem("infomation Page Role")}&limit=${currentLimit}`);

        fetchUserRole()
    }, [window.location.reload,])


    const dataDefault = {
        child1: {
            url: "", description: "", isValidUrl: true
        },

    }
    const [listchilds, setListchilds] = useState(dataDefault)


    // useEffect(() => {
    //     // loop object(lap theo mang object)
    //     Object.entries(listchilds).map(([key, value]) => {
    //     })
    // }, [])


    const handleOnchangleInput = (name, value, key) => {
        // name la ten key cua moi object vd:url
        // value la gia tri cua moi object 
        // key la ten cua moi object vd:child1


        let _listchilds = _.cloneDeep(listchilds);
        _listchilds[key][name] = value;
        if (value && name === "url") {
            _listchilds[key]["isValidUrl"] = true

        }
        setListchilds(_listchilds)
    }

    const handleAddNewRole = () => {
        let _listchilds = _.cloneDeep(listchilds);
        _listchilds[`child-${uuidv4()}`] = dataDefault;
        setListchilds(_listchilds)
    }


    const handleDeleteRole = (key) => {
        let _listchilds = _.cloneDeep(listchilds);
        delete _listchilds[key]
        setListchilds(_listchilds)

    }

    const handleSaveRole = async () => {
        // check xem role naof rong url
        let invalidObj = Object.entries(listchilds).find(([key, value], index) => {
            return value && !value.url
        })
        if (!invalidObj) {
            let data = buildDatatoPersist()
            let res = await CreateRole(data)
            if (res && res.EC === 1) {
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            } else {
                toast.info(res.EM)
                setListchilds(dataDefault)
                await fetchUserRole()
                if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
                    await getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
                }
                if (user?.account?.groupName === "Dev") {
                    await getALlListNotification(+user.account.shippingUnit_Id, "Dev")
                }
            }
        } else {
            toast.error("you can not empty this input")
            let _listchilds = _.cloneDeep(listchilds);
            _listchilds[invalidObj[0]]["isValidUrl"] = false
            setListchilds(_listchilds)

        }
    }


    const buildDatatoPersist = () => {
        // tao data de gui len database
        let _listchilds = _.cloneDeep(listchilds);
        let res = [];
        Object.entries(listchilds).map(([key, value], index) => {
            res.push({
                url: value.url,
                description: value.description
            })
        })
        return res
    }



    return (
        <div className='role-container'>
            <div className='container '>
                <div className=' mt-3 add-role container'>
                    <div className='row-title mt-3  '>
                        <h3> {t('Role.One')} </h3>
                    </div>
                    <div className='dad-role row'>
                        {Object.entries(listchilds).map(([key, item], index) => {
                            return (
                                <div className="child-role row" key={`child-${key}`}>
                                    <div className='col-5 form-group'>
                                        <label>
                                            {t('Role.Two')}
                                        </label>
                                        <input type="text" className={item.isValidUrl ? "form-control" : 'form-control is-invalid'}
                                            value={item.url}
                                            onChange={(event) => handleOnchangleInput("url", event.target.value, key)} />
                                    </div>
                                    <div className='col-5 form-group'>
                                        <label>
                                            {t('Role.Three')}
                                        </label>
                                        <input type="text" className='form-control'
                                            value={item.description}
                                            onChange={(event) => handleOnchangleInput("description", event.target.value, key)} />

                                    </div>
                                    <div className='col-2 mt-4 action'>
                                        <button className='btn btn-success my-1' title="Add New Role" onClick={() => handleAddNewRole()}>
                                            <i className="fa fa-plus" ></i>

                                        </button>
                                        {index >= 1 &&
                                            <button className='btn btn-danger my-1' title="Delete Role" onClick={() => handleDeleteRole(key)}>
                                                <i className="fa fa-trash-o" ></i>

                                            </button>}

                                    </div>
                                </div>


                            )
                        })}

                        <div>
                            <button className='btn btn-warning my-3' title="Save" onClick={() => handleSaveRole()}>
                                <i className="fa fa-save" ></i>

                            </button>
                        </div>


                    </div>
                </div>

                <div className='mt-3  List-role container'>
                    <h3> {t('Role.Four')}</h3>
                    <div style={{ overflow: "auto" }}>
                        <TableRole currentPage={currentPage} currentLimit={currentLimit} setCurrentPage={setCurrentPage} fetchUserRole={fetchUserRole} listRole={listRole} totalPage={totalPage} />

                    </div>
                    {totalPage > 0 &&
                        <>
                            <div className='user-footer d-none d-lg-flex'>
                                <ReactPaginate
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
                                    // thuộc tính này dùng để khi xóa trang xong về trang trước thì active trang đó
                                    forcePage={+currentPage - 1}
                                />
                            </div>
                            <div className='d-flex align-item-center justify-content-center d-block d-lg-none'>
                                <ReactPaginate
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
                                    // thuộc tính này dùng để khi xóa trang xong về trang trước thì active trang đó
                                    forcePage={+currentPage - 1}
                                />
                            </div>
                        </>

                    }
                </div>

            </div>

        </div>

    )
}


export default Role