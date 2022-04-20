export const getTypeOfReference = (type: string | undefined): string => {
    if (type) {
        switch (type) {
            case "string":
                return "text"
            case "text":
                return "text"
            case "date":
                return "date"
            case "int":
                return "number"
            case "image":
                return "file"
            case "file":
                return "file"
            default:
                return ""
        }
    } else {
        return ""
    }
}
