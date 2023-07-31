import axios from "../../customizeAxios/axios"


const registerNewUser = (email, password, Phone, username, Province, District, Ward, DetailAddress, Sex) => {
    return axios.post('/api/v1/register', {
        email, password, Phone, username, Province, District, Ward, DetailAddress, Sex
    })
}


const LoginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}

const showList = (page, limit) => {
    return axios.get(`/api/v2/user/show?page=${page}&limit=${limit}`)
}

const DeleteUser = (user) => {
    return axios.delete(`/api/v2/user/delete`, { data: { id: user.id } })
}

const GetGroup = () => {
    return axios.get(`/api/v2/group/show`)
}

const CreateNewUser = (userdata) => {
    return axios.post('/api/v2/user/create', { ...userdata })
}
const UpdateUser = (userdata) => {
    return axios.put('/api/v2/user/update', { ...userdata })
}

const GetUserAccount = () => {
    return axios.get('/api/v1/account')
}
const LogOutUser = () => {
    return axios.post('/api/v1/logout')
}
const getDataUserSearch = (data) => {
    return axios.get(`/api/v2/user/search?data=${data}`)
}
const showListbyGroup = (page, limit, GroupId) => {
    return axios.get(`/api/v2/user/show/search/byGroup?page=${page}&limit=${limit}&GroupId=${GroupId}`)
}

const FindUserWithphone = (phone) => {
    return axios.get(`/api/v2/user/findwithphone?phone=${phone}`)
}
const GetProfile = (phone) => {
    return axios.get(`/api/v2/user/profile?phone=${phone}`)
}

export {
    registerNewUser, LoginUser, showList,
    DeleteUser, GetGroup, CreateNewUser,
    UpdateUser, GetUserAccount, LogOutUser,
    getDataUserSearch, showListbyGroup, FindUserWithphone,
    GetProfile
}