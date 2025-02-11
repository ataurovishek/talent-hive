import { OnboardingForm } from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "../utils/db";
import { redirect } from "next/navigation";
import { requireUser } from "../utils/requireUser";


//checkIHFOnboarding== this line meaning this checkIfUserHasFinishedOnboarding
async function checkIHFOnboarding(userId) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            onboardingCompleted: true
        }
    })

    if (user?.onboardingCompleted === true) {
        return redirect("/")
    }
    return user
}

export default async function onboardingPage() {
   const session = await requireUser()
    await checkIHFOnboarding(session.id)


    return (

        <div className="min-h-screen  flex flex-col items-center justify-center py-10 ">
            <OnboardingForm />
        </div>
    )
}