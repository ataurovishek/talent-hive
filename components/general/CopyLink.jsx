"use client";

import { Link2 } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

export function CopyLinkMenuItem({jobUrl}) {

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(jobUrl);
            toast.success("Copied to clipboard")
        } catch (error) {
            console.error("Failed to copy: ", error)
            toast.error("Failed to copy")
        }
    }

    return (
        <DropdownMenuItem onSelect={handleCopy}>
            <Link2 className="size-4" />
            <span>Copy Job URL</span>
        </DropdownMenuItem>
    )
}