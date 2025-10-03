'use server'

import { files } from '@/db/schema/files'
import { s3 } from '@/db/s3-client'
import { v4 as uuidv4 } from 'uuid'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { revalidatePath } from 'next/cache'
import { db } from '@/db/client'

export const uploadFile = async (formData: FormData) => {
  console.log('🚀 uploadFile iniciado')
  
  try {
    const file = formData.get('curriculun') as File | null

    if (!file) {
      return { success: false, error: 'Arquivo não enviado.' }
    }

    if (file.size === 0) {
      return { success: false, error: 'Selecione um arquivo.' }
    }

    const name = file.name
    const extension = name.includes('.')
      ? name.split('.').pop()!.toLowerCase()
      : ''

    if (!(extension === 'pdf' && file.type === 'application/pdf')) {
      return { success: false, error: 'Apenas arquivos PDF são permitidos.' }
    }

    console.log('✅ Arquivo válido, convertendo...')
    const ab = await file.arrayBuffer()
    const buf = Buffer.from(new Uint8Array(ab))
    const token = uuidv4()
 
    const uploadResult = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: token,
        Body: buf,
        ContentType: file.type,
        ContentLength: buf.byteLength,
      })
    )
    await db.insert(files).values({
      token: token,
      mime_type: file.type,
      extension: extension,
      title: name,
      size: file.size,
      bucket_ref: token,
    })
    
    
    revalidatePath('/')
    
    return { success: true, token }
    
  } catch (error) {
   
    return { success: false, error: 'Erro inesperado ao enviar o arquivo.' }
  }
}