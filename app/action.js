"use server";

import { requireUser } from "./utils/requireUser";

import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
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

export async function createJob(data) {
    const user = await requireUser();

    const req = await request();

    const decision = await ajt.protect(req)

    if (decision.isDenied()) {
        throw new Error("Forbidden")
    }

    const validateData = jobSchema.parse(data)

    const company = await prisma.company.findUnique({
        where: {
            userId: user.id
        },
        select: {
            id: true
        }
    })

    if (!company?.id) {
        return redirect("/")
    }

    await prisma.jobPost.create({
        data: {
            jobDescription:validateData.jobDescription,
            jobTitle:validateData.jobTitle,
            employmentType:validateData.employmentType,
            location:validateData.location,
            salaryFrom:validateData.salaryFrom,
            salaryTo:validateData.salaryTo,
            listingDuration:validateData.listingDuration,
            benefits:validateData.benefits,
            companyId:company.id
        }

    })

    return redirect("/")

}