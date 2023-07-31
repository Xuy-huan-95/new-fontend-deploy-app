import axios from "../../customizeAxios/axios"


const CreateRole = (role) => {
    return axios.post('/api/v3/AddRow', [...role])
}


const getRoleWithPagination = (page, limit) => {
    return axios.get(`/api/v3/ShowAllRoleWithPagination?page=${page}&limit=${limit}`)
}

const getRole = () => {
    return axios.get('/api/v3/showRole')
}
const DeleteRole = (role) => {
    return axios.delete(`/api/v3/DeleteRow`, { data: { id: role.id } })
}

const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v3/role/by-group/${groupId}`)
}

const SaveChangleRole = (data) => {
    return axios.post("/api/v3/role/assign-to-group", { data })
}
const UpdateRole = (id, url, Description) => {
    return axios.put("/api/v3/updateRow", { id, url, Description })
}
export {
    CreateRole, getRoleWithPagination, DeleteRole, getRole,
    fetchRoleByGroup, SaveChangleRole, UpdateRole
}