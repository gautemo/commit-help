import { group, select, text, confirm, isCancel } from "@clack/prompts";
import { breakLines } from "./utils";

export async function conventional(abort: () => never) {
  const firstLineValues = await group({
    type: () => select({
      message: 'Pick the type of commit',
      options: [
        { value: 'build', hint: 'Changes that affect the build system or external dependencies' },
        { value: 'chore', hint: `Other changes that don't modify src or test files` },
        { value: 'ci', hint: 'Changes to our CI configuration files and scripts' },
        { value: 'docs', hint: 'Documentation only changes' },
        { value: 'feat', hint: 'A new feature' },
        { value: 'fix', hint: 'A bug fix' },
        { value: 'perf', hint: 'A code change that improves performance' },
        { value: 'refactor', hint: 'A code change that neither fixes a bug nor adds a feature' },
        { value: 'revert', hint: 'Reverts a previous commit' },
        { value: 'style', hint: 'Changes that do not affect the meaning of the code' },
        { value: 'test', hint: 'Adding missing tests or correcting existing tests' },
      ]
    }),
    scope: () => text({
      message: 'What is the scope of this change (e.g. component or file name)',
      placeholder: 'press enter to skip',
      validate(value) {
        if(value.includes('\\n')) return 'line breaks (\\n) are not allowed'
      }
     }),
    breaking: () => confirm({ message: 'Are there any breaking changes?', initialValue: false }),
    shortDescription: () => text({
      message: 'Short description',
      validate(value) {
        if (value.length === 0) return `Short description is required`;
        if(value.includes('\\n')) return 'line breaks (\\n) are not allowed'
      }
    }),
  }, {
    onCancel: abort,
  })

  const firstLine = `${firstLineValues.type}${firstLineValues.scope ? `(${firstLineValues.scope})` : ''}${firstLineValues.breaking ? '!' : ''}: ${firstLineValues.shortDescription}`

  if(firstLine.length > 72) {
    const stillContinue = confirm({
      message: `First line is above 72 characters. Do you still want to continue? (${firstLine})`
    })
    if(!stillContinue) {
      abort()
    }
  }

  let breakingDescription: string | undefined = undefined
  if(firstLineValues.breaking) {
    const breakingDescriptionPrompt = await text({
      message: 'Describe the breaking change (\\n for line breaks)',
      placeholder: 'press enter to skip',
    })
    if (isCancel(breakingDescriptionPrompt)) {
      abort()
    } else {
      breakingDescription = breakingDescriptionPrompt
    }
  }

  const description = await text({
    message: 'Longer description (\\n for line breaks)',
    placeholder: 'press enter to skip',
  })
  if(isCancel(description)) {
    abort()
  }

  let footer = ''
  while(true) {
    const footerPrompt = await confirm({
      message: `Add ${footer.length > 0 ? 'another ' : ''}footer?`,
      initialValue: false,
    })
    if(isCancel(footerPrompt)) {
      abort()
    }
    if(footerPrompt) {
      const footerKey = await text({
        message: 'footer token (e.g. Fix, Reviewed-by, Refs)',
        validate(value) {
          if (value.length === 0) return `token is required`;
          if(value.includes('\\n')) return 'line breaks (\\n) are not allowed'
        },
      })
      if(isCancel(footerKey)) {
        abort()
      }
      const footerValue = await text({
        message: 'footer token (e.g. Fix, Reviewed-by, Refs)',
        validate(value) {
          if (value.length === 0) return `value is required`;
        },
      })
      if(isCancel(footerValue)) {
        abort()
      }
      footer += `${footerKey.trim().replaceAll(/\s/g, '-')}: ${breakLines(footerValue)}`
    } else {
      break
    }
  }

  return `${firstLine}
  
${description ?? ''}

${breakingDescription ? `BREAKING CHANGE: ${breakingDescription}` : ''}
${footer}
`.trim()
}