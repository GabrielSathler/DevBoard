import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCode, Code } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold ">
          O sistema para organizar 
        </h1>
        <span className="text-6xl font-bold text-purple-600">funcionários de tecnologia</span>
        <p className="mt-4 text-xl text-muted-foreground">
          Um Dashboard completo para gestão de equipes onde você pode visualizar e gerenciar<br />
          todos os colaboradores de forma eficiente e prática.
        </p>
        <span className="g-4 p-4 space-x-6">
          <Button className="mt-4 bg-purple-600 hover:bg-purple-700 border-purple-700 text-white h-10">
                 <Link 
                      className="flex items-center gap-3 px-3 py-2"
                      href="/Formulario"
                    >
                      Começar
                    </Link>
            </Button>
          <Button className="mt-4 h-10" variant="outline">
            <Link 
                      className="flex items-center gap-3 px-3 py-2"
                      href="/List"
                    >
                      Ver desenvolvedores
                    </Link>
          </Button>
        </span>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full w-8">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="space-y-4">
              <Users className="w-12 h-12 text-purple-600" />
              <CardTitle className="text-xl text-white">Gestão de Equipe</CardTitle>
              <CardDescription className="text-zinc-400">
                Organize e gerencie todos os desenvolvedores da sua empresa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="space-y-4">
              <FileCode className="w-12 h-12 text-purple-600" />
              <CardTitle className="text-xl text-white">Perfis Completos</CardTitle>
              <CardDescription className="text-zinc-400">
                Armazene currículos, GitHub e informações importantes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="space-y-4">
              <Code className="w-12 h-12 text-purple-600" />
              <CardTitle className="text-xl text-white">Interface Moderna</CardTitle>
              <CardDescription className="text-zinc-400">
                Dashboard intuitivo e fácil de usar para toda a equipe
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}