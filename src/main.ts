#!/usr/bin/env node
import { cancel, intro, isCancel, log, outro, select } from '@clack/prompts'
import { conventional } from './conventional'
import { commitMessage, hasStaged, isInGitRepo } from './git'
import { gitmoji } from './gitmoji'

intro('Commit help')

if (!(await isInGitRepo())) {
	cancel('Not a git repository (or any of the parent directories)')
	process.exit(0)
}
if (!(await hasStaged())) {
	cancel('Nothing added to commit')
	process.exit(0)
}

function abort() {
	cancel('Aborting commit')
	return process.exit(0)
}

const style = await select({
	message: 'Style',
	options: [
		{ value: 'conventional', label: 'Conventional Commits' },
		{ value: 'gitmoji', label: 'Gitmoji' },
	],
})

if (isCancel(style)) {
	abort()
}

let commit: string | undefined = undefined
if (style === 'conventional') {
	commit = await conventional(abort)
}
if (style === 'gitmoji') {
	commit = await gitmoji(abort)
}
if (!commit) throw new Error('not valid commit message')

const commitResult = await commitMessage(commit)
if (commitResult.exitCode !== 0) {
	cancel(commitResult.stderr)
	process.exit(0)
}

log.success(commitResult.stdout.trim())
outro('commit successfull')
