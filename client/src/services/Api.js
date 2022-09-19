import axios from 'axios'

const Api = () => {
  const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}/api/v1/`
  })

  const token = localStorage.getItem('token')
  console.log(token);
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.reload()
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export default Api();
