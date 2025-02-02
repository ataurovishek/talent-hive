import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { LoginForm } from "@/components/forms/LoginForm";
export default function Login() {

    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <div className="flex items-center w-full max-w-md flex-col gap-6">
                <Link href='/' className="flex items-center gap-2">
                    <Image src={logo} alt="icon of the website" width={40} height={40} />
                    <h1 className="text-2xl font-bold ">Talent-Hive</h1>
                </Link>
                <LoginForm />
            </div>
        </div>
    )

}