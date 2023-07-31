import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import './home.scss'
import { useTranslation, Trans } from 'react-i18next';
import { NotificationContext } from "../../contexApi/NotificationContext"
import { UserContext } from "../../contexApi/UserContext"

const Home = (props) => {
    const { t, i18n } = useTranslation();
    const { list, getALlListNotification, listStaff } = React.useContext(NotificationContext);
    const { user } = React.useContext(UserContext);
    useEffect(() => {
        if (user?.account?.groupName === "Customer" || user?.account?.groupName === "Staff" && user.account.Position) {
            getALlListNotification(+user.account.shippingUnit_Id, user.account.phone, user.account.Position)
        }
        if (user?.account?.groupName === "Dev") {
            getALlListNotification(+user.account.shippingUnit_Id, "Dev")
        }
    }, [])

    return (
        <div className="home-container ">
            <div className="header  ">
                <div className="container ">
                    <div className="header-left-mb container  d-sm-none col-12  d-flex flex-column ">
                        <h2 className="col-12 py-3">
                            {t('homePage.headerLeftOne')}
                        </h2>
                        <h5 className="col-12 py-3">
                            {t('homePage.headerLeftTwo')}
                        </h5>
                        {user && user.isAuthenticated === true
                            ?
                            <div>
                                <button className="btn btn-warning">
                                    <a href="/Products" style={{ textDecoration: "none", color: "white" }}>
                                        {t('homePage.headerLeftThree')}
                                    </a>
                                </button>

                            </div>
                            :
                            <div>
                                <button className="btn btn-warning" >
                                    <a href="/Login" style={{ textDecoration: "none", color: "white" }}> {t('homePage.headerLeftFour')}</a>

                                </button>

                            </div>
                        }

                    </div>
                    <div className="content">
                        <div className="header-left  py-3 d-none d-sm-block col-sm-7  d-flex flex-column ">
                            <h2 className="col-12 py-3">
                                {t('homePage.headerLeftOne')}
                            </h2>
                            <h5 className="col-12 py-3">
                                {t('homePage.headerLeftTwo')}

                            </h5>
                            {user && user.isAuthenticated === true
                                ?
                                <div>
                                    <button className="btn btn-warning">
                                        <a href="/Products" style={{ textDecoration: "none", color: "white" }}>
                                            {t('homePage.headerLeftThree')}
                                        </a>
                                    </button>

                                </div>
                                :
                                <div>
                                    <button className="btn btn-warning" >
                                        <a href="/Login" style={{ textDecoration: "none", color: "white" }}> {t('homePage.headerLeftFour')}</a>

                                    </button>

                                </div>
                            }
                        </div>
                        <div className="header-right-mb container d-sm-none col-12 py-3 col-12 ">
                            <img src="https://file.hstatic.net/1000001117/file/orders-banner-main_d8ea55a983e34983bbf98ea90201e3f6.png" alt="" />
                        </div>
                        <div className="header-right container d-none d-sm-block py-3 col-12 ">
                            <img src="https://file.hstatic.net/1000001117/file/orders-banner-main_d8ea55a983e34983bbf98ea90201e3f6.png" alt="" />
                        </div>

                    </div>

                </div>

            </div>

            <div className="body-first ">
                <div className="container">
                    <div className="title container d-none d-sm-flex  ">
                        <h2 >
                            {t('homePage.BodyOne.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyOne.titleTwo')}
                        </h2>
                    </div>
                    <div className="title-mb container  d-sm-none col-12 ">
                        <h2 >
                            {t('homePage.BodyOne.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyOne.titleTwo')}
                        </h2>
                    </div>

                    <div className="card-container col-12 mt-3">
                        <div className="card  col-12 container col d-none d-xxl-block">
                            <div className="card-img col ">
                                <img src="https://www.iconpacks.net/icons/2/free-free-shipping-icon-2048-thumb.png" alt="" />
                            </div>
                            <div className=" card-content container mt-3 ">
                                <span className="d-flex align-item-center justify-content-center">
                                    {t('homePage.BodyOne.itemOne')}
                                </span>
                            </div>
                        </div>





                        <div className="card  col-12  container col d-none d-xxl-block">
                            <div className="card-img py-2">
                                <img src="https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png" alt="" />
                            </div>
                            {i18n.language === "en" ?
                                <>
                                    <br />

                                    <div className=" card-content container">


                                        <span className="d-flex align-item-center justify-content-center">
                                            {t('homePage.BodyOne.itemTwo')}
                                        </span>

                                    </div>
                                </>
                                :
                                <>
                                    <div className=" card-content container">
                                        <span className="d-flex align-item-center justify-content-center">
                                            {t('homePage.BodyOne.itemTwo')}
                                        </span>
                                    </div>
                                </>
                            }

                        </div>


                        <div className="card  col-12  container col d-none d-xxl-block">
                            <div className="card-img py-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/A_Friendly_Shipping_Guy_Cartoon.svg" alt="" />
                            </div>
                            {
                                i18n.language === "en" ?
                                    <>

                                        <div className=" card-content container">

                                            <span className="d-flex align-item-center justify-content-center">
                                                {t('homePage.BodyOne.itemThree')}
                                            </span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className=" card-content container">
                                            <span className="d-flex align-item-center justify-content-center">
                                                {t('homePage.BodyOne.itemThree')}
                                            </span>
                                        </div>
                                    </>
                            }

                        </div>

                    </div>
                    <div className="card-container-mb col-12 mt-3">


                        <div className="card-mb d-xxl-none  col-12 container  ">
                            <div className="card-img col">
                                <img src="https://www.iconpacks.net/icons/2/free-free-shipping-icon-2048-thumb.png" alt="" />
                            </div>
                            <div className=" card-content container mt-3 ">
                                <span className="d-flex align-item-center justify-content-center">
                                    {t('homePage.BodyOne.itemOne')}
                                </span>
                            </div>
                        </div>




                        <div className="card-mb d-xxl-none  col-12 container">
                            <div className="card-img">
                                <img src="https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png" alt="" />
                            </div>
                            <br />
                            <div className=" card-content container">
                                <span className="d-flex align-item-center justify-content-center">
                                    {t('homePage.BodyOne.itemTwo')}
                                </span>
                            </div>
                        </div>


                        <div className="card-mb d-xxl-none  col-12 container">
                            <div className="card-img">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/A_Friendly_Shipping_Guy_Cartoon.svg" alt="" />
                            </div>
                            <br />
                            <br />

                            <div className=" card-content container">
                                <span className="d-flex align-item-center justify-content-center">
                                    {t('homePage.BodyOne.itemThree')}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="body-second ">
                <div className="container">
                    <div className="title d-none d-sm-block ">
                        <h2 >
                            {t('homePage.BodyTwo.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyTwo.titleTwo')}
                        </h2>
                    </div>
                    <div className="title-mb  d-sm-none col-12">
                        <h2 >
                            {t('homePage.BodyTwo.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyTwo.titleTwo')}
                        </h2>


                    </div>

                    <div className="content d-none d-sm-flex ">
                        <div className="content-left ">
                            <h4>
                                {t('homePage.BodyTwo.titleThree')}
                            </h4>

                            <b>
                                {t('homePage.BodyTwo.titleFour')}
                            </b>
                            <p>
                                {t('homePage.BodyTwo.itemOne')}

                            </p>
                            <div className="my-3"></div>
                            <b>
                                {t('homePage.BodyTwo.titleFour')}
                            </b>
                            <p>
                                {t('homePage.BodyTwo.itemTwo')}
                            </p>
                        </div>

                        <div className="content-right col-12 col-sm-6 container">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-1_29d1f349522f488dac67405766968a2a.jpg" alt="" />

                        </div>
                    </div>

                    <div className="content-mb d-sm-none">
                        <div className="content-left-mb d-sm-none ">
                            <h4>
                                {t('homePage.BodyTwo.titleThree')}
                            </h4>

                            <b>
                                {t('homePage.BodyTwo.titleFour')}
                            </b>
                            <p>
                                {t('homePage.BodyTwo.itemOne')}

                            </p>
                            <div className="my-3"></div>
                            <b>
                                {t('homePage.BodyTwo.titleFour')}
                            </b>
                            <p>
                                {t('homePage.BodyTwo.itemTwo')}
                            </p>
                        </div>
                        <div className="content-right-mb col-12 col-sm-6 container">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-1_29d1f349522f488dac67405766968a2a.jpg" alt="" />

                        </div>
                    </div>
                </div>

            </div>
            <div className="body-Third ">
                <div className="container">

                    <div className="body-Third-header d-none d-xl-flex">
                        <div className="left">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-2_03471c492ac94fd291ca86cfb490e3f4.png" alt="" />
                        </div>
                        <div className="right">
                            <h4 className="mb-3">
                                {t('homePage.BodyThree.titleOne')}
                            </h4>
                            <span>
                                {t('homePage.BodyThree.titleTwo')}

                            </span>
                            <div className="right-text my-3">
                                <span className="number mx-3">1</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemOne')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">2</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemTwo')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">3</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemThree')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">4</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemFour')}
                                </span>
                            </div>
                            <span className="my-3">
                                {t('homePage.BodyThree.titleFive')}
                            </span>
                            <p>
                                {t('homePage.BodyThree.itemFive')}
                            </p>

                        </div>
                    </div>


                    <div className="body-Third-header-mb  d-xl-none col-12">
                        <div className="left container">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-2_03471c492ac94fd291ca86cfb490e3f4.png" alt="" />
                        </div>
                        <div className="right">
                            <h4 className="mb-3">
                                {t('homePage.BodyThree.titleOne')}
                            </h4>
                            <span>
                                {t('homePage.BodyThree.titleTwo')}
                            </span>
                            <div className="right-text my-3">
                                <span className="number mx-3">1</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemOne')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">2</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemTwo')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">3</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemThree')}
                                </span>
                            </div>
                            <div className="right-text my-3">
                                <span className="number mx-3">4</span>
                                <span className="text">
                                    {t('homePage.BodyThree.itemFour')}
                                </span>
                            </div>
                            <span className="my-3">
                                {t('homePage.BodyThree.titleFive')}
                            </span>
                            <p>
                                {t('homePage.BodyThree.itemFive')}
                            </p>

                        </div>
                    </div>


                    <div className="body-Third-footer d-none d-xl-flex my-3">
                        <div className="left">
                            <h4 className="my-3">
                                {t('homePage.BodyThree.titleThree')}
                            </h4>
                            <span className="my-3">
                                {t('homePage.BodyThree.itemSix')}
                            </span>
                            <h4 className="my-3">
                                {t('homePage.BodyThree.titleFour')}
                            </h4>
                            <span className="my-3">
                                {t('homePage.BodyThree.itemSeven')}
                            </span>
                        </div>
                        <div className="right">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-3_bf25330b5b7149d8b708f90941adf3ae.png" alt="" />
                        </div>
                    </div>

                    <div className="body-Third-footer-mb  d-xl-none col-12 my-3">
                        <div className="right container">
                            <img src="https://file.hstatic.net/1000001117/file/orders-mng-3_bf25330b5b7149d8b708f90941adf3ae.png" alt="" />
                        </div>
                        <div className="left">
                            <h4 className="my-3">
                                {t('homePage.BodyThree.titleThree')}
                            </h4>
                            <span className="my-3">
                                {t('homePage.BodyThree.itemSix')}
                            </span>
                            <h4 className="my-3">
                                {t('homePage.BodyThree.titleFour')}
                            </h4>
                            <span className="my-3">
                                {t('homePage.BodyThree.itemSeven')}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
            <div className="body-Fourth d-none d-lg-flex">
                <div className="container">
                    <h3 className="my-3">
                        {t('homePage.BodyFour.titleOne')}
                    </h3>
                    <h4 className="my-3">
                        {t('homePage.BodyFour.titleTwo')}
                    </h4>
                    <div className="image mx-3 ">
                        <img src="https://file.hstatic.net/1000001117/file/orders-mng-4_46a3c37184fe437bac32c8bab9f196a0.png" alt="" />
                    </div>
                    <div className="text container">
                        <div className="text-item  ">
                            <h5>
                                {t('homePage.BodyFour.titleThree')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemOne')}
                            </span>
                        </div>
                        <div className="text-item ">
                            <h5>
                                {t('homePage.BodyFour.titleFour')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemTwo')}
                            </span>
                        </div>
                        <div className="text-item ">
                            <h5>
                                {t('homePage.BodyFour.titleFive')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemThree')}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="body-Fourth-mb d-lg-none col-12">
                <div className="container">
                    <h3 className="my-3">
                        {t('homePage.BodyFour.titleOne')}
                    </h3>
                    <h4 className="my-3">
                        {t('homePage.BodyFour.titleTwo')}
                    </h4>
                    <div className="image mx-3 container">
                        <img src="https://file.hstatic.net/1000001117/file/orders-mng-4_46a3c37184fe437bac32c8bab9f196a0.png" alt="" />
                    </div>
                    <div className="text container">
                        <div className="text-item  ">
                            <h5>
                                {t('homePage.BodyFour.titleThree')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemOne')}
                            </span>
                        </div>
                        <div className="text-item ">
                            <h5>
                                {t('homePage.BodyFour.titleFour')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemTwo')}
                            </span>
                        </div>
                        <div className="text-item ">
                            <h5>
                                {t('homePage.BodyFour.titleFive')}
                            </h5>
                            <span>
                                {t('homePage.BodyFour.itemThree')}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="body-Fifth d-none d-sm-flex">
                <div className="container">
                    <div className="title  ">
                        <h2 >
                            {t('homePage.BodyFive.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyFive.titleTwo')}
                        </h2>
                        <h2>
                            {t('homePage.BodyFive.titleThree')}
                        </h2>
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col left py-3">
                                    <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                        <h4>
                                            <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                        </h4>
                                        <div className="text">
                                            <h4>
                                                {t('homePage.BodyFive.titleFour')}
                                            </h4>

                                            <p>
                                                {t('homePage.BodyFive.itemOne')}

                                            </p>
                                        </div>
                                    </div>
                                    <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                        <h4>
                                            <i className="fa fa-minus-circle" aria-hidden="true"></i>

                                        </h4>
                                        <div className="text">
                                            <h4>
                                                {t('homePage.BodyFive.titleFive')}
                                            </h4>

                                            <p>
                                                {t('homePage.BodyFive.itemTwo')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                        <h4>
                                            <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                        </h4>
                                        <div className="text">
                                            <h4>
                                                {t('homePage.BodyFive.titleSix')}
                                            </h4>

                                            <p>
                                                {t('homePage.BodyFive.itemThree')}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="col right">
                                    <div className="img">
                                        <img src="https://file.hstatic.net/1000001117/file/orders-tab-1_0af2fc9a40084f81948a54482978b092.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </div>
            <div className="body-Fifth-mb d-sm-none col-12">
                <div className="container">
                    <div className="title  ">
                        <h2 >
                            {t('homePage.BodyFive.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodyFive.titleTwo')}
                        </h2>
                        <h2>
                            {t('homePage.BodyFive.titleThree')}
                        </h2>
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="col left py-3">
                                <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                    <h4>
                                        <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                    </h4>
                                    <div className="text ">
                                        <h4>
                                            {t('homePage.BodyFive.titleFour')}
                                        </h4>

                                        <p>
                                            {t('homePage.BodyFive.itemOne')}

                                        </p>
                                    </div>
                                </div>
                                <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                    <h4>
                                        <i className="fa fa-minus-circle" aria-hidden="true"></i>

                                    </h4>
                                    <div className="text">
                                        <h4>
                                            {t('homePage.BodyFive.titleFive')}
                                        </h4>

                                        <p>
                                            {t('homePage.BodyFive.itemTwo')}
                                        </p>
                                    </div>
                                </div>
                                <div className="left-text d-flex text-centrel gap-3 col-xm-6">
                                    <h4>
                                        <i className="fa fa-minus-circle" aria-hidden="true"></i>
                                    </h4>
                                    <div className="text">
                                        <h4>
                                            {t('homePage.BodyFive.titleSix')}
                                        </h4>

                                        <p>
                                            {t('homePage.BodyFive.itemThree')}

                                        </p>
                                    </div>

                                </div>
                                <div className="col right">
                                    <div className="img container">
                                        <img src="https://file.hstatic.net/1000001117/file/orders-tab-1_0af2fc9a40084f81948a54482978b092.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </div>
            <div className="body-Sixth d-none d-sm-flex">
                <div className="container">
                    <div className="content d-flex text-centrel flex-column gap-3">

                        <h2>
                            {t('homePage.BodySix.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodySix.titleTwo')}
                        </h2>
                        <h2>
                            {t('homePage.BodySix.titleThree')}
                        </h2>

                    </div>
                    <div className="simple_shapes d-none d-xl-block">
                        <span className="shape-1">
                            <i className="fa fa-square-o" aria-hidden="true"></i>

                        </span>
                        <span className="shape-2">
                            <i className="fa fa-square-o" aria-hidden="true"></i>

                        </span>
                        <span className="shape-3">
                            <i className="fa fa-square-o" aria-hidden="true"></i>

                        </span>
                        <span className="shape-4">
                            <i className="fa fa-square-o" aria-hidden="true"></i>

                        </span>
                    </div>
                </div>
            </div>
            <div className="body-Sixth-mb d-sm-none col-12">
                <div className="content d-flex text-centrel flex-column gap-3 container">

                    <h2>
                        {t('homePage.BodySix.titleOne')}
                    </h2>

                    <h2>
                        {t('homePage.BodySix.titleTwo')}
                    </h2>
                    <h2>
                        {t('homePage.BodySix.titleThree')}
                    </h2>
                </div>
                <div className="simple_shapes d-none d-xl-block">
                    <span className="shape-1">
                        <i className="fa fa-square-o" aria-hidden="true"></i>

                    </span>
                    <span className="shape-2">
                        <i className="fa fa-square-o" aria-hidden="true"></i>

                    </span>
                    <span className="shape-3">
                        <i className="fa fa-square-o" aria-hidden="true"></i>

                    </span>
                    <span className="shape-4">
                        <i className="fa fa-square-o" aria-hidden="true"></i>

                    </span>
                </div>
            </div>
            <div className="body-Seventh  d-none d-sm-flex">
                <div className="container">
                    <div className="content">
                        <h2>
                            {t('homePage.BodySeven.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodySeven.titleTwo')}
                        </h2>
                    </div>
                    <div className="brand py-3 ">
                        <div className="container">
                            <div className="brand-img">
                                <div className="brand-img-item d-flex gap-5 py-3">
                                    <div className="image">
                                        <img src="https://i.pinimg.com/564x/d4/78/85/d4788505f0a4168b150a4592b60b5bed.jpg" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="data:image/jpeg;base64,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" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-vietjet_d0b61ddbedb64c749bfecbd33c5f0a4f_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-tigerbeer_a458713313c942a085a6613be2060a18_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Coffee_House_logo.svg/2560px-The_Coffee_House_logo.svg.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000001117/file/socialcommerce-maybelline_2dd21f2d18fa4160a07d1c1c1c6d2a28.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-dell_46bed678f4dd45278f27431292fce520_large.png" alt="" />
                                    </div>
                                </div>
                                <div className="brand-img-item d-flex gap-5 py-3">
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logobitis_ee68d228b7e544cdbf9d1e75c233f632_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-vinmart_4b97d91ce67042a5832ea66483cc108e_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-abbot_f7db401abdb0444cb2f36622763d5c96_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-lorael_5e052b801ead4525b0ae2902eaad73fb_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEHrqm9mu-2OJUZL6CmFeYlbMuLAn5W9LG37QW7Me&s" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-manulife_0c67af9725eb4fe69c285f71bb24a613_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://quyhyvong.com/wp-content/uploads/2022/12/Logo-Con-cung.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-Seventh-mb d-sm-none col-12">
                <div className="container">
                    <div className="content">
                        <h2>
                            {t('homePage.BodySeven.titleOne')}
                        </h2>
                        <h2>
                            {t('homePage.BodySeven.titleTwo')}
                        </h2>
                    </div>
                    <div className="brand py-3 ">
                        <div className="container">
                            <div className="brand-img">
                                <div className="brand-img-item  gap-5 py-3">
                                    <div className="image">
                                        <img src="https://i.pinimg.com/564x/d4/78/85/d4788505f0a4168b150a4592b60b5bed.jpg" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTERYTExIWFxYYFxgWGhcZGRYZGRcYGBgYGRgeFhsZHioiHhsnHhkXIzMjJystMDAwGSE2OzYuOiovMC0BCwsLDw4PHBERHDsoIic4ODIvLzEtLTgvLzEwLy8tOC8vLzIxOC8vLy8vLy8vLzEvLy8xLy8xLy8vLy8vLy8vL//AABEIAJkBSgMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAABAUGBwECCAP/xABSEAABAwIBCAUEDQkGBQUBAAABAAIDBBESBQYTITFRYXEHIkGBkTJyobEUIzVCUmJ0gpKys8HRFSUzNENTc6LCFkSDk7TDCCRU0vAmY2TE0xf/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIEAwX/xAA1EQACAQIEAwQJAwUBAAAAAAAAAQIDEQQSITETQVEFYYGhFCIyM0JxkbHwUmLBFUTR4fEj/9oADAMBAAIRAxEAPwC8UIQgBCEIAQhCAEIQgBCEIDCE35TyzTwC800ce4Pc0E8gTc9yitf0p0TNUQlnPxGYR3mTCfAFWjCUtkRdE7WFU1Z0oVb/ANDSRx8ZHOebchgsfFMtVnXlSXyqoRg+9jYwW5HDi/mXVYab30Fy80jqspwxfpJo2ec9rfWVQdQ2aX9NUzyX7HSPI8HErwZkqIe99P4LosKucvIi7Lwmz1ye3bWQnzXh/wBS6b5ekrJo/vDjyim9ZZZVK2ijHvB6/WtxAwbGN8ArrDQ7xdlnSdKeTxsMzuUZ/qISZ/S5RDZFUHk2L75Qq9DBuHgsqVhofjGpP/8A+vUf7ip+jD/+qy3pdo/3FSPmw/dKq/Qno8PxjUsiPpVoDtEw5xj7nFKY+k3Jp2zPbzilP1WlVaWjcFqYWna1vgE9Hh3jUuKDPvJz9lXGPOxM+uAnGky9Sy/o6mB/mysd6iqJNJGfeN8LepeT8mxH3vpP3qrwseTF2dGByyuc6ejMf6GaWPzHFv1bJzpcvZRi/R10h/iWk8TIHFUeFfJk3L5QqfpekjKEf6WCCUfFxMce+5H8qfaHpXgNhPBLCe0iz2jv1OPc1c3QqLkLosNZTHkrOyiqLCKpjLjsYTgefmPs70J8XFprckEIQgBCEIAQhCAEIQgBCEIAQhCAEIQgBYQmvLmXaekZjnlawHYNrncGtGs9yJNuyA6JBlXK0NOzHNKyNvZiIBPBo2uPAKq84elKeW7KVmhZ+8dZ0p5DW1v83MKCzzmR5kke6R52veS5x7ytVPCSestCrkWnlfpVjF20sDpD+8k9rZzA8o8jhUPylnbX1F9JUmNp95CNGPpDr+Lio7pkada4YeEdkRcUMp4wSSMROslxuSeO9KWygbLDkm7To066ZSBy06NOm3To06nKTcctOjTpt06NOmUXHLTo06bdOjTplFxy06NOm3To06jKLjlp0adNunRp0yi45adGnTbp0adTlFxy06NOm3To06jKLjlp0adNunRp1OUXHLToMybdOjTplFxVLBG7a0d2r1Jdk3LFVT20FVI1o94442dzXXA7gmfTo06hxvoyCxsldKsrLCqpw4fvITY/QcbHniHJTrIeddJV6oZml37t3Vfx6rrEjiLhc/6debyDrI17b9t1wnhYy20JzHUCAqIyB0g1lNZrn6eMe8lJxgfFk2/SxclaObWelLWWax+CX90+wfxw9jhyPMBYp0Jw15Fk7knQhC5EghCEAIQhACEIQAsLV7gBcmwHaqV6ROkF05dT0ryIRcPkGoy7wD2R/W5aj0p0pVHZEN2JFnp0msiLoqPDJINRlOuNh+J8N3HyRx1hVJXV8s0hlmkdI921zjc8uA3AaglWQc3qmscW08RfhtiddrWtvsuXEbtgueC9cv5sVVHYzwlrXGzXgtcwm17XadR26jYmxtsXpUoU6by8/Mo22NOMoxlaLeGJz3BjGlznENa0AkuJ1AADaVoIDGUYypVL0cZRbEZTC3UMRjD2mS3bqGongDdMWRMiVFW4sp4XSEAEkFoa0HZic4ho7bC9zY2vZUVWDV0xZiLGUYynLLeblVSW9kQuYHGzXXa5pO22JhIB26jY6juSjN7NGrrWl8MQwA2L3uDW3HYL6yeQIU542zX0Ay4yjGUsy1keall0U8ZY/aL2IcN7XDUR/wCGxSBSmmroG+MoxlK8j5KmqpRDBGXvILrXAAaLXc4kgAC48QNpCcsv5mVlIzSTQjR6gXscHtaTqGK2sa9VyLawLqHOKdm9QMWMoxlaXQSrA3xlGMqQ/wBhcoex/ZHsc4MOPDdukw2vfBe+zs8rgo2CqxlGWzBvjKMZWidcgZuVNY5wp4seG2JxLWtbfZcuO3gLlS2krsDbjKMZTjlzN6qoyBUROYHGzXXa5jjuDmki+3UbHUdSa0TTV0DfGUYytFIMi5mV1UwSQw+1m9nuc1gdb4Nzc87W4pKSirtgYsZRjKV5XyVNTSaOeIxvtexsQQdhaWkgjUdhTjkLMytq49LDF7XrAe5zWBxBscN9Z16r2tqIuoc4pXb0Ax4yjGUrytkqamk0U8To32vY2II3tIJBHIp2yLmNXVMYliiAjcLtc9wZjG9oOu24mwPZdHOKV29AR7GUYyvbKNBLBK6KaMxyN2tNtV9YsRcEcQSEmVlqDfGUYytWgkgAEk6gALkk7AANpUtPRtlLR6TRN2X0eNuk8PJvwxXVZTjH2nYEUxlAkNwe0G4O4jWCOK1cCCQQQQSCCCCCNRBB1gg9i96Gjkme2OJjpJHGzWt2nt7dQHE6h2qXYE+zO6TpYrRVmKSPYJdsrPO/eD+bb5WxXDQ1kczGyRPa9jhdrmm4IVA5U6P6+CEzPiaWNGJ2B7XOY0C5JHaB8W/gvDM3O+aglu0l8Lj7ZETqPxmfBfx7dh7LYalCE1mpllJrc6OWEhyPlSOphbNC7Ex4uD2g9ocOxwOohL1gatoy4IQhACEJLlGrbDDJK/yY2Okd5rGlx9ATcFZdMGdhb/yMLtbgDMRtDTrbH3jWeBA2EqpV7V9a+eV80hu+Rznu5uN7DgNg4ALwXtUaSpxscm7lqdB2VWh09KdRdadp32sx47uoRzO5WJnbkgVdHNBqxPYcBPZI3rMP0gO6656zZysaSrhqOyN4xbdcburJqG3ql1uIC6bY4EXBuDrCwYqLhUU1z+6LR1VjlLX2gg9oOog9oPFWJ0L5G0tU+pcOrC3C3+JICNXJmL6YTL0oZH9jZQlIFo5vbm7uuTpBzxhx5OCt7o4yL7FyfExwtI8aWTfjksbHi1uFvzV3r1lwdOYitR1zjyq2lpZZ3bI2FwHwnbGN5lxaO9QnoLH/ACUx7fZLgTvtDD+J8Ug6b8tWENG07fbpPNF2xg8C7GfmBOPQZ+ozfKXfYwrNw8tDN1Jv6w6dLo/NM/B0FuHt8Q9RKz0Re5MHnTfbyI6XvcifzoPt4kdEHuTB50/+olT+38f4HMdM8M2o6+nMT7NeOtHJa5Y/sPFp2Edo3GxHO2UqCSCV8MrcMjDZw7N4IPa0ixB7QQup1COkrM0VsWljA9kRtOHYNKzaY3HxLSdhJ2AlThq+R5ZbfYSVyH9Bn61P/BH1wrKz5H5trPk058I3EKtOg4EVdQCCCIgCCCCCJLEEHWCD2KzM+fcys+TT/ZOU4j3/ANAtjmtPmZGR/ZddDCRdmLSSbtHH1nA8HHCz56YlcHQhkfDFLVuGuR2iZ5kZ65HN+o/wwtuIqZKbZVK7LRXN+f2RvYlfLGBZjjpY/MkJNhwa4PaODQukLqtumrIukpmVLR1oXYXfw5CAfB+DkC5efhamWp8y0loUwrv6E47ZPefhTvPgyNv3Kj1e/Q0382NO+WU/zW+5bMZ7vxKx3JPnDkllVTSwP2PaQDa+F21rhxa6x7lzNU0743ujkFnsc5jhuc0kOHiCurFSPTPkLRVTKlo6kwwu4SsH9TAPoOPas+DqWllfMmS5kIyPk51RPFAzypXhgO4HW53zWhzuTV09RUrYo2RMFmMa1jRua0AAeAVS9CWRMT5ax41M9pj842dIRyGFoPxnBXCoxlTNPKuRMUVF08N69Gfi1A8DBb1lT/MUfm2k+TQnxjaoJ08N/VD/ABx46H8FPMxfcyj+TQ/ZtVZ+4j+dQtyven7bSH4lT/sK2aVoDGgCwDQAB2AAbFUn/ED/AHTzKn/66t2HyW8h6kqe5h4/cLdlKdNoH5QjP/x2fayqvlYPTf8Ar8Xydv2sqr1b8P7qJWW4/ZitBylSgi/tzT3i5HpAK6TXNmYZ/OVL/Gb6iuk1jxvtr5EwOc88KN8uVp4YWFz3zENY3aSQCeXaSTqGslXBmHmbHQRXNnzvHtknYO3BHfYweLjrPYAvyRm1DDUT1VsU0ziS8+8Zqsxm4agSe08AAN86M4YaGAyyngxg8qR3Y1o9Z2AXJVJ1nNKEf+kpW1EufOcTKOke9xBke1zImdr3kW2fBF7k7uJAPOTRYWTnnDl6asmdNMdZ1NaPJjb2NZw49p1psW7D0uHHvZVu5MOjfOs0VQGSO9olIEl9jHbGyDlqB4b7BdArk1dB9F2WTU5PjLjd8RMLj29QDCTxLCwnjdZsZS+NeJMXyJghCFhLmFGOkqQtyXUkdsYb3Oc1p9BKkzTcJnzvyc6ooaiFou58Tw0b3gXZ/MArQazJkPY5lQgFC9w5AugOinLHsjJ0bSbvgOgdyYBozr29Qs17wVz+p70N5Z0NcYSepUNw/wCJHdzOV26QcSWrNiYZ4Pu1Ji9Szc9M021z6Vxt7VMHPv76Ei72fOc2McrqTPeACSbAC5J2ADbdbqDdLuW9BQOjaevOdEPMteU8sPV5vC82OabUTo9NSms58rmrq5qg3s9/UBvqjb1YxY7DhAJG8lWv0F/qM/yp32ECpNXX0F/qM/yp32EC9HFJKlZdxSO47dL3uRP50H+oiWOh/wByIPOn/wBRKs9L3uRP50H+oiR0Qe5MHnT/AOolWP8At/H+C3MTZ7Z3uyfXU+K7oJGPErQLkWc3C9nFtzcdoJ7bKa01Q2RjXscHMcA5rgbhzSLggjaCFUPTt+npv4cn1mJH0W57exnilnd7Q89R5/Yvcdh3RuPgTfYSRZ0L0lOO4za2LVpM3o462Srj6rpYwyRo2OcHAh43EjUd9gdt74z69zKz5LP9k5PiY8+fcys+TT/ZOWeLbkrk8jmyngdI9sbBd73NY0b3OIa0d5IXUGQ8nNpqeKBmyNjWX3kDWTxJue9Ut0PZH01fpXDqQNx/4j7tjHhpHc2hXwteMqXkodCsVzKtizx/9Quix+0lvsS1xh0jSX4vO0hdH3hWTlGjZNFJDILskY5jh8VwIPrXj+SKfFi9jxYr4sWBl8V73va9767pess5J2yq1iyOVcpUL4JpIZPLje5h7L4Ta44EWI4EK9eh4fmqI73zfbPH3KFdNmRNHUR1TR1Zho3/AMSMdUni5mr/AAlOeiNtsk0/Oc+M8tvQtlepnoKXeVirMlbZ2l5jBGJrWuLe0NcXBp7yx3gmbPjIfsyilhAGO2OMnVaVmtmvsBPVJ3OKi2dWcHsPLlO5zrRyQNik3Br5ZMLj5rgDfdi3qyFjacLSXzLbjTmvkhtJSRU7bdRvWI9889Z7u9xJ704QStdctINiWm29psR3HUmvO7LbaOkknNiWizGn30jtTByuRfcAT2Jn6JZnPyZE97i5zpJ3OcdrnGeQkniSSUcW4ub6i/Ij3TwPaqY/HkHi1v4KbZie5lH8mg+zaoZ07D2inP8A7rh/IfwUzzE9zKP5NB9m1dZ+4j8yFuV3/wAQX908yp/2Fb0Pkt5D1Kof+IL+6eZU/wCwreh8kch6lNT3MPH7hbspLpw/X4vk7ftZVXiszpkybPLXROjgmkboGjFHFI8A6SU2Ja0i9iNXFQ/JWaFdO/AyllG90jXRNHMyAX5C54LZQmlSV2Ve5tmH7pUv8Zv3rpVc/ZHzenosq0kc7A0ula5rmnE1wBscJ4HaDY6xvC6BWXFtOSa6ExAqnOmvIcwlZWYnPhwiMtOyF19VtzXm2v4QAvraBKM3s8B+UqmgmdYiVxgcTtvrdGeO0t4XGqwvM62lZLG6KRocx7S1zTsIOogrlCUqM03+JlnqjlRClOfWZ0tBJcAvgcfa5N1/eSbnjfscNY7QIsvWhNSV0c3oCuDoIkOiqW9gkY7vc1wP1QqfV2dCFCWUUkpH6WU4eLIwGX+npB3Lhi3/AOZMdyyEIXlpW715LaOgnyZLiZbtYSw82m3pFj3pYmGsn9j1Ief0c1muPY17RYHvHqJ7E/BcaU73i91o/wCGQiiOlTNJ1NOaiNvtEriTbZFK43LTua46wd5I1arwRdVVlIyWN0cjQ9jwWua4XBB7CqRz36N5qUumpg6WDWcIuZIR8YbXtHwhrA27C4+vh8QrZZblZR5oga9KWpfFIySM2exzXtO5zSHNvwuAvIG6ytpzOo8i5RZUQRTs8mRgeB2i41g8Qbg8QqL6Vct+ycoPa03jgGhbuxA3lPPF1f8ADCZcnZyVcERhhqJI4zc4WkWBO3CSLtvt6ttevampZaWHyTcvoXcroFc/QZIPYc7b6xUlxHbZ0MIB5Xa7wKphLMl5Vmp36SCV8TiLEtO0bnA6iOYK61qfEhlRVOzLx6X5AMlTAkAufAGjeRNG4gfNa49xWeiE/mmHg+e/D2+Q+ohUjlfLlRUkGomfLh2YiLDfZrQGg8bLfI+cNVShwp53xBxuQMJaTsvheCL2sL2vqG5Z/Rnwsl9b3LZtbk56dHj2RTi+sRPJG4F7beo+CrJKsoV8s8hlmkdI87XONzq2AdgHAakmWmlDJBRKt3Zb3RRntjDaKof1wLQvJ8to944/CA2HtAttHWmufjwMmVlza9PM3vdG5oHeSB3rm0OsQQSCCCCNRBGsEHsPFOmUs5qyoiEM1TJJGCDhOGxI2YiAC623rE6xfas88LeacSynpYuXohyc2LJrJBbFM58jjt2OLGjuawat5KbOmTOJ8MUMEMr45HuMjnRuLXiNuoC7SCMTj34HBVhkjOqspYzFBUPjYSThtG4AnbhxtOG/C29NlXVPle6SV7nvcblziXOPMn1diRwz4maTGbSws/tFW/8AW1X+fP8A96tLoazjfM2annlfJI0iVjpHl7iw2a4XcSSGuAP+IqcXtS1T4ntkie5j2m4c0lrhyI8OK61KMZRaRVOzOgukyiZJkyox2GjZpWnc+PrADi7W35yx0YOByVT2N+q8HmJH4h43VHZVzlq6hmjnqJJGXBwmwaSNlw0C9tuu60yVnDVUzS2CokjaTctBBbffhcCAeI16guHo0uHkvzuWz63JZ03OBygwbbUzL98k23ut4qwOjDOYVdI1j3gzRAMeCes5o1MfxuLXPwg5ULVVL5Xukke573G7nOJc4niTwsOQC8SBuXWWHUqag3tzIza3LC6Ys4hNUtpmOvHBrdbWHTOFj9Bptq7XvHYpz0PSA5LjAIJbJMHDcTI5wB+a5p7wqEAS7JWWJ6dxdBM+InbhNg7dibsPeEnh70lBcgpa3LX6dSPY1OL69OdXDRuv6x4qXZgyh2TKQgg2giabfCY0NcO5wI7lzzlPKs1Q8PnlfK4CwLjew3NGwdwXrkrL1TTgiCokjadZa13Vvvwm4vxtdc5Ydumo31RObW5Pen6QF9KwEFwjnJHaA8whpPMtd9Eq3KOVr42vaQWua1wI2EEAghct1VVJK8ySvc97trnuLnHvKV0eXqqJgZFVTMYNjWyyBo5AGw7lM8M3TjG+38hS1udQoXMn9qq7/raj/Ok/FayZzVrhY1tRb+NKPU5cvQ59Sc5aGfuVIjlfJsQe3FFLd/xTK6MMB3E4SbcW7wrNXJpOsk7Sbk9pJ1knipE3PnKQj0QrJMNrbIy+38Qtx344rq9TCNpKL2CmeOfEt8pVLmu2TOs5psQ5pA1EbCHDuIVn9HXSE2oDaaqcGzjUx5sGzbuAl3jYdo7QKUJQVonRjOCi+RVSszqqtpI5Y3RyMa9jhZzXC4I4hc6595AZQ1r4Y3FzC1sjL6y1ryeq49pBade2xF9a86bPCvjbgZWTYeLsZ7i8E+lemQc36vKczi0udc+2Tylxa3m463OAtZg4bBrHGlSdFtyloS5XEWbWQpa2obBENut7+yNl+s4/cO0kBdJ5LoWQQshjFmRtDGjg0W1ntO89qbs1c2oaGHRRC5Ni958qR287huA1DxJfVlr1uI7LZFoxsaSPDQSTYAXJ3AbUxMoXSASYiMfWtuxa7elb5YqNLI2lYdbrGQj3sY1kczqHfxT3Zee5ObeV7EibKNE2aNzHduw7j2EKM5Jys6neYJ72abB23COzmzdu9UxTPl7I7Z2XFg9vku+48PV4g88VRldVKXtLzXRhrmh1ZIHAEEEHWCNYI4LdV5RZSmpXlhGoHrMds5jdzGo8VLsl5cimsAcL/gO1Hu7D3KuHx8Kvqy9WXRhSTI/nV0cUtWS9g0Mx142AYXHfJHqB5ixO9VTnDmFXUty6HSxj9pFd4t8ZtsTeNxbiV0WEL1aeInDTdEOKZycBfYjCukct5n0VUS6WBuM/tG9R/e5tr991Ccq9EW009RfcyYf1sH9K2QxcJb6FHBoqTCjCpdlHMSuhvip3PHwo7SA9zet4gJhkpi1xa4EOG0EEEcwda0RmpbMo9BvwowpfoEaBWFxBhRhS/QI0CC4gwowpfoEaBBcQYUYUv0CNAguIMKMKX6BGgQXEGFGFL9AjQILiDCjCl+gRoEFxBhRhS/QI0CC4gwowpfoEaBBcQYUYUv0CNAguIMKMKX6BYMKC4hwowqQZOzbqZraGnleDsdhIb9N1m+lSrJfRRUv1yyRwjcLyP7wLN/mK5yqwjuyUmytcKcMkZDqKp2GCF8muxIFmt855s0d5V2ZH6M6GGxex0zt8pu36As0jzgVMIYWsaGsaGtGoNAAAHADYs08Zb2UXUHzKvza6I2ts+tkxnbooyQz579Tnchh5lWdSUrImNjjY1jGizWtAa1o3ADUF7pNWVscTcT3ho47TyG0nksVWs5etN6eRdJIUqP5ezgbEDHH1pNm8N57zw8eLVlfOd77siuxuzF788reT6+SWZtZAIImlHW2tYfe8XfG4dnPZ5MsXKvLh0PGXJfIjNfRC7NzJhjaZJNcj9bidoG0Dn2njyT2hC9ClTVOKjElIyhCF0JG3K+SWTts7U4eS4bR+I4KC5SybJC60g1HY4eSeR38FZa8p4WvaWuALTtBFwV5+LwEK/rLSXUrKNyCZPzhmj1YsbdztZ7nbfWpFRZ0Qv1PvGfja29zh99k3ZUzUIu6A/McfquPqPio3NE5ji17S1w7CLLy+Ni8I8stV36rwZW7iWfFK1wu1wI3ggjxC3Kq+GV7Ddj3NO9pI8bJ2ps6J2anYXj4wsfFtvUVrpdsU5aTVvNEqfUnaT1dFHKMMkbHjc9rXDwITHTZ3Rny2Obys4fcfQnOny3A/ZK3k7qn+ay9Cni6M/Zmi10xqrMxKCTXoAw72Ocz0A4fQmWq6LID+jnlb5wY8egNPpU+a8EXBuOC2WyNaa2ZDjF8iqKnotnH6OeJ3nB7PViTdUdHlc3ZEx/myN/rwq6ULqsVURXhxKGmzRrGbaaX5ox/UJSKTItQ3yoJm845B6wuhUK6xkuaI4S6nOEkGHyhbnq9a10Y3hdI2Xi+lYdrGnm0FX9N/b5kcLvOddEEaJdBvyTAdsER5sYfuXmcg0p200H+Wz8E9MXQcJ9SgNCjRK/f7PUn/AElP/lR/9qyMgUo2UsH+XH+Cn01dBwn1KB0QWNGN66DbkanGyniHKNn4L2bQxDZGwcmtH3J6av0jhPqc7CMb0piyXK7yYpHcmOPqC6GDANgAWyq8b+3zHC7ygoc2Kt2ymm743N9LgEugzDrnfsMI3ufGPRiv6Fd6LKrxk+SRbhIqGn6Mao+U+Fo857j4BtvSnWm6Km/tKkngxgHpc4+pWShUeJqPmSqcSH0fRvQs8psknnvI+zwp9ocg0sOuKniYfhBjcX0rX9Kc7pJUZQij8uRreBcL+G1Z513b1pafMtZIVoTFUZ0wN8kuf5rbel1k01Od0h8hjW8XEu9VvvWKp2hQp/Ff5EOSJmm2ty3DHqc8E/Bb1j6NnfZQerypLJ5criNw1DwFgkS86r2w9qUfF/4KuZJK/Ox7tUTQwfCNi7w2D0pjAkmksMUjz3n07B6AnTJebUslnSe1s4+WeQ7O/wAFMMn0EcLcLG23naTzPaq08NicU71m1H82QSctxqyFm6IrPfZz+zc3lvPFSBCF7dKjClHLBWRdKxlCELqSCEIQAhCEBhJqyhjlbhewOHHaOR2juSlCrKKkrNaAiNfmkRrhf81/3OH3jvTDVU0kZtLGW8ew8iNRVmLRzARrF+a8yv2VSqax0fkUcehWAAOwoMJU3rc2oH6w0sO9uofR2ehM1RmpMzXE9rxuPVP3j1LyavZmIp+yrruIy9wwxlzDdpLTvBI9SWRZZqG7JXfOs76wK1nppo/LicBvtq+kLheLZmHeP/OCyZ69J21X1Qt3jpFnXUDaGu5tI9RCWR54O7YgeTiPWCmIMadhCyaZdI9pV4/E/En1uRJWZ4R++jeOWE+shKI86oDtxjm38CVDzTLU060R7Yrrmn4D1ibtzlpj+0tza/8ABercvU5/at77j1hQIwFY0BXVdtVOaXmLyLDGWKf99H9ILP5Wg/fR/Tb+KrrQlGiKv/Wp/pXmMz6Fi/lWD99H9Nv4o/K0H76P6bfxVc6Io0RT+tS/ShmfQsb8rwfvo/pN/FaOy3Tj9szxv6lXmiKzoSofbU/0rzGZ9CePzjph+08GvPqC8nZ0U42OceTXfeoRoSs6Aqj7ZrdF9GRmkS92d0XYyQ9zR/Uk0meI97Ce99vUCo0KcrYUy4y7Wrv4reCHrDzLndMfJZGOeI/eEikziqHftLcmtHptdIzCBtIWhcwcVwljq8/ifhp9g782bS1kj/Lke7gXOI8Ni8A3glEEb5DaONzuQJ8bbE6U2bNQ/wArDGOJufBv3lI0a9Z3Sb7/APZFrjIQsxRuecLGlx3AEnwCmVJmnE3XIS8/RHgNfpT5T0zGCzGtaNwAHqXo0eyJy1qO3myVBkOoM1ZX65CGDd5TvRqHj3KS5OyNDD5Det8J2t3j2d1k5IXrUMFRo6xWvV7l1FIyhCFsJBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIDCR1OTYZPLiaTvsL+I1pasKsoRkrSQI/UZpwO8nGzk64/mukMuaDx+jm7iCPSD9ylyyslTs/Dz3j9NCMqINJkCrbswu5OH9QC8JKOqbthJ5DF9UqfrCyVOxsO9rr6EaldOfI3yoXDmHD1heXs5va23eFZBXhUbFjqdj01rm8hd9SAezWbj6PxWfZce53gPxT3X7UwVa86pgow2ZXiM9PZUfxvAfij2VHud4D8U3le9PtC4Kgm7DOz3NZHuPo/FYNcz4J8QnWh7FJaLYFup9mxlvLyCm2QdkzneTE48gT6gvdlNUO2QO72uH1rKwAhb49jUlvJl9epBmZDq3e9DebmfdcpVFmlMfLlaOWJ3rspgFlbIdkYaPJvxISuRuDNCIeU97vBo9Av6U5U+Q6dnkxN5nrH+a6c1haoYWjDaKJSSMAW1BbIQtJIIQhACEIQAhCEAIQhACEIQH//2Q==" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-vietjet_d0b61ddbedb64c749bfecbd33c5f0a4f_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-tigerbeer_a458713313c942a085a6613be2060a18_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Coffee_House_logo.svg/2560px-The_Coffee_House_logo.svg.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000001117/file/socialcommerce-maybelline_2dd21f2d18fa4160a07d1c1c1c6d2a28.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-dell_46bed678f4dd45278f27431292fce520_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logobitis_ee68d228b7e544cdbf9d1e75c233f632_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-vinmart_4b97d91ce67042a5832ea66483cc108e_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-abbot_f7db401abdb0444cb2f36622763d5c96_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-lorael_5e052b801ead4525b0ae2902eaad73fb_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrEHrqm9mu-2OJUZL6CmFeYlbMuLAn5W9LG37QW7Me&s" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://file.hstatic.net/1000377962/file/socialcommerce-logo-manulife_0c67af9725eb4fe69c285f71bb24a613_large.png" alt="" />
                                    </div>
                                    <div className="image">
                                        <img src="https://quyhyvong.com/wp-content/uploads/2022/12/Logo-Con-cung.png" alt="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-Eighth d-none d-sm-flex">
                <div className="container">
                    <div className="first">
                        <h2> HUY LE</h2>
                        <h5>
                            {t('homePage.BodyEight.titleOne')}
                        </h5>
                    </div>
                    <hr />
                    <div className="second ">
                        <div className="container">
                            <div className="row">
                                <div className="col logo d-flex ">
                                    <div className="container">
                                        <div className="item d-flex ">
                                            <div className="image">
                                                <img src="https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg" alt="" />
                                            </div>
                                            <p>
                                                {t('homePage.BodyEight.titleTwo')}
                                            </p>

                                        </div>
                                        <div className="item d-flex">
                                            <div className="image">
                                                <img src="https://download.logo.wine/logo/Meta_Platforms/Meta_Platforms-Logo.wine.png" alt="" />
                                            </div>

                                            <p>
                                                {t('homePage.BodyEight.titleThree')}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="body-Eighth-mb d-sm-none col-12">
                <div className="container">
                    <div className="first">
                        <div className="container">
                            <h2> HUY LE</h2>
                            <h5>
                                {t('homePage.BodyEight.titleOne')}
                            </h5>

                        </div>
                    </div>
                    <hr />
                    <div className="second ">
                        <div className="container">
                            <div className="row">
                                <div className="col logo d-flex ">
                                    <div className="container">
                                        <div className="item d-flex ">
                                            <div className="image">
                                                <img src="https://www.logo.wine/a/logo/Google/Google-Logo.wine.svg" alt="" />
                                            </div>
                                            <p>
                                                {t('homePage.BodyEight.titleTwo')}
                                            </p>

                                        </div>
                                        <div className="item d-flex">
                                            <div className="image">
                                                <img src="https://download.logo.wine/logo/Meta_Platforms/Meta_Platforms-Logo.wine.png" alt="" />
                                            </div>

                                            <p>
                                                {t('homePage.BodyEight.titleThree')}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="footer d-none d-sm-flex">
                <div className="container">

                    <div className="social  ">
                        <div className="container">
                            <div className="row">
                                <h3 className=" title" >
                                    {t('homePage.BodyEight.titleFour')}
                                </h3>

                                <div className="icon  facebook   col">
                                    <i className="fa fa-facebook-square" aria-hidden="true" title="Facebook"></i>

                                </div>
                                <div className="icon twitter  col">
                                    <i className="fa fa-twitter" aria-hidden="true" title="Twitter"></i>

                                </div>
                                <div className="icon google col">
                                    <i className="fa fa-google-plus-official" aria-hidden="true" title="Google"></i>

                                </div>
                                <div className="icon youtube col">
                                    <i className="fa fa-youtube-play" aria-hidden="true" title="youtube"></i>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="store  ">

                        <div className="container">
                            <h3 className="title">
                                {t('homePage.BodyEight.titleFive')}
                            </h3>
                            <div className="store-Mobile">
                                <div className="appstore item  ">
                                    <img src="https://www.logo.wine/a/logo/App_Store_(iOS)/App_Store_(iOS)-Badge-Alternative-Logo.wine.svg
                                " alt="" />
                                </div>
                                <div className="google-play item " >
                                    <img src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Logo.wine.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-mb d-sm-none col-12">
                <div className="container">

                    <div className="social  ">
                        <div className="container">
                            <div className="row">
                                <h3 className=" title" >
                                    {t('homePage.BodyEight.titleFour')}
                                </h3>

                                <div className="icon  facebook   col">
                                    <i className="fa fa-facebook-square" aria-hidden="true" title="Facebook"></i>

                                </div>
                                <div className="icon twitter  col">
                                    <i className="fa fa-twitter" aria-hidden="true" title="Twitter"></i>

                                </div>
                                <div className="icon google col">
                                    <i className="fa fa-google-plus-official" aria-hidden="true" title="Google"></i>

                                </div>
                                <div className="icon youtube col">
                                    <i className="fa fa-youtube-play" aria-hidden="true" title="youtube"></i>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="store  ">

                        <div className="container">
                            <h3 className="title">
                                {t('homePage.BodyEight.titleFive')}
                            </h3>
                            <div className="store-Mobile">
                                <div className="appstore item  ">
                                    <img src="https://www.logo.wine/a/logo/App_Store_(iOS)/App_Store_(iOS)-Badge-Alternative-Logo.wine.svg
                                " alt="" />
                                </div>
                                <div className="google-play item " >
                                    <img src="https://www.logo.wine/a/logo/Google_Play/Google_Play-Logo.wine.svg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-text d-flex">
                <div className="container">
                    <div className="row">
                        <div className="col phone">

                            <span>
                                {t('homePage.BodyEight.titleSix')}
                            </span>
                            <b>077777777777</b>

                        </div>
                        <div className="email col">

                            <span>
                                {t('homePage.BodyEight.titleSeven')}
                            </span>
                            <b>khakha057@gmail.com</b>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}


export default Home