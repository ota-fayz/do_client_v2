import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { patterns } from "@/services/patterns"
import { setupListeners } from "@reduxjs/toolkit/query"
import { references } from "@/services/references"

const rootReducer = combineReducers({
    [patterns.reducerPath]: patterns.reducer,
    [references.reducerPath]: references.reducer
})

export const store = configureStore({
    // Add the generated reducer as a specific top-level slice
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            patterns.middleware,
            references.middleware
        ])
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` interfaces from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
