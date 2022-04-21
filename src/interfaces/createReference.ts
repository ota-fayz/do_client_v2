export interface StaticFields {
    field_name?: string
    value: string
}

export interface DynamicFields {
    id?: string
    value: number | string | Date
}

export interface CreateReference {
    [id: number]: File | undefined
    pattern_id: number
    static_fields: StaticFields[]
    reference_json: DynamicFields[]
}

export interface CreateResponsePattern {
    data: {
        plain_message?: string[]
        code?: number
    }
    status: number
}
