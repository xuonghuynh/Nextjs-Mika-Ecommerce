export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
};

export function formatServerDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};

export function calculateDiscountPercentage(
    originalPrice: number,
    salePrice: number,
) {
    const percentageDiscount =
        ((originalPrice - salePrice) / originalPrice) * 100;
    return percentageDiscount;
}
