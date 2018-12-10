export function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' }).format(parseFloat(value).toFixed(2));
}