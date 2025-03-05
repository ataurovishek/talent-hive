import { prisma } from "@/app/utils/db"
import { EmptyState } from "./EmptyState"
import JobCard from "./JobCard"
import MainPagination from "./MainPagination"
import { JobPostStatus } from "@prisma/client";



async function getData({ page = 1, pageSize = 2, jobTypes = [], location="" }) {
    const skip = (page - 1) * pageSize;
    const where = {
        status: JobPostStatus.ACTIVE,
        ...(jobTypes.length > 0 && { employmentType: { in: jobTypes } }),
        ...(location && location !=='worldwide' && { location: location })
    }

    const [data, count] = await Promise.all([

        prisma.jobPost.findMany({
            where: where,
            take: pageSize,
            skip: skip,
            select: {
                jobTitle: true,
                id: true,
                salaryFrom: true,
                salaryTo: true,
                employmentType: true,
                location: true,
                createdAt: true,
                Company: {
                    select: {
                        name: true,
                        logo: true,
                        location: true,
                        about: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        }),

        prisma.jobPost.count({
            where: {
                status: "ACTIVE"
            }
        })
    ])

    return {
        jobs: data,
        totalpages: Math.ceil(count / pageSize)
    }
}

export default async function JobListings({ currentpage, jobTypes,location }) {

    const { jobs, totalpages } = await getData({ page: currentpage, pageSize: 2, jobTypes: jobTypes,location: location })

    return (
        <>
            {
                jobs.length > 0 ? (
                    <h1 className="flex flex-col gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </h1>
                ) : (
                    <EmptyState
                        title="No Jobs found"
                        description="Try searching for a different job title or location"
                        buttonText="Clear all filters"
                        href="/"
                    />
                )}

            <div className="flex justify-center mt-6">
                <MainPagination totalpages={totalpages} currentpage={currentpage} />
            </div>
        </>
    )
}