import { FiRefreshCcw } from 'react-icons/fi';

export const LoadingSpinner = () => {
	// componente spinner
	return (
		<div className='loading'>
			<div className="animate-spin">
				<FiRefreshCcw size={40}/>
			</div>
		</div>
	);
};
