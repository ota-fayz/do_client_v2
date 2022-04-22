const enum Color {
    WARNING = "warning",
    SUCCESS = "success",
    CANCELED = "error",
    DEFAULT = "default"
}

interface StatusType {
    label: string
    color: Color
}

export const getStatusOfReference = (status: number): StatusType => {
    switch (status) {
        case 0:
            return {
                label: "awaiting",
                color: Color.WARNING
            }
        case 1:
            return {
                label: "ready",
                color: Color.SUCCESS
            }
        case 2:
            return {
                label: "canceled",
                color: Color.CANCELED
            }
        default:
            return {
                label: "default",
                color: Color.DEFAULT
            }
    }
}
