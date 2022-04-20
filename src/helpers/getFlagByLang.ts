export const getFlagByLang = (lang: string | undefined): string => {
    if (lang) {
        switch (lang) {
            case "en":
                return "🇺🇸"
            case "ru":
                return "🇷🇺"
            case "uz":
                return "🇺🇿"
            default:
                return ""
        }
    } else {
        return ""
    }
}
