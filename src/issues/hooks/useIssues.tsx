import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';

//se crea hook para consultar issues
//aqui se crea la query que se exporta para usar en los otros componentes
export const useIssues = () => {
	const issuesQuery = useQuery({
		queryKey: ['issues'],
		queryFn: getIssues,
		staleTime: 1000 * 60, //1 minuto de stale time
	});

	return {
		issuesQuery,
	};
};
