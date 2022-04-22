import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { apiUrl } from "@/http"
import { OnePattern } from "@/interfaces/onePattern"
import {
    PaginationResponse,
    PatternList
} from "@/interfaces/paginationResponse"

export const patterns = createApi({
    reducerPath: "patterns",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["Patterns"],
    endpoints: (builder) => ({
        getPatterns: builder.query<
            PaginationResponse<PatternList>,
            {
                page: number
                language: string
                doc_type: string
                search_word: string
            }
        >({
            query: (arg) => {
                const { page, language, doc_type, search_word } = arg
                const page_size = 3
                let searchWord
                if (search_word.length >= 3) {
                    searchWord = search_word
                } else {
                    searchWord = ""
                }
                // TODO: Prevent make req iа length < 3
                return {
                    url: "pattern/",
                    params: {
                        page_size,
                        page,
                        language,
                        doc_type,
                        search_word: searchWord
                    }
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.results.map(({ id }) => ({
                              type: "Patterns" as const,
                              id
                          })),
                          { type: "Patterns", id: "LIST" }
                      ]
                    : [{ type: "Patterns", id: "LIST" }]
        }),
        getPattern: builder.query<OnePattern, string>({
            query: (id) => ({
                url: `/pattern/${id}/`
            })
        })
    })
})

export const { useGetPatternsQuery, useGetPatternQuery } = patterns
