import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    Container
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useGetPatternsQuery } from "@/services/patterns"
import { useState } from "react"
import { getFlagByLang } from "@/helpers/getFlagByLang"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import Link from "next/link"

function MainContent() {
    const [page, setPage] = useState(1)
    const { data: patterns, isLoading, isFetching } = useGetPatternsQuery(page)

    if (isLoading) return <h1>Loading</h1>

    if (patterns?.results.length === 0) return <h1>No Patterns</h1>

    return (
        <>
            <Container
                disableGutters
                maxWidth="sm"
                component="main"
                sx={{ pt: 8, pb: 6 }}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Choose a template
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {patterns?.results.map((pattern) => (
                        <Grid item key={pattern.id} xs={12} sm={4} md={4}>
                            <Card>
                                <CardHeader
                                    title={pattern.doc_type}
                                    titleTypographyProps={{ align: "center" }}
                                    subheaderTypographyProps={{
                                        align: "center"
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === "light"
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700]
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "baseline",
                                            mb: 2
                                        }}
                                    >
                                        <Typography
                                            component="h2"
                                            variant="h5"
                                            color="text.primary"
                                        >
                                            {pattern.name}
                                        </Typography>
                                        <Typography
                                            component="h2"
                                            variant="h5"
                                            color="text.primary"
                                        >
                                            &nbsp;
                                            {getFlagByLang(pattern.language)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Link
                                        href={`/patterns/${pattern.id}`}
                                        passHref
                                    >
                                        <Button fullWidth variant="contained">
                                            Get started
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mt: 2,
                        gap: 1
                    }}
                >
                    <LoadingButton
                        loading={!!isFetching}
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        <ArrowBackIos />
                    </LoadingButton>
                    <LoadingButton
                        loading={!!isFetching}
                        disabled={page === patterns?.total_pages}
                        onClick={() => setPage(page + 1)}
                    >
                        <ArrowForwardIos />
                    </LoadingButton>
                    {page} / {patterns?.total_pages}
                </Grid>
            </Container>
        </>
    )
}

export default function Main() {
    return <MainContent />
}
