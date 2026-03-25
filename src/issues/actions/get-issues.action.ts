import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubIssue } from '../interfaces';

//Se agrega get issues action, funciona practicamente igual que get-labels.action
//en este caso para consultar issues
export const getIssues = async ():Promise<GithubIssue[]> => {
	await sleep(1500);

	const { data } = await githubApi.get<GithubIssue[]>('/issues');

	return data;
};
