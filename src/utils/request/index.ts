import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig
} from "axios";
import {useGlobalStore} from "@/stores/globalStore.ts";
import {message} from "@/components/Message";
import {loginServices} from "@/pages/login/service.ts";
import {router} from "@/router";

export type Response<T> = Promise<{ data: T, response: AxiosResponse<T>, error?: boolean }>;
const refreshTokenUrl =  '/auth/refreshToken'
class Request {
    private axiosInstance: AxiosInstance;
    private refreshTokenFlag = false;
    private requestQueue: { resolve: any, config: any, type: 'request' | 'response' }[] = [];

    constructor(config?: CreateAxiosDefaults) {
        this.axiosInstance = axios.create(config);

        this.axiosInstance.interceptors.request.use(this.requestinterceptor.bind(this))
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse<any, any>) => this.responseinterceptor(response),
            (error: any) => this.responseErrorinterceptor(error)
        );
    }

    // 请求拦截器
    private requestinterceptor(axiosConfig: InternalAxiosRequestConfig): Promise<any> {

        if ([refreshTokenUrl].includes(axiosConfig.url || '')) {
            return Promise.resolve(axiosConfig)
        }
        if (this.refreshTokenFlag) {
            return new Promise(resolve => {
                this.requestQueue.push({
                    resolve,
                    config: axiosConfig,
                    type: 'request'
                })
            })

        }
        const {token} = useGlobalStore.getState();
        if (token) {
            axiosConfig.headers.Authorization = `Bearer ${token}`;
        }
        return Promise.resolve(axiosConfig)
    }

    // 响应拦截器
    private responseinterceptor(response: AxiosResponse<any, any>): Promise<any> {
        return Promise.resolve({
            data: response.data,
            error: false,
            response
        })
    }

    // 相应错误拦截器
    private responseErrorinterceptor(error: any) {
        const {status, config} = error?.response || {};
        if (status === 401) {
            // 登录过期，将接口放入请求队列中
            return new Promise(resolve => {
                this.requestQueue.push({
                    resolve,
                    config,
                    type: 'response'
                })

                // 如果没有在刷新token，就去刷新
                console.log(this.refreshTokenFlag)
                if (!this.refreshTokenFlag) {
                    this.refreshToken()
                }
            })

        } else {
            message.error(error?.response?.data?.message);
        }

        return Promise.resolve({
            error: true,
            data: error?.response?.data,
        })
    }

    request<T, D = any>(config: AxiosRequestConfig<D>): Response<T> {
        return this.axiosInstance(config)
    }

    get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
        return this.axiosInstance.get(url, config)
    }

    post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
        return this.axiosInstance.post(url, data, config)
    }

    put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
        return this.axiosInstance.put(url, data, config)
    }

    delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
        return this.axiosInstance.delete(url, config)
    }

    private async refreshToken() {
        console.log(this.requestQueue)

        // 开始刷新，将刷新状态设置为true
        this.refreshTokenFlag = true;
        const {refreshToken, setRefreshToken, setToken} = useGlobalStore.getState();
        if (!refreshToken) {
            this.toLoginPage()
        }
        const {data, error} = await loginServices.refreshToken(refreshToken)
        if (error) {
            return this.toLoginPage()
        }

        // 设置新的token
        setToken(data.token)
        setRefreshToken(data.refreshToken)
        this.refreshTokenFlag = false

        if (!this.requestQueue.length) {
            return
        }
        // 重新请求队列中的接口, 并清空队列
        Array.from({length: this.requestQueue.length}).forEach(async () => {
            const request = this.requestQueue.shift();
            if (request) {
                const {resolve, config, type} = request
                // 如果是响应拦截器中的请求，就重新请求
                if (type === 'response') {
                    resolve(await this.request(config))
                } else if (type === 'request') {
                    resolve(config)
                }
            }
        })
    }

    private toLoginPage() {
        router.navigate('/login')
    }
}

const request = new Request({timeout: 10000, baseURL: '/api'});
export default request;
