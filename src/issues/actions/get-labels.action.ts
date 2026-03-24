//creamos la funcion que consultará la informacion del api
//usando fetch, agregamos un sleep para detener la ejecucion de la funcion
//por segundo y medio para probar el caché

import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubLabel } from '../interfaces';

//esta funcion la extrajimos del componente a su propio archivo para poder utilizarla en otros componentes y no tener que repetir el codigo

export const getLabels = async (): Promise<GithubLabel[]> => {
	await sleep(1500);

	// cambiamos fetch por axios usando la instancia que ya teniamos
	const { data } = await githubApi.get<GithubLabel[]>('/labels');

	// const resp = await fetch(
	// 	'https://api.github.com/repos/facebook/react/labels',
	// ).then((r) => r.json());

	// console.log(resp);
	console.log(data);

	return data;
};
