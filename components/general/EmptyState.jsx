import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function EmptyState({buttonText,description ,href,title}) {
    return (
        <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 border-green-500">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <Ban className="size-10 text-primary" />
            </div>
            <h2 className="mt-6 text-xl font-semibold">{title}</h2>
            <p className="mb-8 text-center text-sm leading-tight text-muted-foreground">{description}</p>

            <Link href={href} className={buttonVariants()} >
                <PlusCircle />{buttonText}
            </Link>
        </div>
    )
}