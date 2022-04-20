import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
    PaginationResponse,
    PatternList
} from "@/interfaces/paginationResponse"
import { apiUrl } from "@/http"
import { OnePattern } from "@/interfaces/onePattern"

export const patterns = createApi({
    reducerPath: "patterns",
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    tagTypes: ["Patterns"],
    endpoints: (builder) => ({
        getPatterns: builder.query<
            PaginationResponse<PatternList>,
            number | void
        >({
            query: (page = 1) => ({
                url: "pattern/",
                params: {
                    page: page
                }
            }),
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
