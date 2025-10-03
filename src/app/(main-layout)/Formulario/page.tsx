import { FormView } from "./components/formView";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-left">
          Cadastro de Desenvolvedor
        </h1>
        <p className="mt-2 mb-6 text-sm text-muted-foreground text-left">
          Preencha as informações do desenvolvedor para adicionar ao sistema
        </p>
        <FormView />
      </div>
    </div>
  );
}
