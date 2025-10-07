import { Search } from "@/components/Search/page";
import UserInformations from "./components/card_informations_viwer";
import { PaginationView } from "@/components/pagination/page";

export default function Home() {
  return (
    <><div>
      <div className="flex flex-col mt-10 py-10">
        <div className="w-full max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-left">
            Desenvolvedores Cadastrados
          </h1>
          <span className="text-muted-foreground text-sm">
            Visualize e gerencie todos os desenvolvedores da sua equipe
          </span>

        </div>
      </div>
      <Search />
      <UserInformations />
      <PaginationView />
    </div></>
  );
}
