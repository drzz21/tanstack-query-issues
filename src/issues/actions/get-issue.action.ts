import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers';
import { GithubIssue } from '../interfaces';

//este elemento es identico al get issues pero en este caso solo obtenemos una y no varias
export const getIssue = async (issueNumber:number):Promise<GithubIssue> => {
	await sleep(1500);

	const { data } = await githubApi.get<GithubIssue>(`/issues/${issueNumber}`);

	return data;
};
