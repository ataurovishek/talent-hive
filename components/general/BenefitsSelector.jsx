import { benefits } from "@/app/utils/ListOfBenefits";
import { Badge } from "../ui/badge";

export function BenefitsSelector({ field }) {

    function benefitToggle(benefitId) {
        const currentBenefits = field.value || [];
        const newBenefits = currentBenefits.includes(benefitId) ? currentBenefits.filter((id) => id !== benefitId) : [...currentBenefits, benefitId]

        // below the (field.onChange) is a function which sends the inputs's value to the library

        field.onChange(newBenefits)
    }

    return (
        <div>
            <div className="flex flex-wrap gap-3">
                {
                    benefits.map((benefit) => {
                        const isSelected = (field.value || []).includes(benefit.id)
                        return (
                            <Badge key={benefit.id} onClick={() => benefitToggle(benefit.id)} variant={isSelected ? 'default' : 'outline'} className="cursor-pointer transition-all hover:scale-105 active:scale-95 text-sm px-4 py-1.5 rounded-full">
                                <span className="flex items-center gap-2">{benefit.icon} {benefit.label}</span>
                            </Badge>
                        )
                    })}


                <div className="mt-4 text-sm text-muted-foreground">
                    Selected benefits : <span className="text-primary">{(field.value || []).length}</span>
                </div>


            </div>
        </div>

    )
}