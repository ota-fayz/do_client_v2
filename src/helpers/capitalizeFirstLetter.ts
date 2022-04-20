export function capitalizeFirstLetter(string: string | undefined): string {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    } else {
        return ""
    }
}
