import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
const token = document.cookie.replace(/(?:(?:^|.*;\s*)mycookie\s*=\s*([^;]*).*$)|^.*$/, '$1')

//註冊
export const signup = async (email, password, nickname) => {
  return api.post('/users/sign_up', {
    email,
    password,
    nickname,
  })
}

//登入
export const login = async (email, password) => {
  return api.post('/users/sign_in', {
    email,
    password,
  })
}

//登出
export const signout = async () => {
  return api.post(
    '/users/sign_out',
    {},
    {
      headers: {
        Authorization: token,
      },
    },
  )
}

//攔截器
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
