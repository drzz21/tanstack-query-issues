import { LoadingSpinner } from '../../shared';
import { useLabels } from '../hooks/useLabels';

export const LabelPicker = () => {
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
					className="animate-fade-in px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white"
					style={{ border: `1px solid #${label.color}` }}
				>
					{label.name}
				</span>
			))}
		</div>
	);
};
