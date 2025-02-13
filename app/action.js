"use server";

import { requireUser } from "./utils/requireUser";

import { companySchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";

const ajt = arcjet.withRule(
    shield({
        mode: 'LIVE',
    })
).withRule(
    detectBot({
        mode: "LIVE",
        allow: [],
    })
)

export async function createCompany(data) {
    const session = await requireUser();

    // arcjet system 

    const req = await request();

    const decision = await ajt.protect(req)

    if (decision.isDenied()) {
        throw new Error("Forbidden")
    }
    // arcjet system 
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

export async function createJobSeeker(data) {
    const session = await requireUser()

    // arcjet system 
    const req = await request();

    const decision = await ajt.protect(req);

    if (decision.isDenied()) {
        throw new Error('Forbidden')
    }
    // arcjet system 

    const validateData = jobSeekerSchema.parse(data);


    await prisma.user.update({
        where: {
            id: session.id
        },
        data: {
            onboardingCompleted: true,
            userType: 'JOB_SEEKER',
            JobSeeker: {
                create: {
                    ...validateData
                }
            }
        }
    })

    return redirect('/')
}
