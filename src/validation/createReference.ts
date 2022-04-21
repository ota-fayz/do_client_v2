import * as yup from "yup"

export const schemaCreateReference = yup.object().shape({
    static_fields: yup.array().of(
        yup.object().shape({
            value: yup.string().required()
        })
    ),
    reference_json: yup.array().of(
        yup.object().shape({
            value: yup.string().required()
        })
    )
})
