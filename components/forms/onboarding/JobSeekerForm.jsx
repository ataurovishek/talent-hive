"use client"

import { jobSeekerSchema } from "@/app/utils/zodSchemas";
import { UploadDropzone } from "@/components/general/UploadThingReExported";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import pdf from '@/public/pdf.png'
import { createJobSeeker } from "@/app/action";

export function JobSeekerForm() {


    const form = useForm({
        resolver: zodResolver(jobSeekerSchema),
        defaultValues: {
            name: '',
            about: '',
            resume: ''
        }
    })
    const [pending, setPending] = useState(false)
    async function onSubmit(data) {
        try {
            setPending(true)

            await createJobSeeker(data)
        } catch (error) {
            if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
                console.log("Something went wrong", error);
            }
        } finally {
            setPending(false)
        }
    }

    return (

        <Form {...form} >
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField

                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your Full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField

                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Short Bio</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about yourself..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Resume (PDF)</FormLabel>
                            <FormControl>
                                <div>
                                    {field.value && field.value !== '' ? (
                                        <div className="relative w-fit">
                                            <Image
                                                src={pdf}
                                                alt="Resume"
                                                width={100}
                                                height={100}
                                                className="rounded-lgf"
                                            />
                                            <Button className="absolute -top-2 -right-2" type="button" variant="destructive" onClick={() => field.onChange("")}>
                                                <XIcon className="size-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <UploadDropzone

                                            endpoint="resumeUploader"

                                            onClientUploadComplete={(res) => {
                                                field.onChange(res[0].url)
                                            }}

                                            onUploadError={(e) => {
                                                console.log("something went wrong", e);

                                            }}
                                            className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"

                                        />
                                    )}

                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? 'Submitting...' : 'Continue'}
                </Button>
            </form>
        </Form>
    )
}