//creamos la configuración de axios con la url base para las peticiones
import axios from 'axios';

// console.log(import.meta.env.VITE_GITHUB_TOKEN);

export const githubApi = axios.create({
	baseURL: 'https://api.github.com/repos/facebook/react',
	headers: {
		//TODO Api key de Github
    //Configuramos variable de api de Github en el archivo .env.local 
    // y la importamos aquí para usarla en las peticiones
		Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
	},
});
