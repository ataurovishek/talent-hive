import Image from "next/image"
import Link from "next/link"
import logo from "@/public/logo.png"
import { buttonVariants } from "../ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { auth } from "@/app/utils/auth"
import { UserDropdown } from "./userDropdown"
export async function Navbar() {

    const session = await auth()
    return (
        <nav className="flex items-center justify-between py-5">

            <Link href="/" className="flex items-center gap-3">
                <Image src={logo} alt="talent hive logo" height={40} width={40} />
                <h1 className="text-3xl font-bold">
                    Talent<span className="text-primary">Hive</span>
                </h1>
            </Link>
            {/* <div className="flex items-center gap-3">
                <ThemeToggle />

                {
                    session?.user ?
                        (
                            <form action={async () => {
                                'use server'
                                await signOut({ redirectTo: '/' })
                            }}>
                                <Button>Logout</Button>
                            </form>
                        ) :

                        (<Link className={buttonVariants({ variant: 'outline' })} href='/login'>Login</Link>)}
            </div> */}

            <div className="hidden md:flex items-center gap-5">
                <ThemeToggle />
                <Link href="/post-job" className={buttonVariants({ size: "lg" })}>Post Job </Link>
                {session?.user ? (
                    <UserDropdown email={session.user.email} image={session.user.image} username={session.user.name} />
                ) : (
                    <Link href='/login' className={buttonVariants({ variant: "outline" })}>Login</Link>
                )}
            </div>
        </nav>
    )
}