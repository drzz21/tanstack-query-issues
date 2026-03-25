import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
//se importa hook de issues para consultarlo
import { useIssues } from '../hooks/useIssues';

export const ListView = () => {
	const { issuesQuery } = useIssues();

	//creamos la variable issues que tiene la informacion de los issues,
	// y si no hay nada le ponemos un array vacio para que no de error
	//y siempre tener un arreglo
	const issues = issuesQuery.data ?? [];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
			<div className="col-span-1 sm:col-span-2">
				{/* agregamos loader para que se muestre si la info está apenas cargando */}
				{issuesQuery.isLoading ? (
					<LoadingSpinner />
				) : (
					<IssueList issues={issues} />
				)}
			</div>

			<div className="col-span-1 px-2">
				<LabelPicker />
			</div>
		</div>
	);
};
