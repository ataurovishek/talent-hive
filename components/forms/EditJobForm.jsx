"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { XIcon } from "lucide-react"
import { UploadDropzone } from "@components/general/UploadThingReExported.js"
import Image from "next/image"
import { countryList } from "@/app/utils/countriesList"
import { JobDescriptionEditor } from "../textEditor.jsx/jobDescEditor"
import { BenefitsSelector } from "../general/BenefitsSelector"
import { SalaryRangeSelector } from "../general/SalaryRangeSelector"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { jobSchema } from "@/app/utils/zodSchemas"
import { useState } from "react"
import { editJobPost } from "@/app/action";


export function EditJobForm({ jobPost }) {

    const form = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            benefits: jobPost.benefits,
            companyName: jobPost.Company.name,
            companyAbout: jobPost.Company.about,
            companyLocation: jobPost.Company.location,
            companyLogo: jobPost.Company.logo,
            companyWebsite: jobPost.Company.website,
            companyXAccount: jobPost.Company.xAccount || "",
            employmentType: jobPost.employmentType,
            jobDescription: jobPost.jobDescription,
            jobTitle: jobPost.jobTitle,
            location: jobPost.location,
            salaryFrom: jobPost.salaryFrom,
            salaryTo: jobPost.salaryTo
        }
    })

    const [pending, setPending] = useState(false)

    async function onSubmit(values) {
        try {
            setPending(true);
            await editJobPost(values, jobPost.id);
        } catch (error) {
            if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
                console.log("something went wrong", error);
            }
        } finally {
            setPending(false);
        }
    }
    return (
        <Form {...form}>
            <form className="col-span-1 lg:col-span-2 flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Job Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Job title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <FormField
                                control={form.control}
                                name="employmentType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Employment Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Employment Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Employment Type</SelectLabel>
                                                    <SelectItem value="full-time">Full Time</SelectItem>
                                                    <SelectItem value="part-time">Part Time</SelectItem>
                                                    <SelectItem value="contract">Contract</SelectItem>
                                                    <SelectItem value="internship">Internship</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job location</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>worldwide</SelectLabel>
                                                    <SelectItem value="worldwide">
                                                        <span>🌏</span>
                                                        <span className="pl-2">Worldwide / Remote</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Location</SelectLabel>
                                                    {
                                                        countryList.map((country) => (
                                                            <SelectItem key={country.code} value={country.name}>
                                                                <span>{country.flagEmoji}</span>
                                                                <span className="pl-2">{country.name}</span>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <FormItem>
                                <FormLabel>Salary Range</FormLabel>
                                <FormControl>
                                    <SalaryRangeSelector control={form.control} minSalary={1} maxSalary={1000000} step={2000} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
                        <FormField

                            control={Form.control}
                            name="jobDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <FormControl>
                                        <JobDescriptionEditor field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={Form.control}
                            name="benefits"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Benefits</FormLabel>
                                    <FormControl>
                                        <BenefitsSelector field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company name..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="companyLocation"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Location</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Location" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>worldwide</SelectLabel>
                                                    <SelectItem value="worldwide">
                                                        <span>🌏</span>
                                                        <span className="pl-2">Worldwide / Remote</span>
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel>Location</SelectLabel>
                                                    {
                                                        countryList.map((country) => (
                                                            <SelectItem key={country.code} value={country.name}>
                                                                <span>{country.flagEmoji}</span>
                                                                <span>{country.name}</span>
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="companyWebsite"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Website</FormLabel>
                                        <FormControl>
                                            {/* <Input placeholder="Company Website..." value={field.value} onChange={field.onChange} /> */}
                                            {/* below the line is the simplified line of the above line  */}
                                            <Input placeholder="Company Website..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="companyXAccount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company X Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Company X Account..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={Form.control}
                            name="companyAbout"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Descriptions</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Say something about your company" {...field} className="min-h-[120px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="companyLogo"
                            control={Form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Logo</FormLabel>
                                    <FormControl>
                                        {
                                            field.value && field.value !== '' ? (
                                                <div className="relative w-fit">
                                                    <Image
                                                        src={field.value}
                                                        alt="company logo"
                                                        width={80}
                                                        height={80}

                                                    />
                                                    <Button

                                                        className="absolute -top-2 -right-2"
                                                        type="button"
                                                        variant="destructive"
                                                        onClick={() => field.onChange("")}
                                                    >
                                                        <XIcon className="size-4" />
                                                    </Button>
                                                </div>

                                            ) : (
                                                <UploadDropzone endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => field.onChange(res[0].url)}
                                                    onUploadError={(e) => console.log("something went wrong", e)
                                                    }
                                                    className="border-primary cursor-pointer"
                                                />
                                            )
                                        }

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                    </CardContent>
                </Card>
                <Button type="submit" className="w-full" disabled={pending}
                >
                    {pending ? "Submitting" : "Edit Job Post"}
                </Button>
            </form>
        </Form>
    )
}