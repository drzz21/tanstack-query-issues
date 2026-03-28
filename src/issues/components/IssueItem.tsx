import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issue.interface';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue, getIssueComments } from '../actions';
import { timeSince } from '../../helpers';

interface Props {
	issue: GithubIssue;
}

//agregamos la prop para recibir el issue, y cambiamos
// el codigo para mostrar la informacion de ese issue
export const IssueItem = ({ issue }: Props) => {
	const navigate = useNavigate();

	//importamos el query client para hacer el prefetch
	const queryClient = useQueryClient();

	//creamos nuestra funcion prefetch, esta funcion sirve para
	//consultar la informacion antes de tiempo, para que
	//cuando se vaya a utilizar ya la tengamos lista
	//en este caso consultamos la informacion de los issues
	//y los comentarios de los issues, definiendo las mismas querys
	//que usamos donde las declaramos, y la misma funcion para consultar la
	//informacion
	//poonemos un stale time de un minuto para no disparar solcitudes
	//de forma tan constante

	const prefetchData = () => {
		queryClient.prefetchQuery({
			queryKey: ['issue', issue.number],
			queryFn: () => getIssue(issue.number),
			staleTime: 1000 * 60,
		});
		queryClient.prefetchQuery({
			queryKey: ['issue', issue.number, 'comments'],
			queryFn: () => getIssueComments(issue.number),
			staleTime: 1000 * 60,
		});
	};

	//creamos una nueva funcion, en este caso usaremos la funcion presetData
	//con ella podemos manualmente, asignar informacion a nuestra query sin hacer consulta
	//esto lo hacemos cuando de alguna forma podemos obtener la informacion
	//en este caso se obtiene porque la consulta para obtener el listado de issues,
	//nos da la informacion de todos los issues y podemos usarla para
	//asignar la ifnormacion de cada issue de forma individual
	//este query lo llamamos igual en el mouseEnter
	const presetData = () => {
		//funciona de la siguiente forma, le mandamos la query que queremos usar
		//y la informacion que queremos que tenga, en este caso el issue que recibimos en este item
		//con el updatedat le decimos que esta informacion se actualizó hace un minuto, esto es para que no se consulte inmediatamente
		queryClient.setQueryData(['issue', issue.number], issue, {
			updatedAt: Date.now() + 1000 * 60,
		});
	};

	return (
		// agregamos la clase que creamos
		//ponemos el llamado al prefetch cada que el mouse
		// entre al div del issue, de esta forma al hacer el hover
		//se consultará la informacion y se guardará en caché sin
		//necesidad de que el usuario entre a la pagina
		<div
			// onMouseEnter={prefetchData}
			onMouseEnter={presetData}
			className="animate-fade-in flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
		>
			{/* si está cerrado ponemos un icono, sino el otro */}
			{issue.state === State.Close ? (
				<FiCheckCircle size={30} color="green" />
			) : (
				<FiInfo size={30} color="red" className="min-w-10" />
			)}
			{/* <FiInfo size={30} color="red" className="min-w-10" /> */}
			{/* <FiCheckCircle size={30} color="green" /> */}
			<div className="flex flex-col flex-grow px-2">
				<a
					onClick={() => navigate(`/issues/issue/${issue.number}`)}
					className="hover:underline"
				>
					{issue.title}
				</a>
				<span className="text-gray-500">
					{/* TODO days ago */}
					{/* usamos nuestra utilidad para de una fecha mostrar el tiempo transcurrido 
					a partir de dicha fecha*/}
					#${issue.number} opened {timeSince(issue.created_at)} ago by{' '}
					<span className="font-bold">{issue.user.login}</span>
				</span>

				{/* mostramos los labels del issue renderizado */}

				<div className="flex flex-wrap">
					{issue.labels.map((label) => (
						<span
							key={label.id}
							className="px-2 py-1 rounded-full text-xs font-semibold"
							style={{ border: `2px solid #${label.color}` }}
						>
							{label.name}
						</span>
					))}
				</div>
			</div>
			<img
				src={issue.user.avatar_url}
				alt="User Avatar"
				className="w-8 h-8 rounded-full"
			/>
			<div className="flex flex-col mx-2 items-center">
				<FiMessageSquare size={30} className="min-w-5" color="gray" />
				<span className="px-4 text-gray-400">{issue.comments}</span>
			</div>
		</div>
	);
};
