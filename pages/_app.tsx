import Head from "next/head"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, GlobalStyles } from "@mui/material"
import Layout from "@/components/layout"
import "@/styles/globals.css"
import theme from "@/theme"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Dean&apos;s Office - Get your reference</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        ul: { margin: 0, padding: 0, listStyle: "none" }
                    }}
                />
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                        <ToastContainer theme="dark" />
                    </Layout>
                </Provider>
            </ThemeProvider>
        </>
    )
}

export default MyApp
