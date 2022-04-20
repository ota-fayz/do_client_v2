export interface Label {
    ru: string
    en: string
}

export interface StaticField {
    field_name: string
    type: string
    label: Label
}

export interface JsonPattern {
    id: string
    type: string
    label: string
}

export interface OnePattern {
    id: number
    static_fields: StaticField[]
    json_pattern: JsonPattern[]
    public_id: string
    name: string
    doc_type: string
    language: string
}
