//src/api/index.js

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProfile = () => API.get('/profile');
export const createUser = (newUser) => API.post('/auth/register', newUser);
export const loginUser = (userData) => API.post('/auth/login', userData);
export const createGroup = (groupData) => API.post('/groups', groupData);
export const fetchGroups = () => API.get('/groups');  
