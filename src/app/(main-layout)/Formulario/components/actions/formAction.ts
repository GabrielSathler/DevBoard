"use server";
import { usuarios } from "@/db/schema/schema";
import { db } from "@/db/client";
import { revalidatePath } from "next/cache";

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