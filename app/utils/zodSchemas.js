import { z } from 'zod';


export const companySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(1, "Location must be defined"),
    about: z.string().min(10, "Please provide some information about your company"),
    logo: z.string().min(1, "Please upload a logo"),
    website: z.string().url("please enter a valid url"),
    xAccount: z.string().optional()
})

export const jobSeekerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    about: z.string().min(10, "Please provide more information about yourself"),
    resume: z.string().min(1, "Please upload your resume")
})