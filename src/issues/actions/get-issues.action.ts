import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubIssue, State } from '../interfaces';

//Se agrega get issues action, funciona practicamente igual que get-labels.action
//en este caso para consultar issues
export const getIssues = async (state:State):Promise<GithubIssue[]> => {
	await sleep(1500);

	//recibimos el state para el filtrado
	//y creamos unos nuevos params
	const params = new URLSearchParams();

	//en caso de que nuestro state sea diferente a all
	//modificamos los params para agregar el state, esto es porque en la api de github
	//para traer todos no hace falta mandar un param
	if(state !== State.All) params.append('state', state);

	const { data } = await githubApi.get<GithubIssue[]>('/issues',{
		//mandamos el param
		params
	});

	return data;
};
