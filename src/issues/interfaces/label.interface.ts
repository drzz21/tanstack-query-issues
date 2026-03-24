//creamos la interfaz de githublabel de acuerdo a la respuesta de la api
export interface GithubLabel {
	id: number;
	node_id: string;
	url: string;
	name: string;
	color: string;
	default: boolean;
	description?: string;
}
