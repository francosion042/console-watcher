import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const ivLength = 16

export const encrypt = (text: string, encryptionKey: string): string => {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  )
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export const decrypt = (text: string, encryptionKey: string): string => {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(encryptionKey),
    iv
  )
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ])

  return decrypted.toString()
}

export const getFileType = (filePath: string) => {
  const extension = filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2)

  return extension
}

export const validateFileType = (filePath: string) => {
  const allowedFileTypes = ['txt', 'log', 'json']

  const fileType = getFileType(filePath)

  return allowedFileTypes.includes(fileType) ? filePath : undefined
}

export const minutesToMilliseconds = (minutes: number): number => {
  return minutes * 60 * 1000
}
