import axios from "axios";
import request from "@/utils/request";

axios.defaults.baseURL = '/api'

export interface ILogin {
    accountNumber: string;
    password: string;
    captchaId: string;
    captchaCode: string;
    publicKey: string;
}

export interface ICaptcha {
    id: string;
    imageBase64: string;
}

export interface IToken {
    token: string;
    expire: number;
    refreshToken: string;
    refreshExpire: number;
}
export const loginServices = {
    login: async (formData: ILogin) => {
        return await request.post<IToken>('/auth/login', formData)
    },
    getCaptcha: async () => {
        return await request.get<ICaptcha>('/auth/captcha')
    },
    getPublicKey: async () => {
        return await request.get<string>('/auth/publicKey')
    },
    refreshToken: async (refreshToken: string) => {
        return await request.post<{ token: string, refreshToken: string}>('/auth/refreshToken', {refreshToken})
    },
    logout: async () => {
        return await request.get<boolean>('/auth/logout')
    }
}
