import axios from 'axios'
import axiosRetry from 'axios-retry'
import { showToast } from '@/utils/common'
import { getToken } from '@/utils/api'
const service = axios.create({})

axiosRetry(service, {
  retries: 3,
  retryCondition: (e) => {
    return e.response.status >= 400
  },
  retryDelay: () => {
    return 500
  }
})

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token')
  return {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

service.interceptors.request.use(
  (config) => {
    const params = config.params ?? config.data
    config.headers = getAuthorizationHeader()
    Object.keys(params).map((vo) => {
      if (!params[vo]) delete params[vo]
    })
    return config
  },
  (error) => {
    return error
  }
)

service.interceptors.response.use(
  (response) => {
    console.log('response--interceptors', response)
    if (response.status) {
      return response.data
    }
    return response
  },
  async (error) => {
    const status = error?.response?.status
    showToast(`error--${status}`, 'error')
    console.log('status', typeof status)
    if (status === 403 || status === 429 || status === 401) {
      const res = await getToken()
      console.log('res', res)
      if (res.access_token) {
        localStorage.setItem('token', res.access_token)
      }
    }
    return Promise.reject(error)
  }
)

export default service
