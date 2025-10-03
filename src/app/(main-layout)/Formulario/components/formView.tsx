'use client'

import { useState, useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Upload, User, Mail, Github, File } from 'lucide-react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dropzone } from './Dropzone'
import { uploadFile } from './actions/uploadFile'
import { formAction } from './actions/formAction'
import { z } from 'zod'

import axios from "axios";

const validationSchema = z.object({
  firstName: z.string().min(3, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  github_username: z.string().min(1, "GitHub obrigatório"),
  curriculun: z.string().min(0, "Curriculo Obrigatorio")
})

type FormValues = z.infer<typeof validationSchema>

export function FormView() {
  const [file, setFile] = useState<File | null>(null)
  const [filled, setFilled] = useState(false)
  const [pending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      firstName: '',
      email: '',
      github_username: '',
      curriculun: '',
    },
  })

  const watchedValues = form.watch()

  async function validateGithubUsernames(username: string) {
    try{
     const response = await axios.get(`https://api.github.com/users/${username}`)
     return response.data.login
    }catch(error){
      return null
    }
  }

  useEffect(() => {
    const { firstName, email, github_username } = watchedValues
    if (firstName && email && github_username && file) {
      setFilled(true)
    } else {
      setFilled(false)
    }
  }, [watchedValues, file])

  const onSubmit = async (data: FormValues) => {
    const user = await validateGithubUsernames(data.github_username)

    if (!user) {
      form.setError("github_username", {
        type:"manual",
        message:"Usuario do GitHub não encontrado."
      });
      toast.error("Usuario não encontrado.")
      return
    }

    if (!file) {
      toast.error('Selecione um currículo!')
      return
    }
    try {
      const fd = new FormData()
      fd.set('curriculun', file, file.name)
      const uploadResult = await uploadFile(fd)
      if (!uploadResult || !uploadResult.success || !uploadResult.token) {
        toast.error(uploadResult?.error || 'Erro ao enviar o arquivo PDF.')
        return
      }
      const formdata = new FormData()

      formdata.set('firstName', data.firstName)
      formdata.set('email', data.email)
      formdata.set('github_username', data.github_username)

      formdata.set('curriculun', uploadResult.token)

      startTransition(() => {
        formAction(formdata).then((res) => {
          toast.success('Cadastro realizado com sucesso!')
          setFile(null)
          form.reset()
        }).catch((err) => {
          toast.error('Erro ao salvar cadastro.')
        })
      })
    } catch (err) {
      toast.error('Erro ao enviar o formulário.')
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={pending}>
          <div className="grid grid-cols-1 gap-6 p-10 rounded-xl w-[800px] mx-auto border bg-gray-500/10 shadow-lg">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <span className='text-2xl font-bold'>Informações do Desenvolvedor</span>
                  <span className='text-muted-foreground pb-4'>Preencha as informações do Desenvolvedor para adicionar ao sistema</span>
                  <FormLabel>
                    <User size={15} color='#9810fa' />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome" className="p-4 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Mail size={15} color='#9810fa' />
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o email" className="p-4 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Github size={15} color='#9810fa' />
                    Usuário do GitHub
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o usuário do GitHub" className="p-4 shadow-sm focus:border-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>
                <File size={15} color='#9810fa' />
                Cúrriculo (PDF)
              </FormLabel>
              <Dropzone file={file} setFile={setFile} />
              {!file && (<span className="text-xs">Currículo obrigatório*</span>)}
            </div>
            <div className="flex justify-center shadow-lg">
              <Button
                type="submit"
                className="hover:cursor-pointer bg-purple-950 hover:bg-purple-600/90 text-white p-6 text-lg sm:text-xl mt-2 w-full"
              >
                {pending ? 'Enviando...' : <>Cadastrar Desenvolvedor <Upload className="ml-2" /></>}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
