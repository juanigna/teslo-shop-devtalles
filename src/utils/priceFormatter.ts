const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function formatPrice(numberToConvert: number){
    return formatter.format(numberToConvert)
}