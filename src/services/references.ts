import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { apiUrl } from "@/http"

export const references = createApi({
    reducerPath: "references",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["References"],
    endpoints: (builder) => ({
        createReferences: builder.mutation<FormData, FormData>({
            query: (reference) => ({
                url: "reference/",
                method: "POST",
                body: reference
            })
        })
    })
})

export const { useCreateReferencesMutation } = references
