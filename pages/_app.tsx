import Head from "next/head"
import type { AppProps } from "next/app"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline, GlobalStyles } from "@mui/material"
import Layout from "@/components/layout"
import "@/styles/globals.css"
import theme from "@/theme"

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
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default MyApp
