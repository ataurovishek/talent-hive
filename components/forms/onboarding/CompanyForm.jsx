import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { companySchema } from "@/app/utils/zodSchemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SelectItem } from "@radix-ui/react-select"
import { countryList } from "@/app/utils/countriesList"
import { Textarea } from "@/components/ui/textarea"

export function CompanyForm() {


    const form = useForm({
        resolver: zodResolver(companySchema),
        defaultValues: {
            location: '',
            about: '',
            name: '',
            logo: '',
            website: '',
            xAccount: ''
        }
    })

    return (
        <Form {...form}>
            <form className="space-y-6" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter company Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}


                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Location</FormLabel>
                                <Select

                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Location" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>WorldWide</SelectLabel>
                                            <SelectItem value="worldwide"><span>🌏</span><span>Worldwide / Remote</span></SelectItem>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://yourcompany.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="xAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>x (Twitter) Account</FormLabel>
                                <FormControl>
                                    <Input placeholder="@yourcompany" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>About</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us about your company..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>

    )
}