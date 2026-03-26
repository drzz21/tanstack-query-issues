import { useQuery } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';

export const useIssue = (issueNumber: number) => {
	const issueQuery = useQuery({
		queryKey: ['issue', issueNumber],
		queryFn: () => getIssue(issueNumber),
		staleTime: 1000 * 60, //1 minuto de stale time
	});

	// const commentsQuery = useQuery({
	// 	queryKey: ['issue', issueNumber,'comments'],
	// 	queryFn: () => getIssueComments(issueNumber),
	// 	staleTime: 1000 * 60, //1 minuto de stale time
	// });

	//de esta forma usando el enabled hacemos la peticion dependiente de la anterior
	//tenemos que esperar a que se resuelva la primer query y la otra se ejecutará en cadena
	//para ejecutar ambas en paralelo se usa el query comentado, sin el enabled

	const commentsQuery = useQuery({
		queryKey: ['issue', issueQuery.data?.number, 'comments'],
		queryFn: () => getIssueComments(issueQuery.data!.number),
		staleTime: 1000 * 60, //1 minuto de stale time
		enabled: issueQuery.data !== undefined, // Habilitar solo si el issue ha sido cargado
	});

	return {
		issueQuery,
		commentsQuery,
	};
};
