import axios from 'axios'

export const baseUrl = 'http://192.168.50.32:8848'

// axios实例以及拦截器配置

const axiosInstance = axios.create({
  baseURL: baseUrl,
  // 登录使用
  // withCredentials: true
})

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log('err:网络错误！', err);
  }
)

// 顶部栏高度
const HEADER_HEIGHT = 45

// 播放器播放模式
const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

// 播放倍速
const musicSpeedList = [
  {
    key: 0.75,
    name: "x0.75"
  },
  {
    key: 1,
    name: "x1"
  },
  {
    key: 1.25,
    name: "x1.25"
  },
  {
    key: 1.5,
    name: "x1.5"
  },
  {
    key: 2,
    name: "x2"
  }
]

export { axiosInstance, HEADER_HEIGHT, playMode, musicSpeedList }