import {
    BaseQueryFn,
    fetchBaseQuery,
    createApi,
    FetchArgs
} from "@reduxjs/toolkit/query/react"
import { apiUrl } from "@/http"
import { CreateResponsePattern } from "@/interfaces/createReference"
import {
    PaginationResponse,
    ReferenceList
} from "@/interfaces/paginationResponse"

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
        getReferences: builder.query<
            PaginationResponse<ReferenceList>,
            {
                page: number
                status: string
                search_word: string
                doc_type: string
            }
        >({
            query: (arg) => {
                const { page, status, search_word, doc_type } = arg
                const page_size = 3
                let searchWord
                if (search_word.length >= 3) {
                    searchWord = search_word
                } else {
                    searchWord = ""
                }
                // TODO: Prevent make req iа length < 3
                return {
                    url: "search/reference/",
                    params: {
                        page_size,
                        page,
                        status,
                        doc_type,
                        search_word: searchWord
                    }
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "References" as const,
                              id
                          })),
                          { type: "References", id: "LIST" }
                      ]
                    : [{ type: "References", id: "LIST" }]
        }),

        createReferences: builder.mutation<FormData, FormData>({
            query: (reference) => ({
                url: "reference/",
                method: "POST",
                body: reference
            })
        })
    })
})

export const { useCreateReferencesMutation, useGetReferencesQuery } = references
