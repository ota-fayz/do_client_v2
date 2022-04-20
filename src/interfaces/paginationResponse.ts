export interface Links {
    next: string
    previous?: any
}

export interface PatternList {
    id: number
    name: string
    public_id: string
    doc_type: string
    language: string
}

export interface PaginationResponse<T> {
    links: Links
    count: number
    total_pages: number
    results: T[]
}
