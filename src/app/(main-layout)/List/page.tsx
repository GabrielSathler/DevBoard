import { Search } from "@/components/Search/page";
import UserInformations from "./components/card_informations_viwer";
import { PaginationView } from "@/components/pagination/page";

type PageProps = {
  searchParams: Promise<{ 
    q?: string,
    page?: string 
  }>,
}

export default async function Home({ searchParams }: PageProps) {
  const { page, q: query } = searchParams ? await searchParams : { page: '1', q: '' };

  const { content, paginaAtual, nextPage } = await UserInformations({ 
    searchQuery: query,
    page 
  })

  return (
    <div>
      <div className="flex flex-col mt-10 py-10">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className=" font-bold text-3xl lg:text-4xl text-left">
            Desenvolvedores Cadastrados
          </h1>
          <span className="text-muted-foreground text-xs lg:text-sm ">
            Visualize e gerencie todos os desenvolvedores da sua equipe
          </span>
        </div>
      </div>
      
      <Search />
      
      {content}
      <PaginationView 
        paginaAtual={paginaAtual} 
        nextPage={nextPage}
      />
    </div>
  );
}