export function formatCurrency(amount){
    return new Intl.NumberFormat("en-us",{
        style:"currency",
        currency:"USD",
        maximumFractionDigits:0,

    }).format(amount)
}