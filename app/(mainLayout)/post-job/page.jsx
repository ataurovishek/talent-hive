import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Arcjet from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";

export default function PostJobPage() {

    const companies = [
        { id: 0, name: "Arcjet", logo: Arcjet },
        { id: 1, name: "Inngest", logo: InngestLogo },
        { id: 2, name: "Inngest", logo: Arcjet },
        { id: 3, name: "Inngest", logo: InngestLogo },
        { id: 4, name: "Inngest", logo: Arcjet },
        { id: 5, name: "Inngest", logo: InngestLogo }
    ]


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Hey this is the form</CardTitle>
                </CardHeader>
            </Card>

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
                    <CardContent>
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
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}