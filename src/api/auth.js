import {axiosInstance} from './base';

export const SignupAuth = (data) => {
    return axiosInstance.post('/api/v1/auth/signup', data)
}
export const LoginAuth = (data) => {
    return axiosInstance.post('/api/v1/auth/login', data)
}
export const forgotPassword = (data) => {
    return axiosInstance.post('/api/v1/auth/forgot-password', data)
}
export const resetPassword = (data) => {
    return axiosInstance.post('/api/v1/auth/reset-password', data)
}
export const verifyEmail = (token) => {
    return axiosInstance.post(`/api/v1/auth/verify?token=${token}`)
}