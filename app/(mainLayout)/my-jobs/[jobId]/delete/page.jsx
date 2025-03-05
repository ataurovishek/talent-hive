import { deleteJobPost } from "@/app/action";
import { requireUser } from "@/app/utils/requireUser";
import { GeneralSubmitButton } from "@/components/general/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrashIcon } from "lucide-react";
import Link from "next/link";

export default async function DeleteJob({ params }) {
    const { jobId } = await params;
    await requireUser()
    return (
        <div>
            <Card className="max-w-lg mx-auto mt-28">
                <CardHeader>
                    <CardTitle>Are you absolutely sure?</CardTitle>
                    <CardDescription>
                        This action cannot be undone.This will permanently delete the job post and all its data.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                    <Link href={"/my-jobs"} className={buttonVariants({ variant: "secondary" })}>
                        <ArrowLeft />
                        Cancel
                    </Link>

                    <form action={async () => {
                        "use server"
                        await deleteJobPost(jobId);
                    }}>
                        <GeneralSubmitButton text={'Delete Job'} variant={"destructive"} icon={<TrashIcon />} />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}