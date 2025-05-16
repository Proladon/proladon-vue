import Axios, {
  AxiosError,
  type AxiosResponse,
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
  isAxiosError
} from 'axios'
import { stringify } from 'qs'
import { get } from 'lodash-es'
import envVar from '@/envVar'

const defaultConfig: AxiosRequestConfig = {
  // 請求超時時間
  timeout: 10000,
  // headers: {
  //   Accept: 'application/json, text/plain, */*',
  //   'Content-Type': 'application/json',
  //   'X-Requested-With': 'XMLHttpRequest',
  // },
  // 數組格式參數序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: { serialize: stringify as unknown as CustomParamsSerializer }
}

class AdminApi {
  private axiosInstance: AxiosInstance

  constructor(config: AxiosRequestConfig = defaultConfig) {
    this.axiosInstance = Axios.create(config)
    this.setupInterceptorsRequest()
    this.setupInterceptorsResponse()
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = []

  /** 防止重复刷新`token` */
  private static isRefreshing = false

  private setupInterceptorsRequest(): void {
    this.axiosInstance.interceptors.request.use(async (config) => {
      config.headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`
      return config
    })
  }
  private setupInterceptorsResponse(): void {
    // this.axiosInstance.interceptors.response.use(
    //   (response: AxiosResponse) => {
    //     return response.data
    //   },
    //   (error: AxiosError) => {
    //     return error.response
    //   },
    // )
  }

  public async request<T>(
    config: AxiosRequestConfig
  ): Promise<[T | null, string | null, null | AxiosResponse]> {
    try {
      const response = await this.axiosInstance(config)
      return [response.data, null, null]
    } catch (error: Error | AxiosError<T>) {
      if (isAxiosError(error)) {
        if (!error.response) {
          return [null, get(error, 'message', ''), error]
        }
        const rowErr = get(error.response, 'data')
        const errMsg = get(error.response, 'data.msg')
        return [null, errMsg, rowErr]
      }
      return [null, error.message, error]
    }
  }
}

export const publicApi = new AdminApi({
  ...defaultConfig,
  baseURL: `${envVar('BACKEND_HOST')}/api`
})

export const adminApi = new AdminApi({
  ...defaultConfig,
  baseURL: `${envVar('BACKEND_HOST')}/api-admin`
})
