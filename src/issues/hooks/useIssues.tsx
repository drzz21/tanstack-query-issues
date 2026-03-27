import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces';

interface Props {
	state: State;
}

//se crea hook para consultar issues
//aqui se crea la query que se exporta para usar en los otros componentes
export const useIssues = ({ state }: Props) => {
	// console.log(state);
	const issuesQuery = useQuery({
		//dado que en nuestro querykey para hacerlo mas
		//especifico no nos importa el ordne
		//de los parametros, podemos usar un objeto
		//en el key, esto ayuda a en el caso de que tengamos filtros complejos
		//y combinables dentro de nuestro query
		queryKey: ['issues', { state }],
		queryFn: () => getIssues(state),
		staleTime: 1000 * 60, //1 minuto de stale time
	});

	return {
		issuesQuery,
	};
};
