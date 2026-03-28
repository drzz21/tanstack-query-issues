// Esta funcion nos ayuda a calcular el tiempo transcurrido de una fecha
// y lo devuelve en un formato legible para el usuario, como "2 hours ago" o "5 days ago".
//la funcion fue creada por Fernando Herrera
//y aqui se usa como un helper que usamos en otro componente
export const timeSince = (date: string | Date) => {
	const baseDate = new Date(date);

	const seconds = Math.floor(
		(new Date().getTime() - baseDate.getTime()) / 1000,
	);

	let interval = seconds / 31536000;

	if (interval > 1) {
		return Math.floor(interval) + ' years';
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return Math.floor(interval) + ' months';
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return Math.floor(interval) + ' days';
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return Math.floor(interval) + ' hours';
	}
	interval = seconds / 60;
	if (interval > 1) {
		return Math.floor(interval) + ' minutes';
	}
	return Math.floor(seconds) + ' seconds';
};
