import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Arcjet from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";
import { CreateJobForm } from "@/components/forms/CreateJobForm";

export default function PostJobPage() {

    const companies = [
        { id: 0, name: "Arcjet", logo: Arcjet },
        { id: 1, name: "Inngest", logo: InngestLogo },
        { id: 2, name: "Inngest", logo: Arcjet },
        { id: 3, name: "Inngest", logo: InngestLogo },
        { id: 4, name: "Inngest", logo: Arcjet },
        { id: 5, name: "Inngest", logo: InngestLogo }
    ]


    const testimonials = [
        {
            quote: "we found our ideal candidate within 4 hours of posting. The quality of applicants was exceptional!",
            author: 'Abbas Uddin',
            company: 'Kodion Labs'
        },
        {
            quote: "Thanks to this platform, we were able to hire the perfect fit within a single day. The talent pool exceeded our expectations!",
            author: 'Sophia Williams',
            company: 'TechCore Solutions'
        },
        {
            quote: "The response time was incredible! We had highly qualified candidates applying almost immediately, making our hiring process seamless.",
            author: 'James Thompson',
            company: 'Innovatech Systems'
        }

    ]

    const stats = [
        { id: 0, value: "10k+", label: "Monthly active job seekers" },
        { id: 1, value: "48h", label: "Average time to hire" },
        { id: 2, value: "10k+", label: "Employer satisfaction rate" },
        { id: 3, value: "10k+", label: "Companies hiring remotly" },
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            <CreateJobForm />

            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Trusted by the Industry Leaders
                        </CardTitle>
                        <CardDescription>
                            Join thousands of companies hiring top talent
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* {company logo} */}

                        <div className="grid grid-cols-3 gap-4">
                            {
                                companies.map((company) => (
                                    <div key={company.id}>
                                        <Image src={company.logo} width={80} height={80} className="rounded-lg opacity-75 transition-opacity hover:opacity-100" alt={company.name} />
                                    </div>
                                ))
                            }

                        </div>
                        <div className="space-y-4">
                            {testimonials.map((testimonial, index) => (
                                <blockquote key={index} className="border-l-2 border-primary pl-4">
                                    <p className="text-sm text-muted-foreground italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <footer className="mt-2 text-sm font-medium">
                                        - {testimonial.author}, {testimonial.company}
                                    </footer>
                                </blockquote>
                            ))}
                        </div>

                        {/* we will render stats here  */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div key={stat.id} className="rounded-lg bg-muted p-4">
                                    <h4 className="text-2xl font-bold">{stat.value}</h4>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}