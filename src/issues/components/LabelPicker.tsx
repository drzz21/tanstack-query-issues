import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../actions';

export const LabelPicker = () => {
	//creamos la query y le pasamos la funcion para que se consulte
	const labelsQuery = useQuery({
		queryKey: ['labels'],
		queryFn: getLabels,
	});

	//si está cargando simplemente mostramos el mensaje de "Espere", sino, retornamos la lista
	//de etiquetas (pendiente)
	if (labelsQuery.isLoading) {
		return (
			<div className="flex justify-center items-center h-52">
				Espere...
			</div>
		);
	}

	// modificamos el diseño para
	// mostrar las etiquetas en forma de "pills" con un borde del color de la etiqueta
	return (
		<div className='flex flex-wrap gap-2 justify-center'>
			{labelsQuery.data?.map((label) => (
				<span
					key={label.id}
					className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer text-white"
					style={{ border: `1px solid #${label.color}` }}
				>
					{label.name}
				</span>
			))}
		</div>
	);
};
