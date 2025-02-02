"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export function GeneralSubmitButton({ text, variant, width, icon }) {

    const { pending } = useFormStatus()

    return (
        <Button variant={variant} className={width} disabled={pending}>
            {
                pending ? (
                    <>
                        <Loader2 className="animate-spin" />
                        <span>Submitting</span>
                    </>
                ) : (
                    <>
                        {icon && <div>{icon}</div>}
                        <span>{text}</span>
                    </>
                )
            }
        </Button>
    )
}