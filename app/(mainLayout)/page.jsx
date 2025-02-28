import JobFilter from "@/components/general/Jobfilter";
import JobListings from "@/components/general/JobListings";
import { Card } from "@/components/ui/card";


export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />


      <Card className="col-span-2 flex flex-col gap-6 border-none">
        <JobListings />
      </Card>
    </div>
  )
}