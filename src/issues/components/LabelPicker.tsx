import { FC } from 'react';
import { LoadingSpinner } from '../../shared';
import { useLabels } from '../hooks/useLabels';

//recibimos los labels seleccionados y la funcion para modificarlos
interface Props {
	onLabelSelected: (labelName: string) => void;
	selectedLabels: string[];
}

export const LabelPicker: FC<Props> = ({ onLabelSelected, selectedLabels }) => {
	//pasamos la definicion del query al hook
	const { labelsQuery } = useLabels();

	//si está cargando simplemente mostramos el mensaje de "Espere", sino, retornamos la lista
	//de etiquetas (pendiente)
	if (labelsQuery.isLoading) {
		return (
			<div className="flex justify-center items-center h-52">
				{/* Espere... */}
				{/* usamos nuestro nuevo componente de LoadingSpinner para mostrar una animación de carga en lugar del texto "Espere..." */}
				<LoadingSpinner />
			</div>
		);
	}

	// modificamos el diseño para
	// mostrar las etiquetas en forma de "pills" con un borde del color de la etiqueta
	return (
		<div className="flex flex-wrap gap-2 justify-center">
			{labelsQuery.data?.map((label) => (
				// agregamos nuestra recien creada animacion
				<span
					key={label.id}
					//al hacer click sobre un label, lo agregamos o quitamos
					//dependiendo de si ya está seleccionado o no
					//y definimos tambien la clase custom para marcar con estilo diferente los labels
					//ya seleccionados
					onClick={() => onLabelSelected(label.name)}
					className={`animate-fade-in px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white ${selectedLabels.includes(label.name) ? 'selected-label' : ''}`}
					style={{ border: `1px solid #${label.color}` }}
				>
					{label.name}
				</span>
			))}
		</div>
	);
};
