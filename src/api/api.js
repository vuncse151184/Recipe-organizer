import axios from 'axios'

// const [cookies, setCookie, removeCookie] = useCookies(['user'])
const url = 'https://recipe-organizer-api.azurewebsites.net'
const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'))
        const accessToken = user?.token
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance
