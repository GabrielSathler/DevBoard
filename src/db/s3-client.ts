import { S3Client } from "@aws-sdk/client-s3"

if (!process.env.ENDPOINT_S3) {
  throw new Error('ENDPOINT_S3 não configurado')
}
if (!process.env.ACCESS_KEY_ID) {
  throw new Error('ACCESS_KEY_ID não configurado')
}
if (!process.env.SECRET_ACCESS_KEY) {
  throw new Error('SECRET_ACCESS_KEY não configurado')
}

export const s3 = new S3Client({
  endpoint: process.env.ENDPOINT_S3,
  region: process.env.REGION_S3 || 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  maxAttempts: 3,
  requestHandler: {
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
})