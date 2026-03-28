import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces';

interface Props {
	state: State;
	selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {

	const issuesQuery = useQuery({
		queryKey: ['issues', { state, selectedLabels }],
		queryFn: () => getIssues(state, selectedLabels,1),
		staleTime: 1000 * 60,
	});



	return {
		issuesQuery,
	
	};
};
