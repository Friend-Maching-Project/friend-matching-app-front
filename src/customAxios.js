import axios from 'axios';

export const customAxios = axios.create({ baseURL: 'https://freind-matching-app.herokuapp.com/' });
