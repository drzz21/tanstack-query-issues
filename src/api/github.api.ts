//creamos la configuración de axios con la url base para las peticiones
import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers:{
	//TODO Api key de Github
  }
});