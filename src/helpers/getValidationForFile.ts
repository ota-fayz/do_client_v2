export const getValidationForFile = (type: string): string => {
    if (type === "file") {
        return ".doc, .docx, .pdf"
    } else if (type === "image") {
        return ".png, .jpg, .jpeg"
    }
    return ""
}
