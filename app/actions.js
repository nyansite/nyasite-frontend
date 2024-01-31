
export function TimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().substring(0, 8)
}