export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
    return new Intl.DateTimeFormat("en-US", options).format(date)
} 

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

export function calculateDiscountPercentage(originalPrice: number, salePrice: number) {
    const percentageDiscount = ((originalPrice - salePrice) / originalPrice) * 100;
    return percentageDiscount;
  }