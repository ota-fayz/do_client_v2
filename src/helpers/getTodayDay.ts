import { format } from "date-fns"

export const getTodayDay = () => {
    return format(new Date(), "yyyy-MM-dd")
}
