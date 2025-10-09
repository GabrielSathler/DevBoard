"use client"

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { Github } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { formActionDelete, formActionModal } from '@/app/(main-layout)/Formulario/components/actions/formAction'

// Schema de validação
const formSchema = z.object({
    username: z.string().min(1, 'Username é obrigatório'),
    email: z.string().email('Email inválido').or(z.literal('')),
    github_username:  z.string()
})

type FormValues = z.infer<typeof formSchema>

type Informations = {
    username: {
        github_username: string,
        login: string,
        name: string,
        bio: string,
        avatar: string,
        repos: string,
        username: string,
        email: string | null,
        id: number
    }
}

export function ModalIformation({ username }: Informations) {
    const [isEditing, setIsEditing] = useState(false)
    const [open, setOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username.username,
            email: username.email || '',
            github_username: username.github_username
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            setIsPending(true)

            const formdata = new FormData()

            formdata.set('username', data.username)
            formdata.set('email', data.email)
            formdata.set('github_username', username.github_username)


            await formActionModal(formdata)
                .then(() => {
                    toast.success('Perfil atualizado com sucesso!')
                    setIsEditing(false) 
                    setOpen(false) 
                })
                .catch(() => {
                    console.error('Erro:')
                    toast.error( 'Erro ao salvar cadastro.')
                })
                .finally(() => {
                    setIsPending(false)
                })

        } catch {
            console.error('Erro no submit:')
            toast.error('Erro ao atualizar perfil')
            setIsPending(false)
        }
    }

    const handleDelete = async () => {
        
        const formdata = new FormData();
        formdata.append("github_username", username.github_username);
        
        try {
            await formActionDelete(formdata);
            toast.success('Usuário deletado com sucesso!')
            setOpen(false)
        } catch {
            toast.error('Erro ao deletar usuário')
        }
    }

    const handleCancel = () => {
        form.reset()
        setIsEditing(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mt-auto h-10 w-full cursor-pointer">
                    Mais Detalhes
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Perfil de {username.username}</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Aqui você poderá visualizar e editar informações básicas do perfil do usuário cadastrado.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex gap-6">
                            <div className="flex-shrink-0">
                                <Image
                                    className="rounded-full"
                                    src={username.avatar}
                                    alt={`Avatar de ${username.name}`}
                                    width={150}
                                    height={150}
                                />
                                <Button
                                    variant={"ghost"}
                                    asChild
                                    className="w-full mt-2"
                                >
                                    <Link
                                        href={`https://github.com/${username.login}`}
                                        target="_blank"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Github color="#9810fa" width={16} height={16} />
                                        <span className="text-xs text-muted-foreground hover:underline">
                                            {username.repos} repos
                                        </span>
                                    </Link>
                                </Button>
                            </div>

                            <div className="flex-1 space-y-4">
                                {!isEditing ? (
                                    // Modo visualização
                                    <>
                                        <div>
                                            <p className="font-semibold text-lg">{username.username}</p>
                                            <p className="text-sm text-muted-foreground">@{username.login}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-1">Bio</p>
                                            <p className="text-sm">{username.bio}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-1">Email</p>
                                            <p className="text-sm">{username.email || 'Não informado'}</p>
                                        </div>
                                    </>
                                ) : (
                                    // Modo edição
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nome" {...field} />
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
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="seu@email.com"
                                                            {...field}
                                                            value={field.value || ''}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="flex flex-row justify-between w-full mt-6 pt-4 border-t">
                            <Button
                                type="button"
                                className="cursor-pointer"
                                onClick={handleDelete}
                                variant={"destructive"}
                                disabled={isPending}
                            >
                                Deletar
                            </Button>

                            {!isEditing ? (
                                <Button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() => setIsEditing(true)}
                                    variant={"outline"}
                                >
                                    Editar
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        onClick={handleCancel}
                                        variant={"ghost"}
                                        disabled={isPending}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="cursor-pointer"
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Salvando...' : 'Salvar'}
                                    </Button>
                                </div>
                            )}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}