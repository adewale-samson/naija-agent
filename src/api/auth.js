import {axiosInstance} from './base';

export const SignupAuth = (data) => {
    return axiosInstance.post('/api/v1/auth/signup', data)
}
export const LoginAuth = (data) => {
    return axiosInstance.post('/api/v1/auth/login', data)
}