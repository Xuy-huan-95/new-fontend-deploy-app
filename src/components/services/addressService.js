import axios from "../../customizeAxios/axios"


const getAllProvinceCustomer = () => {
    return axios.get('/api/v5/showAllProvinceCutomer')
}

const getAllProvince = () => {
    return axios.get('/api/v5/showAllProvince')
}
const getAddress_from = () => {
    return axios.get('/api/v5/getAddress_from')
}
const getAddress_to = () => {
    return axios.get('/api/v5/getAddress_to')
}
const fetchDistrictCustomerByProvinceCustomer = (id) => {
    return axios.get(`/api/v5/showDistrictCutomer/by-ProvinceCutomer/${id}`)
}
const fetchDistrictByProvince = (id) => {
    return axios.get(`/api/v5/showDistrict/by-Province/${id}`)
}
const fetchWarCustomerdByDistrictCustomer = (id) => {
    return axios.get(`/api/v5/showWardCutomer/by-DistrictCutomer/${id}`)
}
const fetchWardByDistrict = (id) => {
    return axios.get(`/api/v5/showWard/by-District/${id}`)
}


export {
    getAllProvinceCustomer,
    getAllProvince, fetchDistrictCustomerByProvinceCustomer, fetchDistrictByProvince,
    fetchWarCustomerdByDistrictCustomer, fetchWardByDistrict, getAddress_from, getAddress_to
}