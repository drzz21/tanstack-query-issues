import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubIssue, State } from '../interfaces';

//Se agrega get issues action, funciona practicamente igual que get-labels.action
//en este caso para consultar issues
//ahora recibimos tambien las labels seleccionadas para el filtrado
//de incidencias de github
export const getIssues = async (
	state: State,
	selectedLabels: string[],
	//vamos a recibir tambien la pagina de los 
	//issues a mostrar, por lo que lo agregamos a los params
	page: number
): Promise<GithubIssue[]> => {
	await sleep(1500);

	//recibimos el state para el filtrado
	//y creamos unos nuevos params
	const params = new URLSearchParams();

	//en caso de que nuestro state sea diferente a all
	//modificamos los params para agregar el state, esto es porque en la api de github
	//para traer todos no hace falta mandar un param
	if (state !== State.All) params.append('state', state);

	//agregamos los labels seleccionados como params
	//en caso de que existan
	if (selectedLabels.length > 0) {
		//de esta forma espera la api de github que lleguen lso labels
		params.append('labels', selectedLabels.join(','));
	}

	//asignamos el valor de la pagina al del param que recibimos
	params.append('page', page.toString());

	//parametro para agregar paginacion de acuerdo a la documentacion
	//de github, filtrando el numero de elementos por pagina
	params.append('per_page', '5'); //limitar a 5 issues por pagina

	const { data } = await githubApi.get<GithubIssue[]>('/issues', {
		//mandamos el param
		params,
	});

	return data;
};
