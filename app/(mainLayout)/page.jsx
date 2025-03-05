import JobFilter from "@/components/general/Jobfilter";
import { JobListingLoading } from "@/components/general/JobListingLoading";
import JobListings from "@/components/general/JobListings";
import { Suspense } from "react";


export default async function Home({searchParams}){

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />


      <div className="col-span-2 flex flex-col gap-6 border-none">
        <Suspense fallback={<JobListingLoading/>} key={currentPage}>
          <JobListings currentpage={currentPage}/>
        </Suspense>
      </div>
    </div>
  )
}