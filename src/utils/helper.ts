export const downloadURI = (uri: string, name: string, newPage?: boolean) => {
  const link = document.createElement('a')
  link.download = name
  link.href = uri
  if (newPage) link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
