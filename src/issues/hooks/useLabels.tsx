import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../actions';
// import { GithubLabel } from '../interfaces';

//cremos el hook que contendrá el query fn que usaremos para consultar los labels
export const useLabels = () => {
	//creamos la query y le pasamos la funcion para que se consulte
	const labelsQuery = useQuery({
		queryKey: ['labels'],
		queryFn: getLabels,
		staleTime: 1000 * 60 * 60, //1 hora de stale time
		//con placeholder data asignamos los valores iniciales del query, 
		// esto es útil para evitar el estado de loading y mostrar algo mientras se carga la data real, 
		// en este caso mostramos dos labels de ejemplo
		// placeholderData: [
		// 	{
		// 		id: 1,
		// 		node_id: 'MDU6TGFiZWwx',
		// 		url: 'https://api.github.com/repos/facebook/react/labels/bug',
		// 		name: 'bug',
		// 		color: 'd73a4a',
		// 		default: false,
		// 		description: "Something isn't working",
		// 	} satisfies GithubLabel,
		// 	//con satisfies nos aseguramos de cumplir la estructura de la interfaz GithubLabel,
		// 	//  esto nos ayuda a evitar errores de tipo y a tener autocompletado en el editor
		// 	{
		// 		id: 791921801,
		// 		node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
		// 		url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
		// 		name: '❤️',
		// 		color: 'ffffff',
		// 		default: false,
		// 		'description': '123',
		// 	} satisfies GithubLabel,
		// ],
		//initial data funciona un tanto diferente
		//ya que este este es el valor que se asigna por primera vez y permanecerá
		// hasta que se actualice con la data real, mientras que el placeholderData se muestra solo mientras se carga la data real,
		// initialData: [
		// 	{
		// 		id: 1,
		// 		node_id: 'MDU6TGFiZWwx',
		// 		url: 'https://api.github.com/repos/facebook/react/labels/bug',
		// 		name: 'bug',
		// 		color: 'd73a4a',
		// 		default: false,
		// 		description: "Something isn't working",
		// 	} satisfies GithubLabel,
		// 	{
		// 		id: 791921801,
		// 		node_id: 'MDU6TGFiZWw3OTE5MjE4MDE=',
		// 		url: 'https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F',
		// 		name: '❤️',
		// 		color: 'ffffff',
		// 		default: false,
		// 		'description': '123',
		// 	} satisfies GithubLabel,
		// ],
	});

	return {
		labelsQuery,
	};
};
