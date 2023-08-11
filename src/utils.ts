import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import axios from 'axios'
import { promisify } from 'util'
import { tmpdir } from 'os'
import { Readable, Stream } from 'stream'
import tar from 'tar'

export const templateDir = (templateName: string) =>
  path.resolve(fileURLToPath(import.meta.url), '../../template', templateName)

export function toPosixPath(path: string) {
  if (path) return path.replace(/\\/g, '/')
  return path
}

export function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) copyDir(src, dest)
  else fs.copyFileSync(src, dest)
}

export function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

export function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) return
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') continue
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

export const GetTemplateFromGit = async (
  gitUri: string,
): Promise<{ title: string; value: string }[]> => {
  const res = await axios({
    method: 'GET',
    url: gitUri,
  })
  console.log(res.data)
  if (res.data)
    return res.data.map((row: any) => ({ title: row.name, value: row.path }))
  return []
}

async function downloadTar(url: string) {
  const pipeline = promisify(Stream.pipeline)
  const tempFile = path.join(tmpdir(), `discordx-template.temp-${Date.now()}`)

  const request = await axios({
    responseType: 'stream',
    url: url,
  })

  await pipeline(Readable.from(request.data), fs.createWriteStream(tempFile))
  return tempFile
}

export async function DownloadAndExtractTemplate(
  root: string,
  name: string,
): Promise<void> {
  const tempFile = await downloadTar(
    'https://codeload.github.com/discordx-ts/templates/tar.gz/main',
  )

  await tar.x({
    cwd: root,
    file: tempFile,
    filter: (p) => p.includes(`templates-main/${name}`),
    strip: 2,
  })

  await fs.promises.unlink(tempFile)
}
