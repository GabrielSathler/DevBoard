import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-center mb-60">
        <h1 className="text-4xl font-bold">
          O sistema para organizar funcionários de tecnologia
        </h1>
        <p className="mt-4 text-lg">
          Um Dashboard completo para gestão de equipes onde você pode visualizar e gerenciar<br />
          todos os colaboradores de forma eficiente e prática.
        </p>
        <span>
          <Button className="mt-4" variant="outline">Começar</Button>
        </span>
      </div>
    </div>
  );
}
