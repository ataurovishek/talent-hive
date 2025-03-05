import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request) {
    const body = await request.text();

    const headersList = await headers();

    const signature = headersList.get("Stripe-Signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch {
        return new NextResponse("webhook error", { status: 400 });

    }

    const session = event.data.object

    if (event.type === 'checkout.session.completed') {
        const customerId = session.customer;
        const jobId = session.metadata?.jobId
        console.log(jobId);

        if (!jobId) {
            return new NextResponse("No job id found", { status: 400 })
        }

        const company = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId
            },
            select: {
                Company: {
                    select: {
                        id: true
                    }
                }
            }
        })

        if (!company) {
            return new NextResponse('No company found for user', { status: 400 })
        }


        await prisma.jobPost.update({
            where: {
                id: jobId,
                companyId: company?.Company?.id
            },
            data: {
                status:"ACTIVE"
            }
        })
    }

    return new NextResponse(null, { status: 200 })

}