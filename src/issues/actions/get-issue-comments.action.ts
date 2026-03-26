import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubIssue } from '../interfaces';

//action para obtener informacion de los comentarios de un issue
export const getIssueComments = async (issueNumber:number):Promise<GithubIssue[]> => {
	await sleep(1500);

	const { data } = await githubApi.get<GithubIssue[]>(`/issues/${issueNumber}/comments`);

	return data;
};
