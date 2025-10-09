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

  console.log(filled)

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
    }catch{
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
        toast.error('Erro ao enviar o arquivo PDF.')
        return
      }
      const formdata = new FormData()

      formdata.set('firstName', data.firstName)
      formdata.set('email', data.email)
      formdata.set('github_username', data.github_username)

      formdata.set('curriculun', uploadResult.token)

      startTransition(() => {
        formAction(formdata).then(() => {
          toast.success('Cadastro realizado com sucesso!')
          setFile(null)
          form.reset()
        }).catch(() => {
          toast.error('Erro ao salvar cadastro.')
        })
      })
    } catch {
      toast.error('Erro ao enviar o formulário.')
    }
  }
   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={pending}>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 p-4 sm:p-6 lg:p-10 rounded-xl w-full max-w-[800px] mx-auto border bg-gray-500/10 shadow-lg">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <span className='text-xl sm:text-2xl font-bold block'>Informações do Desenvolvedor</span>
                  <span className='text-muted-foreground text-xs sm:text-sm pb-2 sm:pb-4 block'>Preencha as informações do Desenvolvedor para adicionar ao sistema</span>
                  <FormLabel className="flex items-center gap-2">
                    <User size={15} color='#9810fa' className="flex-shrink-0" />
                    <span className="text-sm sm:text-base">Nome</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome" className="p-3 sm:p-4 shadow-sm text-sm sm:text-base" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Mail size={15} color='#9810fa' className="flex-shrink-0" />
                    <span className="text-sm sm:text-base">Email</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o email" className="p-3 sm:p-4 shadow-sm text-sm sm:text-base" />
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
                  <FormLabel className="flex items-center gap-2">
                    <Github size={15} color='#9810fa' className="flex-shrink-0" />
                    <span className="text-sm sm:text-base">Usuário do GitHub</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o usuário do GitHub" className="p-3 sm:p-4 shadow-sm focus:border-blue-500 text-sm sm:text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel className="flex items-center gap-2">
                <File size={15} color='#9810fa' className="flex-shrink-0" />
                <span className="text-sm sm:text-base">Cúrriculo (PDF)</span>
              </FormLabel>
              <Dropzone file={file} setFile={setFile} />
              {!file && (<span className="text-xs sm:text-sm">Currículo obrigatório*</span>)}
            </div>
            <div className="flex justify-center shadow-lg mt-2 sm:mt-4">
              <Button
                type="submit"
                className="hover:cursor-pointer bg-purple-950 hover:bg-purple-600/90 text-white p-4 sm:p-6 text-base sm:text-lg lg:text-xl w-full"
              >
                {pending ? 'Enviando...' : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Cadastrar Desenvolvedor</span>
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}