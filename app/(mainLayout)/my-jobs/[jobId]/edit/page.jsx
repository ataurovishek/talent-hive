import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser"
import { EditJobForm } from "@/components/forms/EditJobForm"
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

export default async function PageEdit({ params }) {
    const { jobId } = await params;
    const user = await requireUser();
    const data = await getData(jobId, user.id)
    return (
        <EditJobForm jobPost={data} />
    )
}