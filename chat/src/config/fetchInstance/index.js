import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080'
});

const fetch = {
  get: instance.get,
  post: instance.post
}

export default fetch;