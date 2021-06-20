import axios from 'axios';

export default axios.create({
  baseURL: 'https://git.heroku.com/aqueous-gorge-08199.git',
  //baseURL: 'http://localhost:3001',
});
