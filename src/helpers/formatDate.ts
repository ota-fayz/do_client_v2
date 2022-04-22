import { format, parseISO } from "date-fns"

export const formatDateWithTime = (stringDate: string) => {
    if (stringDate) {
        const date = parseISO(stringDate)
        return format(date, "dd/MM/yyyy H:mm")
    }
    return stringDate
}
