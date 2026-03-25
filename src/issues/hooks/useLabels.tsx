import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../actions';

//cremos el hook que contendrá el query fn que usaremos para consultar los labels
export const useLabels = () => {
	//creamos la query y le pasamos la funcion para que se consulte
	const labelsQuery = useQuery({
		queryKey: ['labels'],
		queryFn: getLabels,
		staleTime: 1000 * 60 * 60, //1 hora de stale time
	});

	return {
		labelsQuery,
	};
};
