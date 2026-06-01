import { confirm, group, isCancel, multiline, select, text } from '@clack/prompts'

export async function gitmoji(abort: () => never) {
	const firstLineValues = await group(
		{
			type: () =>
				select({
					message: 'Pick the type of commit',
					options: list,
				}),
			scope: () =>
				text({
					message: 'What is the scope of this change (e.g. component or file name)',
					placeholder: 'press enter to skip',
				}),
			shortDescription: () =>
				text({
					message: 'Short description',
					validate(value) {
						if (!value) return 'Short description is required'
					},
				}),
		},
		{
			onCancel: abort,
		},
	)

	const firstLine = `${firstLineValues.type} ${firstLineValues.scope ? `(${firstLineValues.scope}): ` : ''}${firstLineValues.shortDescription}`

	if (firstLine.length > 72) {
		const stillContinue = confirm({
			message: `First line is above 72 characters. Do you still want to continue? (${firstLine})`,
		})
		if (!stillContinue) {
			abort()
		}
	}

	const description = await multiline({
		message: 'Longer description',
		placeholder: 'press enter to skip',
	})
	if (isCancel(description)) {
		abort()
	}

	return `${firstLine}
  
${description}
`.trim()
}

const list = [
	{
		value: '🎨',
		hint: 'Improve structure / format of the code.',
	},
	{
		value: '⚡️',
		hint: 'Improve performance.',
	},
	{
		value: '🔥',
		hint: 'Remove code or files.',
	},
	{
		value: '🐛',
		hint: 'Fix a bug.',
	},
	{
		value: '🚑️',
		hint: 'Critical hotfix.',
	},
	{
		value: '✨',
		hint: 'Introduce new features.',
	},
	{
		value: '📝',
		hint: 'Add or update documentation.',
	},
	{
		value: '🚀',
		hint: 'Deploy stuff.',
	},
	{
		value: '💄',
		hint: 'Add or update the UI and style files.',
	},
	{
		value: '🎉',
		hint: 'Begin a project.',
	},
	{
		value: '✅',
		hint: 'Add, update, or pass tests.',
	},
	{
		value: '🔒️',
		hint: 'Fix security or privacy issues.',
	},
	{
		value: '🔐',
		hint: 'Add or update secrets.',
	},
	{
		value: '🔖',
		hint: 'Release / Version tags.',
	},
	{
		value: '🚨',
		hint: 'Fix compiler / linter warnings.',
	},
	{
		value: '🚧',
		hint: 'Work in progress.',
	},
	{
		value: '💚',
		hint: 'Fix CI Build.',
	},
	{
		value: '⬇️',
		hint: 'Downgrade dependencies.',
	},
	{
		value: '⬆️',
		hint: 'Upgrade dependencies.',
	},
	{
		value: '📌',
		hint: 'Pin dependencies to specific versions.',
	},
	{
		value: '👷',
		hint: 'Add or update CI build system.',
	},
	{
		value: '📈',
		hint: 'Add or update analytics or track code.',
	},
	{
		value: '♻️',
		hint: 'Refactor code.',
	},
	{
		value: '➕',
		hint: 'Add a dependency.',
	},
	{
		value: '➖',
		hint: 'Remove a dependency.',
	},
	{
		value: '🔧',
		hint: 'Add or update configuration files.',
	},
	{
		value: '🔨',
		hint: 'Add or update development scripts.',
	},
	{
		value: '🌐',
		hint: 'Internationalization and localization.',
	},
	{
		value: '✏️',
		hint: 'Fix typos.',
	},
	{
		value: '💩',
		hint: 'Write bad code that needs to be improved.',
	},
	{
		value: '⏪️',
		hint: 'Revert changes.',
	},
	{
		value: '🔀',
		hint: 'Merge branches.',
	},
	{
		value: '📦️',
		hint: 'Add or update compiled files or packages.',
	},
	{
		value: '👽️',
		hint: 'Update code due to external API changes.',
	},
	{
		value: '🚚',
		hint: 'Move or rename resources (e.g.: files, paths, routes).',
	},
	{
		value: '📄',
		hint: 'Add or update license.',
	},
	{
		value: '💥',
		hint: 'Introduce breaking changes.',
	},
	{
		value: '🍱',
		hint: 'Add or update assets.',
	},
	{
		value: '♿️',
		hint: 'Improve accessibility.',
	},
	{
		value: '💡',
		hint: 'Add or update comments in source code.',
	},
	{
		value: '🍻',
		hint: 'Write code drunkenly.',
	},
	{
		value: '💬',
		hint: 'Add or update text and literals.',
	},
	{
		value: '🗃️',
		hint: 'Perform database related changes.',
	},
	{
		value: '🔊',
		hint: 'Add or update logs.',
	},
	{
		value: '🔇',
		hint: 'Remove logs.',
	},
	{
		value: '👥',
		hint: 'Add or update contributor(s).',
	},
	{
		value: '🚸',
		hint: 'Improve user experience / usability.',
	},
	{
		value: '🏗️',
		hint: 'Make architectural changes.',
	},
	{
		value: '📱',
		hint: 'Work on responsive design.',
	},
	{
		value: '🤡',
		hint: 'Mock things.',
	},
	{
		value: '🥚',
		hint: 'Add or update an easter egg.',
	},
	{
		value: '🙈',
		hint: 'Add or update a .gitignore file.',
	},
	{
		value: '📸',
		hint: 'Add or update snapshots.',
	},
	{
		value: '⚗️',
		hint: 'Perform experiments.',
	},
	{
		value: '🔍️',
		hint: 'Improve SEO.',
	},
	{
		value: '🏷️',
		hint: 'Add or update types.',
	},
	{
		value: '🌱',
		hint: 'Add or update seed files.',
	},
	{
		value: '🚩',
		hint: 'Add, update, or remove feature flags.',
	},
	{
		value: '🥅',
		hint: 'Catch errors.',
	},
	{
		value: '💫',
		hint: 'Add or update animations and transitions.',
	},
	{
		value: '🗑️',
		hint: 'Deprecate code that needs to be cleaned up.',
	},
	{
		value: '🛂',
		hint: 'Work on code related to authorization, roles and permissions.',
	},
	{
		value: '🩹',
		hint: 'Simple fix for a non-critical issue.',
	},
	{
		value: '🧐',
		hint: 'Data exploration/inspection.',
	},
	{
		value: '⚰️',
		hint: 'Remove dead code.',
	},
	{
		value: '🧪',
		hint: 'Add a failing test.',
	},
	{
		value: '👔',
		hint: 'Add or update business logic.',
	},
	{
		value: '🩺',
		hint: 'Add or update healthcheck.',
	},
	{
		value: '🧱',
		hint: 'Infrastructure related changes.',
	},
	{
		value: '🧑‍💻',
		hint: 'Improve developer experience.',
	},
	{
		value: '💸',
		hint: 'Add sponsorships or money related infrastructure.',
	},
	{
		value: '🧵',
		hint: 'Add or update code related to multithreading or concurrency.',
	},
	{
		value: '🦺',
		hint: 'Add or update code related to validation.',
	},
]
