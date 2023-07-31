import axios from "../../customizeAxios/axios"



const fetchImagebyOrder = (order) => {
    return axios.get(`/api/v6/getImage/ByOrder?order=${order}`)
}
const assignDataToProjectImage = (projectId, ImageId) => {
    return axios.post("/api/v6/ImageAndProjectId/assign-to-Project-Image", { projectId, ImageId })
}
const updateImage = (order, imageUpdate) => {
    return axios.post("/api/v6/update/Image", { order, imageUpdate })
}
const updateImageIdandProjectId = (projectId, image) => {
    return axios.post("/api/v6/update/ImageAndProjectId", { projectId, image })
}
const fetchImagebyUser = (email) => {
    return axios.get(`api/v6/getImage/Byuser?email=${email}`)
}
export {
    fetchImagebyOrder, assignDataToProjectImage, updateImage, updateImageIdandProjectId, fetchImagebyUser
}