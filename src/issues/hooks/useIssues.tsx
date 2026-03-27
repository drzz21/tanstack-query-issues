import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces';

interface Props {
	state: State;
	selectedLabels: string[];
}

//se crea hook para consultar issues
//aqui se crea la query que se exporta para usar en los otros componentes
export const useIssues = ({ state, selectedLabels }: Props) => {
	// console.log(state);
	const issuesQuery = useQuery({
		//dado que en nuestro querykey para hacerlo mas
		//especifico no nos importa el ordne
		//de los parametros, podemos usar un objeto
		//en el key, esto ayuda a en el caso de que tengamos filtros complejos
		//y combinables dentro de nuestro query
		//agregamos nuestros labels como parte del querykey para el filtrado
		//y tambien los pasamos a la funcion de get issues para que
		//se consulten
		queryKey: ['issues', { state, selectedLabels }],
		queryFn: () => getIssues(state, selectedLabels),
		staleTime: 1000 * 60, //1 minuto de stale time
	});

	return {
		issuesQuery,
	};
};
