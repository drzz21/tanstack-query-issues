import { useQuery } from "@tanstack/react-query";
import { sleep } from "../../helpers";

//creamos la funcion que consultará la informacion del api
//usando fetch, agregamos un sleep para detener la ejecucion de la funcion
//por segundo y medio para probar el caché

const getLabels = async (): Promise<unknown[]> => {

	await sleep(1500);

	const resp = await fetch(
		'https://api.github.com/repos/facebook/react/labels',
	).then((r) => r.json());

	console.log(resp);

	return resp;
};

export const LabelPicker = () => {
	//creamos la query y le pasamos la funcion para que se consulte
	const labelsQuery = useQuery({
		queryKey: ['labels'],
		queryFn: getLabels,
	});

	//si está cargando simplemente mostramos el mensaje de "Espere", sino, retornamos la lista
	//de etiquetas (pendiente)
	if(labelsQuery.isLoading) {
		return <div className="flex justify-center items-center h-52">Espere...</div>;
	}

	return (
		<>
			<span
				className="px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
				style={{ border: `1px solid #ffccd3`, color: '#ffccd3' }}
			>
				Primary
			</span>
		</>
	);
};
