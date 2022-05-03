import type { NextPage } from "next"
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    Container,
    TextField,
    FormControl,
    InputLabel,
    Select,
    SelectChangeEvent,
    MenuItem
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useGetPatternsQuery } from "@/services/patterns"
import React, { useState, ChangeEvent } from "react"
import { getFlagByLang } from "@/helpers/getFlagByLang"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import Link from "next/link"
import { capitalizeFirstLetter } from "@/helpers"

const Home: NextPage = () => {
    const [page, setPage] = useState<number>(1)
    const [language, setLanguage] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [name, setName] = useState<string>("")
    const {
        data: patterns,
        isLoading,
        isFetching,
        error
    } = useGetPatternsQuery({
        page,
        language,
        doc_type: type,
        search_word: name
    })

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string)
        setPage(1)
    }

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string)
        setPage(1)
    }

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value as string)
        setPage(1)
    }

    if (error) return <h1>Something bad happened, try later</h1>

    if (isLoading) return <h1>Loading</h1>

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
            <Container sx={{ pb: 6 }} maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            value={name}
                            onChange={handleChangeName}
                            fullWidth
                            label="Name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Language</InputLabel>
                            <Select
                                value={language}
                                label="Language"
                                onChange={handleChangeLanguage}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="en">🇺🇸</MenuItem>
                                <MenuItem value="ru">🇷🇺</MenuItem>
                                <MenuItem value="uz">🇺🇿</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={type}
                                label="Type"
                                onChange={handleChangeType}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="reference">Reference</MenuItem>
                                <MenuItem value="application">
                                    Application
                                </MenuItem>
                                <MenuItem value="id">Id</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="md" component="main">
                {patterns?.results.length === 0 ? (
                    <h1>No Patterns</h1>
                ) : (
                    <Grid container spacing={5} alignItems="flex-end">
                        {patterns?.results.map((pattern) => (
                            <Grid item key={pattern.id} xs={12} sm={4} md={4}>
                                <Card>
                                    <CardHeader
                                        title={capitalizeFirstLetter(
                                            pattern.doc_type
                                        )}
                                        titleTypographyProps={{
                                            align: "center",
                                            fontWeight: "600"
                                        }}
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.grey[700]
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
                                                variant="h5"
                                                color="text.primary"
                                                noWrap
                                            >
                                                {capitalizeFirstLetter(
                                                    pattern.name
                                                )}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "baseline"
                                            }}
                                        >
                                            <Typography
                                                component="h2"
                                                variant="h5"
                                                color="text.primary"
                                            >
                                                {getFlagByLang(
                                                    pattern.language
                                                )}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions>
                                        <Link
                                            href={`/patterns/${pattern.id}`}
                                            passHref
                                        >
                                            <Button
                                                fullWidth
                                                variant="contained"
                                            >
                                                Get started
                                            </Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
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

export default Home
