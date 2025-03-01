"use server";

import { requireUser } from "./utils/requireUser";

import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { JobListingDurationPricing } from "./utils/JobListingPricing";
import { inngest } from "./utils/inngest/client";

const ajt = arcjet.withRule(
    shield({
        mode: 'LIVE',
    })
).withRule(
    detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
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
            id: true,
            user: {
                select: {
                    stripeCustomerId: true
                }
            }
        }
    })

    if (!company?.id) {
        return redirect("/")
    }

    let stripeCustomerId = company.user.stripeCustomerId;

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email,
            name: user.name
        })
        stripeCustomerId = customer.id

        // update user with the customer id 

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                stripeCustomerId: customer.id
            }

        })
    }

    const jobPost = await prisma.jobPost.create({
        data: {
            jobDescription: validateData.jobDescription,
            jobTitle: validateData.jobTitle,
            employmentType: validateData.employmentType,
            location: validateData.location,
            salaryFrom: validateData.salaryFrom,
            salaryTo: validateData.salaryTo,
            listingDuration: validateData.listingDuration,
            benefits: validateData.benefits,
            companyId: company.id
        },
        select: {
            id: true
        }

    })

    const pricingTier = JobListingDurationPricing.find((tier) => tier.days === validateData.listingDuration);

    if (!pricingTier) {
        throw new Error("Invalid Listing duration selected")
    }


    await inngest.send({
        name: 'job/created',
        data: {
            jobId: jobPost.id,
            expirationDays: validateData.listingDuration
        }
    })

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: `Job Posting - ${pricingTier.days} Days`,
                        description: pricingTier.description,
                        images: [
                            "https://l57koogl1n.ufs.sh/f/lF70zFoVCrbxaSHH2hr1jTdRgySFkmGwPK7pNsVctDeZzlU4"
                        ]
                    },
                    currency: 'USD',
                    unit_amount: pricingTier.price * 100,
                },
                quantity: 1
            }
        ],
        metadata: {
            jobId: jobPost.id
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`
    })
    return redirect(session.url)

}


export async function savedJobPost(jobId) {
    const user = await requireUser();

    const req = await request();

    const decision = await ajt.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden")
    }

    await prisma.savedJobPost.create({
        data: {
            jobPostId: jobId,
            userId: user.id
        }
    })
}

export async function unSavedJobPost(savedJobPostId) {
    const user = await requireUser();

    const req = await request();

    const decision = await ajt.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden")
    }

    await prisma.savedJobPost.delete({
        where:{
            id:savedJobPostId,
            userId:user.id
        },
       
    })
}