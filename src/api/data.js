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
    console.table(token, location)
    return axiosInstance.get(`/api/v1/user/location/${location}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const postComment = (data) => {
    console.log(location)
    console.log(token)
    return axiosInstance.get(`/api/v1/comment`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}
export const getComments = (token) => {
    return axiosInstance.get(`/api/v1/comment/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}