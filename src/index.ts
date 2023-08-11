import prompts from 'prompts'
import {
  isEmpty,
  emptyDir,
  copyDir,
  templateDir,
  GetTemplateFromGit,
} from '@/utils'
import path from 'path'
import chalk from 'chalk'
import { mkdirSync, existsSync } from 'node:fs'
import ora from 'ora'

const cwd = process.cwd()

const state = {
  projectName: '',
  projectPath: cwd,
  template: {
    from: '',
    name: '',
  },
  lang: 'js',
}

const start = async () => {
  try {
    const projectInfo = await prompts([
      {
        name: 'project',
        type: 'text',
        message: 'Project name',
        validate: (value) => {
          const fail = `Project name can't be empty`
          if (!value) return fail
          if (value) {
            if (!value.trim()) return fail
          }
          return true
        },
      },
      {
        name: 'where',
        type: 'select',
        message: 'Where project to create at ?',
        choices: [
          { title: 'Current folder', value: 'cur' },
          { title: 'New folder', value: 'new' },
        ],
      },
    ])

    state.projectName = projectInfo.project
    if (projectInfo.where === 'new') {
      state.projectPath = path.join(cwd, projectInfo.project)
    }

    const projectOptions = await prompts(
      [
        {
          name: 'lang',
          type: 'select',
          message: 'Select development language',
          choices: [
            { title: 'Javascript', value: 'js' },
            { title: 'Typescript', value: 'ts' },
          ],
        },
        {
          name: 'template',
          type: 'select',
          message: 'Select template',
          choices: [
            { title: 'Proladon', value: 'proladon' },
            { title: 'Other', value: 'other' },
          ],
        },
      ],
      {
        onCancel: (prompt) => {
          console.log('Never stop prompting!')
          return true
        },
      },
    )

    state.lang = projectOptions.lang
    state.template.from = projectOptions.template
    if (projectOptions.template === 'proladon') {
      if (projectOptions.lang === 'js') state.template.name = 'vite-discordjs'
      if (projectOptions.lang === 'ts') state.template.name = 'tsx-discordx'
    }
  } catch (error: any) {
    console.log(error.message)
  }
}

const confirmOrverrideDir = async (path: string) => {
  const override = await prompts([
    {
      name: 'override',
      type: 'select',
      message: chalk.yellowBright(
        '⚠ Project dir already have files, want to overrides ?',
      ),
      choices: [
        { title: chalk.greenBright('yes'), value: true },
        { title: chalk.redBright('no'), value: false },
      ],
    },
  ])
  if (override.override) {
    const spinner = ora('Clean Dir ...').start()
    spinner.color = 'yellow'
    emptyDir(path)
    spinner.text = 'Clean dir done.'
    spinner.succeed()
  }
  if (!override.override) process.exit()
}

const createProject = async () => {
  await start()

  // need override
  if (state.projectPath === cwd) {
    if (!isEmpty(cwd)) await confirmOrverrideDir(cwd)
  }
  // check dir exist
  if (state.projectPath !== cwd) {
    const projectPath = state.projectPath
    if (!existsSync(projectPath)) mkdirSync(projectPath)
    if (!isEmpty(projectPath)) await confirmOrverrideDir(projectPath)
  }

  // copy template to project dir
  if (state.template.from === 'proladon') {
    const spinner = ora('Generate template ...').start()
    copyDir(templateDir(state.template.name), state.projectPath)
    spinner.text = 'Generate template done.'
    spinner.succeed()
  }

  if (state.template.from === 'other') {
    console.log('here')
    const template = await GetTemplateFromGit(
      'https://api.github.com/repos/discordx-ts/templates/contents/1-starter/',
    )
    console.log(template)
  }
}

createProject()
