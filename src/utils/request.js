import axios from 'axios';
// 后端服务的ip和端口。3030在后端项目中写死，可以到后端项目中修改
const BASE_URL = 'http://localhost:3030';
const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
