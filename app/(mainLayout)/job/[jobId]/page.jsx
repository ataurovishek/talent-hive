import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/ListOfBenefits";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { notFound } from "next/navigation";

async function getJob(jobId) {
    const jobData = await prisma.jobPost.findUnique({
        where: {
            status: "ACTIVE",
            id: jobId
        },
        select: {
            jobTitle: true,
            jobDescription: true,
            location: true,
            benefits: true,
            createdAt: true,
            employmentType: true,
            Company: {
                select: {
                    name: true,
                    logo: true,
                    location: true,
                    about: true
                }
            }
        }
    })



    if (!jobData) {
        return notFound()
    }

    return jobData;
}

export default async function JobIdPage({ params }) {

    const { jobId } = await params;
    const data = await getJob(jobId);
    const LocationFlag = getFlagEmoji(data.location);


    return (
        <div className="grid lg:grid-cols-[1fr, 400px] gap-8">
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Marketing Manager</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="font-medium">{data.jobTitle}</p>

                            <span className="hidden md:inline text-muted-foreground">*</span>
                            <Badge className="rounded-full" variant="secondary">{data.employmentType}</Badge>

                            <span className="hidden md:inline text-muted-foreground">*</span>
                            <Badge className="rounded-full">{LocationFlag && <span className="mr-1">{LocationFlag}</span>} {data.location}</Badge>
                        </div>
                    </div>
                    <Button variant="outline">
                        <Heart className="size-4" />
                        Save Job
                    </Button>


                </div>

                <section>
                    <JsonToHtml json={JSON.parse(data.jobDescription)} />
                </section>
                <section>
                    <h3 className="font-semibold mb-4">Benefits</h3>
                    <div className="flex flex-wrap gap-3">
                        {benefits.map((benefit) => {

                            const isOffered = data.benefits.includes(benefit.id)

                            return (
                                <Badge key={benefit.id} variant={isOffered ? 'default' : 'outline'} className={cn(isOffered ? "" :"opacity-75 cursor-not-allowed","text-sm px-4 py-1.5 rounded-full")}>
                                    <span className="flex items-center gap-2">{benefit.icon} {benefit.label}</span>
                                </Badge>

                            )
                        })}

                    </div>
                </section>
            </div>

        </div>
    )
}