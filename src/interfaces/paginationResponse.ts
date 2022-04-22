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

export interface ReferenceList {
    id: number
    pattern_name: string
    pattern_lang: string
    date_created: string
    identity_string: string
    first_name: string
    last_name: string
    status: number
    type: string
    date_closed?: any
    reference_id: number
    ref: number
}

export interface PaginationResponse<T> {
    links: Links
    count: number
    total_pages: number
    results: T[]
}
