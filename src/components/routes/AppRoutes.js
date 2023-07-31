
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from "../Login/login"
import Register from "../Register/Register"
import Home from '../home/home';
import PrivateRoutes from "./PrivateRouter";
import Users from "../ListUser/listUser"
import Products from "../products/products"
import Role from "../Role/Role"
import GroupRole from "../GroupRole/groupRole"
import { ProSidebarProvider } from 'react-pro-sidebar';
import NavHeader from '../navigation/nav';
import DetailProduct from "../products/detailProduct"
import NotFound from "./NotFound"
import ProductsWithStatuspayment from "../products/ProductsWithStatuspayment"
import ProductsWithStatusdeliveryNull from "../products/ProductsWithStatusdeliveryNull"
import ProductsWithStatusdeliveryOne from "../products/ProductsWithStatusdeliveryOne"
import ProductsWithStatusdeliveryTwo from "../products/ProductsWithStatusdeliveryTwo"
import Manageproducts from "../products staff/manageproducts"
import UserGroupCustomer from "../ListUser/listUserGroup4"
import UserGroupBoss from "../ListUser/listUserGroup1"
import UserGroupDev from "../ListUser/listUserGroup2"
import UserGroupStaff from "../ListUser/listUserGroup3"
import Warehouse from "../warehouse/warehouse"
import Warehouse_status_productId4 from "../warehouse/warehouse_status_productId4"
import Warehouse_status_productId3 from "../warehouse/warehouse_status_productId3"
import Warehouse_status_productId2 from "../warehouse/warehouse_status_productId2"
import Warehouse_status_productId1 from "../warehouse/warehouse_status_productId1"
import DashboardWarehouse from "../warehouse/dashboardWarehouse"
import DashboardProduct from "../products/dashboardProduct"
import Pickup from "../products staff/PickUp"
import Warehouse_staff from "../products staff/Warehouse_staff"
import Delivery_staff from "../products staff/Delivery_staff"
import Overview from "../products staff/overview"
import ManageproductsNoPickup from "../products staff/manageproducts-no_pickup"
import ManageproductsPicking from "../products staff/manageproducts-pickingup"
import ManageproductsPickOk from "../products staff/manageproducts-picking-ok"
import ManageproductsNoWarehouse from "../products staff/manageproducts-no-warehouse"
import ManageproductsStatusOne from '../products staff/manageproducts-status-one-warehouse '
import ManageproductsStatustwo from "../products staff/manageproducts-status-two-warehouse  "
import ManageproductsNoDelivery from "../products staff/manageproducts-no-delivery"
import ManageproductsDeliveryStatusOne from "../products staff/manageproducts-status-one-delivery"
import ManageproductsDeliveryStatusTwo from "../products staff/manageproducts-status-two-delivery"
import ManageproductsDeliveryStatusThree from "../products staff/manageproducts-status-three-delivery"
import PickUpNoStatus from "../products staff/PickUpNoStatus"
import PickUpStatusOne from "../products staff/PickUpStatusOne"
import PickUpStatusTwo from "../products staff/PickUpStatusTwo"
import WarehouseNoStatus from "../products staff/WarehouseNostatus"
import WarehouseStatusOne from "../products staff/WarehouseStatusOne"
import WarehouseStatusTwo from "../products staff/WarehouseStatusTwo"
import DeliveryNostatus from "../products staff/DeliveryNostatus"
import DeliveryStatusOne from "../products staff/DeliveryStatusOne"
import DeliveryStatusTwo from "../products staff/DeliveryStatusTwo"
import DeliveryStatusFour from "../products staff/DeliveryStatusFour"
import DeliveryStatusThree from "../products staff/DeliveryStatusThree"
import OverviewNoStatus from "../products staff/overviewStatusNo"
import OverviewStatusOne from "../products staff/overviewStatusOne"
import OverviewStatusTwo from "../products staff/overviewStatusTwo"
import OverviewStatusThree from "../products staff/overviewStatusThree"
import { Suspense } from 'react';
import Profile from "../../Profile/Profile"
import CreateNewProduct from "../products/modalCreatedProduct"

const AppRoutes = (props) => {

    return (
        <Suspense fallback={<div>Loading... </div>}>

            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>

                <PrivateRoutes path="/CreateNewOrder" component={CreateNewProduct}
                />
                <PrivateRoutes path="/Profile" component={Profile}
                />
                <PrivateRoutes path="/listuser" component={Users}
                />
                <PrivateRoutes path="/listuserbygroupCustomer" component={UserGroupCustomer}
                />
                <PrivateRoutes path="/listuserbygroupBoss" component={UserGroupBoss}
                />
                <PrivateRoutes path="/listuserbygroupDev" component={UserGroupDev}
                />
                <PrivateRoutes path="/listuserbygroupStaff" component={UserGroupStaff}
                />

                <PrivateRoutes path="/Overview_status-three" component={OverviewStatusThree}
                />
                <PrivateRoutes path="/Overview_status-two" component={OverviewStatusTwo}
                />
                <PrivateRoutes path="/Overview_status-one" component={OverviewStatusOne}
                />
                <PrivateRoutes path="/Overview_no_status" component={OverviewNoStatus}
                />
                <PrivateRoutes path="/Delivery_status_three" component={DeliveryStatusThree}
                />
                <PrivateRoutes path="/Delivery_status_four" component={DeliveryStatusFour}
                />
                <PrivateRoutes path="/Delivery_status_two" component={DeliveryStatusTwo}
                />
                <PrivateRoutes path="/Delivery_status_one" component={DeliveryStatusOne}
                />
                <PrivateRoutes path="/Delivery_no_status" component={DeliveryNostatus}
                />
                <PrivateRoutes path="/Warehouse_status_two" component={WarehouseStatusTwo}
                />
                <PrivateRoutes path="/Warehouse_status_one" component={WarehouseStatusOne}
                />
                <PrivateRoutes path="/Warehouse_no_status" component={WarehouseNoStatus}
                />
                <PrivateRoutes path="/Pick_up_status_two" component={PickUpStatusTwo}
                />
                <PrivateRoutes path="/Pick_up_status_one" component={PickUpStatusOne}
                />
                <PrivateRoutes path="/Pick_up_no_status" component={PickUpNoStatus}
                />

                <PrivateRoutes path="/Manageproducts_delivery_Three" component={ManageproductsDeliveryStatusThree}
                />
                <PrivateRoutes path="/Manageproducts_delivery_Two" component={ManageproductsDeliveryStatusTwo}
                />
                <PrivateRoutes path="/Manageproducts_delivery_One" component={ManageproductsDeliveryStatusOne}
                />
                <PrivateRoutes path="/Manageproducts_No_delivery" component={ManageproductsNoDelivery}
                />
                <PrivateRoutes path="/Manageproducts_Warehouse_status_two" component={ManageproductsStatustwo}
                />
                <PrivateRoutes path="/Manageproducts_Warehouse_status_one" component={ManageproductsStatusOne}
                />
                <PrivateRoutes path="/Manageproducts_No_Warehouse" component={ManageproductsNoWarehouse}
                />
                <PrivateRoutes path="/Manageproducts_No_Pickup" component={ManageproductsNoPickup}
                />
                <PrivateRoutes path="/Manageproducts_pick_ok" component={ManageproductsPickOk}
                />
                <PrivateRoutes path="/Manageproducts_Picking" component={ManageproductsPicking}
                />
                <PrivateRoutes path="/Overview" component={Overview}
                />
                <PrivateRoutes path="/Delivery_staff" component={Delivery_staff}
                />
                <PrivateRoutes path="/Warehouse_staff" component={Warehouse_staff}
                />
                <PrivateRoutes path="/Pickup_staff" component={Pickup}
                />
                <PrivateRoutes path="/Products" component={Products}
                />
                <PrivateRoutes path="/dashboard_Warehouse" component={DashboardWarehouse}
                />
                <PrivateRoutes path="/dashboard_Product" component={DashboardProduct}
                />
                <PrivateRoutes path="/Warehouse" component={Warehouse}
                />
                <PrivateRoutes path="/Warehouse_status_productId4" component={Warehouse_status_productId4}
                />
                <PrivateRoutes path="/Warehouse_status_productId3" component={Warehouse_status_productId3}
                />
                <PrivateRoutes path="/Warehouse_status_productId2" component={Warehouse_status_productId2}
                />
                <PrivateRoutes path="/Warehouse_status_productId1" component={Warehouse_status_productId1}
                />
                <PrivateRoutes path="/ProductsWithStatuspayment" component={ProductsWithStatuspayment}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryNull" component={ProductsWithStatusdeliveryNull}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryOne" component={ProductsWithStatusdeliveryOne}
                />
                <PrivateRoutes path="/ProductsWithStatusdeliveryTwo" component={ProductsWithStatusdeliveryTwo}
                />
                <PrivateRoutes path="/order-processing" component={Manageproducts}
                />

                <PrivateRoutes path="/role" component={Role}
                />
                <PrivateRoutes path="/grouprole" component={GroupRole}
                />
                <PrivateRoutes path="/detailProduct/:id" component={DetailProduct}
                />
                <Route path="*" component={NotFound} />
            </Switch>

        </Suspense>
    )
}

export default AppRoutes