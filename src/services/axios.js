import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-escola-node.herokuapp.com',
});
