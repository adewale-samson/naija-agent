import { axiosFormDataInstance } from './base'

export const handleAgentForm = (data, token) => {
    return axiosFormDataInstance.put('/api/v1/user/update', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}