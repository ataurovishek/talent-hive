import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, Heart, Layers2, LogOut } from "lucide-react";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/app/utils/auth";

export function UserDropdown({ email, username, image }) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center">

                    <Avatar>
                        <AvatarImage src={image} alt="Profile Image" />

                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <ChevronDown size={16} strokeWidth={2} className="ml-2 opacity-60" />
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-5" align='center'>
                <DropdownMenuLabel className="flex flex-col ">
                    <span className="text-sm font-medium text-foreground">{username}</span>
                    <span className="text-xs w-full text-muted-foreground ">{email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/Favourite" className="flex justify-start py-2">
                            <Heart size={16} strokeWidth={2} className="opacity-16" />
                            <span className="text-sm">Favourite Jobs</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/my-jobs" className="flex justify-start py-2">
                            <Heart size={16} strokeWidth={2} className="opacity-16" />
                            <span className="text-sm">My Job Listing</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={async () => {
                        "use server";
                        await signOut({ redirectTo: "/" })
                    }}>
                        <button className="flex justify-start items-center gap-2">
                            <LogOut size={16} strokeWidth={2} className="opacity-60" />
                            <span>Logout</span>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}