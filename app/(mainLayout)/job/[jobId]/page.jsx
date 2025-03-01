import { getFlagEmoji } from "@/app/utils/countriesList";
import { prisma } from "@/app/utils/db";
import { benefits } from "@/app/utils/ListOfBenefits";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request } from "@arcjet/next";
import arcjet, { fixedWindow, detectBot, tokenBucket } from "@/app/utils/arcjet";
import { Heart } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation"
import { auth } from "@/app/utils/auth";
import Link from "next/link";
import { SavedJobButton } from "@/components/general/SubmitButtons";
import { savedJobPost, unSavedJobPost } from "@/app/action";

const aj = arcjet.withRule(
    detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"]
    })
).withRule(
    fixedWindow({
        mode: 'LIVE',
        max: 10,
        window: '60s'
    })
)

function getClient(session) {
    if (session) {
        return aj.withRule(
            tokenBucket({
                // This property sets the mode of the token bucket to "LIVE". 
                // This likely indicates that the rate limiting is active and being enforced in real-time.
                mode: "LIVE",
                capacity: 100,
                interval: 60,
                refillRate: 30
            })
        )
    } else {
        return aj.withRule(
            tokenBucket({
                // This property sets the mode of the token bucket to "LIVE". 
                // This likely indicates that the rate limiting is active and being enforced in real-time.
                mode: "LIVE",
                // This property sets the maximum number of tokens that the bucket can hold
                capacity: 100,
                // This property sets the time interval, likely in seconds,
                //  for the rate-limiting logic. 
                // It could represent the period over which the refill 
                // rate is applied or the duration after which the bucket is checked for refilling.
                interval: 60,
                // his property sets the rate at which tokens are added back into the bucket. In this case, 30 tokens are added to the bucket every interval (60 seconds). 
                refillRate: 10
            })
        )
    }
}

async function getJob(jobId, userId) {

    const [jobData, savedJob] = await Promise.all([
      await  prisma.jobPost.findUnique({
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
                listingDuration: true,
                Company: {
                    select: {
                        name: true,
                        logo: true,
                        location: true,
                        about: true
                    }
                }
            }
        }),

        userId ? prisma.savedJobPost.findUnique({
            where: {
                userId_jobPostId: {
                    userId: userId,
                    jobPostId: jobId
                }
            },
            select: {
                id: true
            }
        }) : null
    ])

    if (!jobData) {
        return notFound()
    }

    return { jobData, savedJob };
}

export default async function JobIdPage({ params }) {

    const session = await auth();
    const req = await request();

    // The provided code snippet const decision = await getClient(!!session);
    //  uses a double negation (!!) operator on the session variable before passing it to the getClient function. 
    //  This is a common JavaScript idiom used to convert a value to a boolean.
    const decision = await getClient(!!session).protect(req, { requested: 10 });
    if (decision.isDenied()) {
        throw new Error('forbidden')
    }


    const { jobId } = await params;


    const { jobData: data, savedJob } = await getJob( jobId, session?.user.id);
    const LocationFlag = getFlagEmoji(data.location);


    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-8 col-span-2">
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
                    {/* <Button variant="outline">
                        <Heart className="size-4" />
                        Save Job
                    </Button> */}
                    {session?.user ? (
                        <form action={
                            savedJob ? unSavedJobPost.bind(null, savedJob.id) : savedJobPost.bind(null,jobId)
                        }>
                            <SavedJobButton savedJob={!!savedJob} />
                        </form>
                    ) : (
                        <Link href={'/login'} className={buttonVariants({ variant: "outline" })}>
                            <Heart className="size-4" />
                            Save Job
                        </Link>
                    )}


                </div>

                <section>
                    <JsonToHtml json={JSON.parse(data.jobDescription)} />
                </section>
                <section>
                    <h3 className="font-semibold mb-4">Benefits <span className="font-semibold text-sm text-muted-foreground">(blue is offered)</span></h3>
                    <div className="flex flex-wrap gap-3">
                        {benefits.map((benefit) => {

                            const isOffered = data.benefits.includes(benefit.id)

                            return (
                                <Badge key={benefit.id} variant={isOffered ? 'default' : 'outline'} className={cn(isOffered ? "" : "opacity-75 cursor-not-allowed", "text-sm px-4 py-1.5 rounded-full")}>
                                    <span className="flex items-center gap-2">{benefit.icon} {benefit.label}</span>
                                </Badge>

                            )
                        })}

                    </div>
                </section>
            </div>

            <div className="space-y-6">
                <Card className="p-6">
                    <div className="space-y-4">
                        <div>
                            <h3>Apply now</h3>

                            <p className="text-sm text-muted-foreground mt-1">
                                Please let {data.Company.name} know you found this job on Talent Hive .This helps us grow !
                            </p>
                        </div>

                        <Button className="w-full">Apply now</Button>
                    </div>
                </Card>


                <Card className="p-6">
                    <h3 className="font-semibold">About the Job</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">
                                Apply before
                            </span>

                            <span className="text-sm">
                                {new Date(data.createdAt.getTime() + data.listingDuration * 24 * 60 * 60 * 1000
                                ).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Posted on</span>


                            <span className="text-sm">{data.createdAt.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Employment Type</span>


                            <span className="text-sm">{data.employmentType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Location</span>


                            <span className="text-sm">{LocationFlag && <span className="mr-1">{LocationFlag}</span>}{data.Company.location}</span>
                        </div>

                    </div>
                </Card>

                {/* company card  */}

                <Card >
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src={data.Company.logo}
                                alt={"Company logo"}
                                width={48}
                                height={48}
                                className="rounded-full size-12"
                            />
                            <div className="flex flex-col">
                                <h3 className="font-semibold">{data.Company.name}</h3>
                                <p className="text-sm  text-muted-foreground line-clamp-3">{data.Company.about}</p>
                            </div>
                        </div>

                    </div>

                </Card>
            </div>

        </div>
    )
}