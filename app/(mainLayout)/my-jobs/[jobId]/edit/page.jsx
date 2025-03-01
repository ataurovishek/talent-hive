import { prisma } from "@/app/utils/db"
import { notFound } from "next/navigation"


async function getData(jobId, userId) {
    const data = await prisma.jobPost.findUnique({
        where: {
            id: jobId,
            Company: {
                userId: userId
            }
        },
        select: {
            benefits: true,
            id: true,
            jobTitle: true,
            jobDescription: true,
            salaryFrom: true,
            salaryTo: true,
            location: true,
            employmentType: true,
            listingDuration: true,
            Company: {
                select: {
                    about: true,
                    name: true,
                    location: true,
                    website: true,
                    xAccount: true,
                    logo: true
                }
            }
        }
    })

    if (!data) {
        return notFound()
    }
    return data
}

export default function PageEdit() {
    return (
        <h1>Hello iam from edit</h1>
    )
}