import axios from "../../customizeAxios/axios"


const getProjectWithPagination = (page, limit, createBy) => {
    return axios.get(`/api/v4/getProject?page=${page}&limit=${limit}&createBy=${createBy}`)
}

const fetchProjectByid = (id) => {
    return axios.get(`/api/v4/getProjects/${id}`)
}
const CreateProject = (data) => {
    return axios.post(`/api/v4/add-project-to-user`, { ...data })
}
const getSaleChannel = () => {
    return axios.get("/api/v4/getSaleChannel")
}
const getStastusPayment = () => {
    return axios.get("/api/v4/getStastusPayment")
}
const updateProject = (data) => {
    return axios.put("/api/v4/project/update", { ...data })
}
const deleteProject = (ProductId) => {
    return axios.delete("/api/v4/delete/Project ", { data: { id: ProductId } })
}
const createChatProject = (data) => {
    return axios.post("/api/v4/add-chat-to-Project", { ...data })
}
const updateProjectChat = (data) => {
    return axios.put("/api/v4/project/update/chat", { ...data })
}

const deleteChatProject = (id) => {
    return axios.delete("/api/v4/Project/delete/chat ", { data: { id: id } })
}
const getDataSearch = (text, phone) => {
    return axios.get(`/api/v4/Project/search?text=${text}&phone=${phone}`)
}

const getDataWithTime = (StartDateCalendar, endDateCalendar, phone) => {
    return axios.get(`/api/v4/Project/search/ByTime?StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}&phone=${phone}`)
}


const getProjectStatusPaymentWithPagination = (currentPageOne, currentLimitOne) => {
    return axios.get(`/api/v4/getProject/statusPayment?currentPageOne=${currentPageOne}&currentLimitOne=${currentLimitOne}`)
}

const getProjectWithPaginationStatusPayment = (page, limit, createBy, statuspaymentId) => {
    return axios.get(`/api/v4/getProject/status/payment?page=${page}&limit=${limit}&createBy=${createBy}&statuspaymentId=${statuspaymentId}`)
}
const getProjectWithPaginationStatusDelivery = (page, limit, createBy, statusdeliveryId) => {
    return axios.get(`/api/v4/getProject/status/Delivery?page=${page}&limit=${limit}&createBy=${createBy}&statusdeliveryId=${statusdeliveryId}`)
}
const getNameProduct = () => {
    return axios.get('/api/v4/get/nameProduct')
}

const assignProfectIdAndUserId = (projectId, userId) => {
    return axios.post("/api/v4/assign-to-Project-user", { projectId, userId })
}

const getListWarehouseWithPaginationStatusPayment = (page, limit, createdBy) => {
    return axios.get(`/api/v4/getproduct/warehouse?page=${page}&limit=${limit}&createdBy=${createdBy}`)
}

const createWarehouse = (data) => {
    return axios.post("/api/v4/create/warehouse", { ...data })
}
const updateWarehouse = (data) => {
    return axios.put("/api/v4/update/warehouse", { ...data })
}
const getNumberProductinWarehouse = (id) => {
    return axios.get(`/api/v4/getNumber/warehouse?id=${id}`)
}
const updateNumberProductInWarehouse = (id, number) => {
    return axios.put("api/v4/update/Number/warehouse", { id, number })
}
const getDataSearchInWarehouse = (data) => {
    return axios.get(`/api/v4/Project/search/warehouse?data=${data}`)
}
const getAllNumberSatusProductInWarehouse = (created_By) => {
    return axios.get(`/api/v4/Project/all/status-product?created_By=${created_By}`)
}

const getListWarehouseWithPaginationproductStatusId = (page, limit, created_By, productStatusId) => {
    return axios.get(`/api/v4/getProduct/bystatus_product/warehouse?page=${page}&limit=${limit}&created_By=${created_By}&productStatusId=${productStatusId}`)
}
const getWarehouseForDashboard = (created_By) => {
    return axios.get(`/api/v4/getWarehouseDashboard?created_By=${created_By}`)
}

const getAllNumberMoneyInWarehouse = (created_By) => {
    return axios.get(`/api/v4/getWarehouseDashboardWithMoney?created_By=${created_By}`)
}
const getDataWithTimeInWarehouse = (created_By, StartDateCalendar, endDateCalendar) => {
    return axios.get(`/api/v4/getWarehouseDashboardWithTime?created_By=${created_By}&StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}`)
}
const getDataDashboardProduct = (created_By) => {
    return axios.get(`/api/v4/getDataForProductDashboard?createdBy=${created_By}`)
}
const getDataDashboardProductWithAge = (created_By) => {
    return axios.get(`api/v4/getDataForProductDashboardByAge?createdBy=${created_By}`)
}
const getDataDashboardProductWithTimeInWarehouse = (created_By, StartDateCalendar, endDateCalendar) => {
    return axios.get(`/api/v4/getProductDashboarWithTime?created_By=${created_By}&StartDateCalendar=${StartDateCalendar}&endDateCalendar=${endDateCalendar}`)
}
const getDataDashboardProductWithMounth = (created_By) => {
    return axios.get(`api/v4/getProductDashboarWithMounth?created_By=${created_By}`)
}
const getDataDashboardProductWithUser = (created_By) => {
    return axios.get(`/api/v4/getProductDashboarWithCustomer?created_By=${created_By}`)
}
const getProjectWithPaginationWithEmployer = (page, limit, unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployer?page=${page}&limit=${limit}&unitId=${unitId}`)
}
const getProjectWithPaginationWithEmployerWithFlag = (unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployerWithFlag?unitId=${unitId}`)
}
const updateFlagInProject = (id, unit, flag) => {
    return axios.put("/api/v4/project/Employer/update/status-flag", { id, unit, flag })
}
const getProjectWithPaginationWithEmployerPickUp = (page, limit, unitId, number) => {
    return axios.get(`/api/v4/getProjectWithEmployerPickUp?page=${page}&limit=${limit}&unitId=${unitId}&number=${number}`)
}
const getProjectWithPaginationWithEmployerPickUp_user = (unitId, username, phone) => {
    return axios.get(`/api/v4/getProjectWithEmployerPickUp/nameUser?unitId=${unitId}&username=${username}&phone=${phone}`)
}
const updatePickupInProject = (unitId, id, username, phone, status_pickup_Id, pickup_time, pickupDone_time) => {
    return axios.put("/api/v4/project/Employer/update/name_pickup", { unitId, id, username, phone, status_pickup_Id, pickup_time, pickupDone_time })
}

const getProjectWithPaginationWithEmployerWarhouse = (page, limit, unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployerWarehouse?page=${page}&limit=${limit}&unitId=${unitId}`)
}
const getProjectWithPaginationWithEmployerWarehouse_user = (unitId, username, phone) => {
    return axios.get(`/api/v4/getProjectWithEmployerWarehouse/nameUser?unitId=${unitId}&username=${username}&phone=${phone}`)
}
const updateWarehouseInProject = (id, unitId, StatusProduct, username, phone, status_warehouse_Id, warehouse_time, warehouseDone_time) => {
    return axios.put("/api/v4/project/Employer/update/name_Warehouse", { id, unitId, StatusProduct, username, phone, status_warehouse_Id, warehouse_time, warehouseDone_time })
}
const getProjectWithPaginationWithEmployerDelivery = (page, limit, unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployerDelivery?page=${page}&limit=${limit}&unitId=${unitId}`)
}
const getProjectWithPaginationWithEmployerDelivery_user = (unitId, username, phone) => {
    return axios.get(`/api/v4/getProjectWithEmployerDelivery/nameUser?unitId=${unitId}&username=${username}&phone=${phone}`)
}
const updateDeliveryInProject = (id, unitId, status_delivery, username, phone, text, textOne, Delivery_time, DeliveryDone_time, Sub_money, receiveMoneyId) => {
    return axios.put("/api/v4/project/Employer/update/name_Delivery", { id, unitId, status_delivery, username, phone, text, textOne, Delivery_time, DeliveryDone_time, Sub_money, receiveMoneyId })
}
const getProjectWithPaginationWithALlStatusPickup = (page, limit, unitId, statuspickupId) => {
    return axios.get(`/api/v4/getProjectWithEmployer/All/Status_pickup?page=${page}&limit=${limit}&unitId=${unitId}&statuspickupId=${statuspickupId}`)
}
const getProjectWithPaginationWithALlStatusWarehouse = (page, limit, unitId, statuswarehouseId) => {
    return axios.get(`/api/v4/getProjectWithEmployer/All/Status_warehouse?page=${page}&limit=${limit}&unitId=${unitId}&statuswarehouseId=${statuswarehouseId}`)
}
const getProjectWithPaginationWithALlStatusDelivery = (page, limit, unitId, statusDeliveryId) => {
    return axios.get(`/api/v4/getProjectWithEmployer/All/Status_Delivery?page=${page}&limit=${limit}&unitId=${unitId}&statusDeliveryId=${statusDeliveryId}`)
}
const getAllStatusProductWithEmployer = (unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployer/All/number_all?unitId=${unitId}`)
}

const getDataSearchByEmplyer = (data, positon, unitId) => {
    return axios.get(`/api/v4/Project/search/product/employer?data=${data}&positon=${positon}&unitId=${unitId}`)
}

const getDataSortByPickup = (unitId, statuspickup) => {
    return axios.get(`/api/v4/Project/allStatusInProduct?unitId=${unitId}&statuspickup=${statuspickup}`)
}
const getDataSortByWarehouse = (unitId, statuswarehouse) => {
    return axios.get(`/api/v4/Project/allStatusInProduct?unitId=${unitId}&statuswarehouse=${statuswarehouse}`)
}
const getDataSortByDelivery = (unitId, statusDelivery) => {
    return axios.get(`/api/v4/Project/allStatusInProduct?unitId=${unitId}&statusDelivery=${statusDelivery}`)
}
const getDataSortByOverview = (unitId, receiveMoney) => {
    return axios.get(`/api/v4/Project/allStatusInProduct?unitId=${unitId}&receiveMoney=${receiveMoney}`)
}

const getProjectWithPaginationWithEmployerOverview = (page, limit, unitId) => {
    return axios.get(`/api/v4/getProjectWithEmployerOverview?page=${page}&limit=${limit}&unitId=${unitId}`)
}
const getProjectWithPaginationWithEmployerOverview_user = (unitId, username, phone) => {
    return axios.get(`/api/v4/getProjectWithEmployerOverview/nameUser?unitId=${unitId}&username=${username}&phone=${phone}`)
}
const updateOverviewInProject = (id, unitId, User_Overview, Number_Overview, receiveMoneyId, Overview_time, OverviewDone_time, done_status) => {
    return axios.put("/api/v4/project/Employer/update/name_Overview", { id, unitId, User_Overview, Number_Overview, receiveMoneyId, Overview_time, OverviewDone_time, done_status })
}
const createNotification = (ProjectId, Order, Change_content, ChangeBy, CreatedBy, ViewByuser, ViewByStaff, unit) => {
    return axios.post("/api/v4/add/infomation/notification", { ProjectId, Order, Change_content, ChangeBy, CreatedBy, ViewByuser, ViewByStaff, unit })
}
const getAllNotificaltion = (unitId, user) => {
    return axios.get(`/api/v4/getNotification?unitId=${unitId}&user=${user}`)
}
const UpdateStatusNotification = (data) => {
    return axios.put("/api/v4/change/status/notification", { ...data })
}
const ChangePassWord = (data) => {
    return axios.put("/api/v4/change/PassWord", { ...data })
}
const validateInfomationChangePass = (data) => {
    return axios.put("/api/v4/send/email/forgetPassWord", { ...data })
}
const UpdateNewPassword = (data) => {
    return axios.put("/api/v4/reset/PassWord", { ...data })
}
const checkExist = (data) => {
    return axios.put("/api/v4/check/Living/notification", { ...data })
}
const UpdateImageChat = (data) => {
    return axios.put("/api/v4/update/image/chat", { ...data })
}

const GetChat = (id) => {
    return axios.get(`/api/v4/get/all/chat?id=${id}`)
}
export {
    getProjectWithPagination, fetchProjectByid, CreateProject, getSaleChannel, getStastusPayment,
    updateProject, deleteProject, createChatProject, updateProjectChat, deleteChatProject, getDataSearch,
    getDataWithTime, getProjectStatusPaymentWithPagination, getProjectWithPaginationStatusPayment,
    getProjectWithPaginationStatusDelivery, getNameProduct, getNumberProductinWarehouse, assignProfectIdAndUserId,
    getListWarehouseWithPaginationStatusPayment, createWarehouse, updateWarehouse, updateNumberProductInWarehouse,
    getDataSearchInWarehouse, getAllNumberSatusProductInWarehouse, getListWarehouseWithPaginationproductStatusId,
    getWarehouseForDashboard, getAllNumberMoneyInWarehouse, getDataWithTimeInWarehouse, getDataDashboardProduct,
    getDataDashboardProductWithAge, getDataDashboardProductWithTimeInWarehouse, getDataDashboardProductWithMounth,
    getDataDashboardProductWithUser, getProjectWithPaginationWithEmployer, getProjectWithPaginationWithEmployerWithFlag,
    updateFlagInProject, getProjectWithPaginationWithEmployerPickUp, getProjectWithPaginationWithEmployerPickUp_user,
    updatePickupInProject, getProjectWithPaginationWithEmployerWarhouse, getProjectWithPaginationWithEmployerWarehouse_user,
    updateWarehouseInProject, getProjectWithPaginationWithEmployerDelivery, getProjectWithPaginationWithEmployerDelivery_user,
    updateDeliveryInProject, getProjectWithPaginationWithALlStatusPickup, getProjectWithPaginationWithALlStatusWarehouse,
    getProjectWithPaginationWithALlStatusDelivery, getAllStatusProductWithEmployer, getDataSearchByEmplyer, getDataSortByPickup,
    getDataSortByWarehouse, getDataSortByDelivery, getDataSortByOverview, getProjectWithPaginationWithEmployerOverview,
    getProjectWithPaginationWithEmployerOverview_user, updateOverviewInProject, createNotification, getAllNotificaltion,
    UpdateStatusNotification, ChangePassWord, validateInfomationChangePass, UpdateNewPassword, checkExist, UpdateImageChat, GetChat
}