"use server";

import { requireUser } from "./utils/requireUser";

import { companySchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function createCompany(data) {
    const session = await requireUser();

 
    const validateData = companySchema.parse(data)

    await prisma.user.update({
        where: {
            id: session.id
        },
        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: {
                create: {
                    ...validateData
                }
            }
        }
    })

    return redirect('/')
}