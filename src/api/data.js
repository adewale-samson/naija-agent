import { axiosFormDataInstance } from './base'
import {axiosInstance} from './base';

export const handleAgentForm = (data, token) => {
    return axiosFormDataInstance.put('/api/v1/user/update', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const getLocationData = (location, token) => {
    return axiosInstance.get(`/api/v1/user/location/${location}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    })
}
export const searchLocationData = (location) => {
    return axiosInstance.get(`/api/v1/user/location/${location}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    })
}
export const getAgentById = (id) => {
    return axiosInstance.get(`/api/v1/user/${id}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    })
}
export const postComment = (data, id) => {
    console.log(data)
    console.log(id)
    return axiosInstance.post(`/api/v1/comment/${id}`, data)
}
export const getComments = (id) => {
    return axiosInstance.get(`/api/v1/comment/getAll/${id}`)
}