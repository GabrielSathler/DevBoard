"use server";
import { usuarios } from "@/db/schema/schema";
import { db } from "@/db/client";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const formAction = async (formData: FormData) => {
    const username = formData.get("firstName")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const github_username = formData.get("github_username")?.toString() || "";
    const curriculun = formData.get("curriculun")?.toString() || "";
    const created_at = new Date();

    try {
        const [created] = await db
            .insert(usuarios)
            .values({ username, email, github_username, created_at, curriculun })
            .returning();

        revalidatePath('/')
        return created
    } catch (error) {
        throw new Error("Erro ao criar usuário");
    }
    
};

export const formActionModal = async(formData: FormData) => {
    const github_username = formData.get("github_username")?.toString();
    const username = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";

    if (!github_username) {
        throw new Error("GitHub username é obrigatório");
    }

    if (!username || !email) {
        throw new Error("Nome e email são obrigatórios");
    }

    try {
        const [edited] = await db
            .update(usuarios)
            .set({ username, email })
            .where(eq(usuarios.github_username, github_username))
            .returning();

        if (!edited) {
            throw new Error("Usuário não encontrado");
        }
        revalidatePath("/List")
        return edited;
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        throw new Error("Erro ao atualizar usuário");
    }
}


export const formActionDelete = async(formData: FormData) => {
    const github_username = formData.get("github_username")?.toString();

    if (!github_username) {
        throw new Error("GitHub username é obrigatório");
    }

    try {
        const [deleted] = await db
            .delete(usuarios)
            .where(eq(usuarios.github_username, github_username))
            .returning();

        if (!deleted) {
            throw new Error("Usuário não encontrado");
        }
        revalidatePath("/List")
        return deleted;
    } catch (error) {
        console.error("Erro ao deleter:", error);
        throw new Error("Erro ao deletar usuário");
    }
}