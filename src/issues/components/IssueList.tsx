import { FC } from 'react';
import { GithubIssue, State } from '../interfaces';
import { IssueItem } from './IssueItem';

//definimos las props de onstate change y state
//que son las funciones para modificar el estado y el estado en sí para saber cual está seleccionado
interface Props {
	issues: GithubIssue[];
	onStateChange: (state: State) => void;
	state: State;
}

//recibimos las props de los issues para mostrarlos
export const IssueList: FC<Props> = ({ issues, onStateChange, state }) => {
	return (
		<>
			{/* Botones de All, Open, Closed */}
			<div className="flex gap-4">
				{/* agregamos estilos dinamicos para agregar uan clase active 
				y saber cual estado está seleccionado*/}
				<button
					onClick={() => onStateChange(State.All)}
					className={`btn ${state === State.All ? 'active' : ''}`}
				>
					All
				</button>
				<button
					onClick={() => onStateChange(State.Open)}
					className={`btn ${state === State.Open ? 'active' : ''}`}
				>
					Open
				</button>
				<button
					onClick={() => onStateChange(State.Close)}
					className={`btn ${state === State.Close ? 'active' : ''}`}
				>
					Closed
				</button>
			</div>

			{/* Lista de issues */}
			<div className="mt-4">
				{issues.map((issue) => (
					// iteramos y mostramos los issues
					<IssueItem key={issue.id} issue={issue} />
				))}
			</div>
		</>
	);
};
