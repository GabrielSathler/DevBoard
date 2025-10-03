import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db/client"
import { usuarios } from "@/db/schema/schema"
import axios from "axios"
import Image from "next/image"
import { Upload, User, Mail, Github, File, } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default async function UserInformations() {

    const listarUsuarios = await db.select().from(usuarios)

    const gitHubInfomations = await Promise.all(
        listarUsuarios.map(async (username) => {
            const headers: any = {}

            if (process.env.GITHUB_TOKEN) {
                headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
            }
            const response = await axios.get(`https://api.github.com/users/${username.github_username}`, { headers })
            return {
                login: response.data.login,
                name: response.data.name,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
                repos: response.data.public_repos

            }
        })
    )
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto gap-6">
            {listarUsuarios.map((username, idx) => {
                const github = gitHubInfomations[idx];
                return (
                    <Card key={username.github_username} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Image
                                    className="rounded-full"
                                    src={github.avatar}
                                    alt={`Avatar de ${github.name}`}
                                    width={50}
                                    height={50}
                                />
                                <div className="flex flex-col">
                                    <CardTitle className="text-lg">{github.name}</CardTitle>
                                    <CardDescription>
                                        @{github.login}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground flex-grow">
                            <div className="flex items-center gap-2">
                                <Mail size={15} color='#9810fa' className="shrink-0" />
                                <span>{username.email}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <User size={15} color='#9810fa' className="shrink-0 mt-0.5" />
                                <span>{github.bio}</span>
                            </div>

                            <Button variant={"outline"} className="mt-auto h-10 w-full">
                                Mais detalhes
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}