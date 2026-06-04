export function formatNumber(value: number) {
    return new Intl.NumberFormat('tr-TR').format(value)
}

export function formatDateTime(value: string | null | undefined) {
    if (!value) {
        return '-'
    }

    return new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value))
}

export function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    if (minutes <= 0) {
        return `${remainingSeconds}s`
    }

    return `${minutes}m ${remainingSeconds}s`
}