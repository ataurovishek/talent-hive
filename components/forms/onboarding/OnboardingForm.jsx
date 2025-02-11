"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { UserTypeForm } from "./UserTypeForm";
import { CompanyForm } from "./CompanyForm";
import { JobSeekerForm } from "./JobSeekerForm";

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);

  function handleUserTypeSelection(type) {
    setUserType(type);
    setStep(2);
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <UserTypeForm onSelect={handleUserTypeSelection} />;

      case 2:
        return userType === "company" ? <CompanyForm /> : <JobSeekerForm />

      default:
        return null;
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-10">
        <Image src={Logo} alt="talent-hive logo" width={50} height={50} />
        <h1 className="text-5xl font-bold">
          Talent<span className="text-primary">Hive</span>
        </h1>
      </div>

      <Card className="max-w-lg w-full py-5">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}
