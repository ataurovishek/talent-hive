
import { requireUser } from "@/app/utils/requireUser";
import { EmptyState } from "@/components/general/EmptyState";
import JobCard from "@/components/general/JobCard";

const { prisma } = require("@/app/utils/db");

async function getFavourites(userId) {
    const data = await prisma.savedJobPost.findMany({
        where: {
            userId: userId,
        },
        select: {
            JobPost: {
                select: {
                    id: true,
                    jobTitle: true,
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
                }
            }
        }
    })
    return data
}

export default async function FavouritePage() {
    const session = await requireUser();
    const data = await getFavourites(session?.id);

    if (data.length === 0) {
        return <EmptyState title={'no favourite found'} description={'You dont have any favourite yet'} buttonText={'Find a job'} href={"/"} />
    }

    return (
        <div className="grid grid-cols-1 mt-5 gap-4">
            {data.map((favourite) => (
                <JobCard key={favourite.JobPost.id} job={favourite.JobPost} />
            ))}
        </div>
    )
}

