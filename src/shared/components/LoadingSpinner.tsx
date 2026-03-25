import { FiRefreshCcw } from 'react-icons/fi';

export const LoadingSpinner = () => {
	// componente spinner
	return (
		<div className='loading'>
			{/* Modificamos spinner para que solo gire el icono y no todo el div */}
			<div className='flex w-full h-52 justify-center items-center'>
				<FiRefreshCcw size={40} className="animate-spin"/>
			</div>
		</div>
	);
};
