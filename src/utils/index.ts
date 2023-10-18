export const getFileType = (filePath: string) => {
  const extension = filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2)

  return extension
}

export const validateFileType = (filePath: string) => {
  const allowedFileTypes = ['txt', 'log', 'json']

  const fileType = getFileType(filePath)

  return allowedFileTypes.includes(fileType) ? filePath : undefined
}
