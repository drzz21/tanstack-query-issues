import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces';
import { useEffect, useState } from 'react';

interface Props {
	state: State;
	selectedLabels: string[];
}

//se crea hook para consultar issues
//aqui se crea la query que se exporta para usar en los otros componentes
export const useIssues = ({ state, selectedLabels }: Props) => {
	//creamos una nueva variable para contener el valor de la pagina
	const [page, setPage] = useState(1);

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
		//envaimos la pagina tambien a nuestra funcion y la 
		//agregamos en nuestro query
		queryKey: ['issues', { state, selectedLabels, page }],
		queryFn: () => getIssues(state, selectedLabels, page),
		staleTime: 1000 * 60, //1 minuto de stale time
	});

	//si cambia el valor de nuestro state
	//o selected label, asignamos la pagina en 1
	//ya que si no lo hacemos podriamos enviar una pagina que no existe
	//con los parametros de consulta actuales
	//vamos a manejar los useeffects de forma separada de momento
	useEffect(() => {		
		setPage(1);
	}, [state]);

	useEffect(() => {		
		setPage(1);
	}, [selectedLabels]);

	//creamos las funciones con las que haremos la navegacion de paginas

	const nextPage = () => {
		//si el resultado de la consulta es un array vacio, no hacemos nada
		//porque no se puede cambiar de pagina
		if(issuesQuery.data?.length === 0) {
			return;
		}

		//en caso de que si haya resultados, asignamos la pagina siguiente
		setPage((prevPage) => prevPage + 1);
	};
	const prevPage = () => {
		//si la pagina es 1, no hacemos nada porque no se puede ir a una pagina anterior
		if (page === 1) {
			return;
		}
		//en caso de que la pagina sea mayor a 1, asignamos la pagina anterior
		//disminuyendo el valor de la pagina actual en 1
		setPage((prevPage) => prevPage - 1);
	};

	return {
		issuesQuery,
		nextPage,
		prevPage,
		page,
	};
};
