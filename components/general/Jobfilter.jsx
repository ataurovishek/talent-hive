"use client";

import { XIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { countryList } from "@/app/utils/countriesList"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react";


const jobTypes = ["full-time", "part-time", "contract", "internship"]


export default function JobFilter() {

    const router = useRouter();

    // get current filter from the url 
    const currentJobTypes = useSearchParams().get("jobType")?.split(",") || [];
    function clearAllFilter() {
        router.push("/")
    }

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams();
        if (value) {
            params.set(name, value);
        }
    })

    function handleJobTypeChange(jobType, checked) {
        const current = new Set(currentJobTypes);

        if (checked) {
            current.add(jobType);
        } else {
            current.delete(jobType);
        }
        const newValue = Array.from(current).join(",")
    }
    return (
        <Card className='col-span-1 h-fit'>
            <CardHeader className="flex flex-row flex-wrap justify-between items-center">
                <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
                <Button variant="destructive" size="sm" className="h-8" onClick={clearAllFilter}>
                    <span>Clear All</span>
                    <XIcon className="size-4" />
                </Button>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Job Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {
                            jobTypes.map((job, index) => (
                                <div key={index} className="flex flex-wrap text-wrap items-center space-x-2">
                                    <Checkbox id={job} checked={currentJobTypes.includes(job)} />
                                    <Label htmlFor={job}> {job} </Label>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <Separator />

                <div>
                    <Label className="text-lg font-semibold">Location</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Worldwide</SelectLabel>
                                <SelectItem value="worldwide">
                                    <span>🌏</span>
                                    <span className="pl-2">Worldwide / Remote</span>
                                </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                                <SelectLabel>Location</SelectLabel>
                                {
                                    countryList.map((item) => (
                                        <SelectItem value={item.name} key={item.code}>
                                            <span>{item.flagEmoji}</span>
                                            <span>{item.name}</span>
                                        </SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}