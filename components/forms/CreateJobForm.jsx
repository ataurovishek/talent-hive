"use client"

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/app/utils/zodSchemas";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectLabel, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../ui/select";
import { countryList } from "@/app/utils/countriesList";
import { SalaryRangeSelector } from "../general/SalaryRangeSelector";
import { JobDescriptionEditor } from "../textEditor.jsx/jobDescEditor";
import { BenefitsSelector } from "../general/BenefitsSelector";
import { Textarea } from "../ui/textarea";


export function CreateJobForm() {

    const form = useForm({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            benefits: [],
            companyName: "",
            companyAbout: "",
            companyLocation: "",
            companyLogo: "",
            companyWebsite: "",
            employmentType: "",
            companyXAccount: "",
            jobDescription: "",
            jobTitle: "",
            listingDuration: 30,
            location: "",
            salaryFrom: 0,
            salaryTo: 0
        }
    })


    return (
        <Form {...form}>
            <form className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Job Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                name="employmentType"
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
                                    <SalaryRangeSelector control={form.control} minSalary={1} maxSalary={1000000} currency={"USD"} step={2000} />
                                </FormControl>
                            </FormItem>
                        </div>
                        <FormField

                            control={form.control}
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
                            control={form.control}
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
                    <CardContent>
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
                            <FormField
                                control={form.control}
                                name="companyAbout"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company Descriptio</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Say something about your company" {...field} className="min-h-[120px]" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>

            </form>
        </Form>
    )
}