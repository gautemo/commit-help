import { x } from 'tinyexec'

export async function hasStaged() {
	const result = await x('git', ['diff', '--name-only', '--staged'])
	return result.stdout.length > 0
}

export async function isInGitRepo() {
	const result = await x('git', ['rev-parse', '--is-inside-work-tree'])
	return result.stdout.includes('true')
}

export async function commitMessage(message: string) {
	return await x('git', ['commit', '-m', message])
}
