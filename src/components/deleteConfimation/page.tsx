import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export function DeleteConfirmation() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    type="button"
                    className="cursor-pointer"
                    //onClick={}
                    variant={"destructive"}
                    //disabled={}
                >
                    Deletar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que quer deletar?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Isso não pode ser desfeito. Isso vai permanentemente deletar o seu
                        desenvolvedor do nosso sistema.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
