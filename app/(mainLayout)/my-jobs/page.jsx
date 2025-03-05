import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { EmptyState } from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyCheckIcon, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getJobs(userId) {
    const data = await prisma.jobPost.findMany({
        where: {
            Company: {
                userId: userId
            }
        },
        select: {
            id: true,
            jobTitle: true,
            status: true,
            createdAt: true,
            Company: {
                select: {
                    name: true,
                    logo: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return data;
}


export default async function MyJobPage() {

    const session = await requireUser();

    const data = await getJobs(session?.id);

    return (
        <>
            {data.length === 0 ? (
                <EmptyState title={'No Job posts found'} description={"You dont have any posts yet"} buttonText={'Create a job post now!'} href={"/post-job"} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>My Jobs</CardTitle>
                        <CardDescription>Manage your job listing and applications here</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created at</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>


                            <TableBody>
                                {data.map((listing) => (
                                    <TableRow key={listing.id}>
                                        <TableCell>
                                            <Image
                                                src={listing.Company.logo}
                                                alt="Logo of Company"
                                                width={40}
                                                height={40}
                                                className="rounded-sm size-10"
                                            />
                                        </TableCell>
                                        <TableCell>{listing.Company.name}</TableCell>
                                        <TableCell>{listing.jobTitle}</TableCell>
                                        <TableCell>{listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}</TableCell>
                                        <TableCell>{listing.createdAt.toLocaleDateString("en-US", {
                                            month: 'long',
                                            year: 'numeric',
                                            day: 'numeric'
                                        })}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button variant="ghost" size={3} asChild>
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='center'>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Link href={`/my-jobs/${listing.id}/edit`} className="flex items-center gap-2">

                                                            <PenBoxIcon />
                                                            Edit Job

                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`} />
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Link href={`/my-jobs/${listing.id}/delete`} className="flex items-center gap-2">

                                                            <XCircle />
                                                            Delete Job

                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </CardContent>
                </Card>
            )}
        </>
    )
}