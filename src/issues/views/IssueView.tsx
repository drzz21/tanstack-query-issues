import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks/useIssue';
import { LoadingSpinner } from '../../shared';

export const IssueView = () => {
	const navigate = useNavigate();

	// tomamos los params usando react router

	const params = useParams();

	//asignamos una variable local con el valor de nuestro param issueNumber
	const issueNumber = Number(params.issueNumber ?? 0);
	//consultamos la informacion de ese issue usando nuestro hook
	const { issueQuery, commentsQuery } = useIssue(issueNumber);

	//si estamos cargando la informacion del query mostramos un mensaje de carga
	if (issueQuery.isLoading) {
		return <div>Cargando issue...</div>;
	}

	//si no hay informacion del issue, redirigimos a una pagina 404
	if (!issueQuery.data) {
		return <Navigate to="/404" />;
	}

	return (
		<div className="mb-5">
			<div className="mb-4">
				<button
					onClick={() => navigate(-1)}
					className="hover:underline text-blue-400 flex items-center"
				>
					<FiSkipBack />
					Regresar
				</button>
			</div>

			{/* Primer comentario */}
			{/* cargamos el primer comentario que es basicamente
			la descripcion del issue por el autor */}
			<IssueComment issue={issueQuery.data} />

			{/* iteramos sobre los comentarios
			en caso de estarlos cargando, mostramos un spinner
			y al obtenerlos iteramos sobre nuestra respuesta */}

			{commentsQuery.isLoading ? (
				<LoadingSpinner/>
			) : (
				commentsQuery.data?.map((comment) => (
					<IssueComment key={comment.id} issue={comment} />
				))
			)}

			{/* Comentario de otros */}
			{/* TODO comentarios */}
			{/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
		</div>
	);
};
