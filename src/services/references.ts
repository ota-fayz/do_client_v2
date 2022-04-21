import {
    BaseQueryFn,
    fetchBaseQuery,
    createApi,
    FetchArgs
} from "@reduxjs/toolkit/query/react"
import { apiUrl } from "@/http"
import { CreateResponsePattern } from "@/interfaces/createReference"

export const references = createApi({
    reducerPath: "references",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        CreateResponsePattern,
        {}
    >,
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
