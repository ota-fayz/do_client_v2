export const cutOffStrings = (str: string) => {
    let sliced = str.slice(0, 18)
    if (sliced.length < str.length) {
        sliced += "..."
    }
    return sliced
}
