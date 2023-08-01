import axios from "../../customizeAxios/axios"


const getAllShippingUnit = () => {
    return axios.get('/api/v6/getShippingUnit')
}

const fetchShippingCostByShippingUnit = (ShippingUnitId) => {
    return axios.get(`/api/v6/showshippingCost/by-shippingUnit/${ShippingUnitId}`)
}

const getPriceByAddress = (From, To, shippingUnitId) => {
    return axios.get(`http://localhost:3030/api/v6/getPrice?From=${From}&To=${To}&shippingUnit_Id=${shippingUnitId}`)
}

export {
    getAllShippingUnit, fetchShippingCostByShippingUnit, getPriceByAddress
}