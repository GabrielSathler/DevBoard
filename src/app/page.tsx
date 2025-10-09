import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCode, Code } from "lucide-react";
import Link from "next/link";

export default function Home() {
   return (
    <div className="mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col items-center justify-center text-center max-w-7xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          O sistema para organizar 
        </h1>
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-purple-600 leading-tight">
          funcionários de tecnologia
        </span>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl px-4">
          Um Dashboard completo para gestão de equipes onde você pode visualizar e gerenciar
          todos os colaboradores de forma eficiente e prática.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full sm:w-auto px-4 sm:px-0">
          <Button className="bg-purple-600 hover:bg-purple-700 border-purple-700 text-white h-11 sm:h-12 w-full sm:w-auto">
            <Link 
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 w-full"
              href="/Formulario"
            >
              Começar
            </Link>
          </Button>
          <Button className="h-11 sm:h-12 w-full sm:w-auto" variant="outline">
            <Link 
              className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 w-full"
              href="/List"
            >
              Ver desenvolvedores
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 w-full max-w-6xl px-4">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-600/50 transition-colors">
            <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
              <CardTitle className="text-lg sm:text-xl text-white text-left">Gestão de Equipe</CardTitle>
              <CardDescription className="text-zinc-400 text-sm sm:text-base text-left">
                Organize e gerencie todos os desenvolvedores da sua empresa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-600/50 transition-colors">
            <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <FileCode className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
              <CardTitle className="text-lg sm:text-xl text-white text-left">Perfis Completos</CardTitle>
              <CardDescription className="text-zinc-400 text-sm sm:text-base text-left">
                Armazene currículos, GitHub e informações importantes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-purple-600/50 transition-colors">
            <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" />
              <CardTitle className="text-lg sm:text-xl text-white text-left">Interface Moderna</CardTitle>
              <CardDescription className="text-zinc-400 text-sm sm:text-base text-left">
                Dashboard intuitivo e fácil de usar para toda a equipe
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}