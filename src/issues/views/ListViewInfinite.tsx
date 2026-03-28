import { useState } from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
//se importa hook de issues para consultarlo
import { useIssuesInfinite } from '../hooks/useIssuesInfinite';
import { State } from '../interfaces';

export const ListViewInfinite = () => {
	const [state, setState] = useState<State>(State.All);

	const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

	const { issuesQuery } = useIssuesInfinite({
		state: state,

		selectedLabels: selectedLabels,
	});

	const issues = issuesQuery.data ?? [];

	const onLabelSelected = (labelName: string) => {
		if (selectedLabels.includes(labelName)) {
			setSelectedLabels(
				selectedLabels.filter((label) => label !== labelName),
			);
		} else {
			setSelectedLabels([...selectedLabels, labelName]);
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
			<div className="col-span-1 sm:col-span-2">
				{issuesQuery.isLoading ? (
					<LoadingSpinner />
				) : (
					<div className="flex flex-col justify-center">
						<IssueList
							issues={issues}
							onStateChange={setState}
							state={state}
						/>

						{/* para navegacion infinita no usamos paginas, solo un boton de cargar mas para seguir cargando las siguientes paginas */}

						<button className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
							Cargar más...
						</button>
					</div>
				)}
			</div>

			<div className="col-span-1 px-2">
				<LabelPicker
					onLabelSelected={onLabelSelected}
					selectedLabels={selectedLabels}
				/>
			</div>
		</div>
	);
};
