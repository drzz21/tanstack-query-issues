import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import './index.css';
//instalacion de react query y las devtools
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// con esto definimos configuracion global de nuestro tanstack query
//ponemos los reintentos en false para que no los reintente los querys
const queryClient = new QueryClient({
	defaultOptions:{
		queries:{
			retry: false, 
		}
	}
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>,
);
