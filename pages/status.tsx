import React, { ChangeEvent, useState } from "react"
import {
    Box,
    Chip,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    SelectChangeEvent
} from "@mui/material"
import {
    capitalizeFirstLetter,
    getStatusOfReference,
    formatDateWithTime
} from "@/helpers"
import LoadingButton from "@mui/lab/LoadingButton"
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { useGetReferencesQuery } from "@/services"

const Status = () => {
    const [page, setPage] = useState<number>(1)
    const [status, setStatus] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [word, setWord] = useState<string>("")
    const { data: references, isFetching } = useGetReferencesQuery({
        page,
        status,
        doc_type: type,
        search_word: word
    })

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value)
        setPage(1)
    }

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string)
        setPage(1)
    }

    const handleChangeWord = (event: ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value as string)
        setPage(1)
    }

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
                    Find your reference
                </Typography>
            </Container>
            <Container sx={{ pb: 6 }} maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            value={word}
                            onChange={handleChangeWord}
                            fullWidth
                            label="Name, Surname or Id"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={handleChangeStatus}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value={0}>Awaiting</MenuItem>
                                <MenuItem value={1}>Ready</MenuItem>
                                <MenuItem value={2}>Canceled</MenuItem>
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
                {references?.results.length === 0 ? (
                    <h1>No References</h1>
                ) : (
                    <Grid container spacing={5} alignItems="flex-end">
                        {references?.results.map((reference) => (
                            <Grid item key={reference.id} xs={12} sm={4} md={4}>
                                <Card>
                                    <CardHeader
                                        title={capitalizeFirstLetter(
                                            reference.type
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
                                        <Box sx={{ mb: 2 }}>
                                            <Typography
                                                variant="h5"
                                                color="text.primary"
                                                align="center"
                                                noWrap
                                            >
                                                {capitalizeFirstLetter(
                                                    reference.pattern_name
                                                )}
                                                {/*{cutOffStrings(*/}
                                                {/*    reference.pattern_name*/}
                                                {/*)}*/}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1">
                                                {capitalizeFirstLetter(
                                                    reference.first_name
                                                )}{" "}
                                                {capitalizeFirstLetter(
                                                    reference.last_name
                                                )}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex"
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    ID:
                                                </Typography>
                                                &nbsp;
                                                <Typography>
                                                    {reference.identity_string.toLowerCase()}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="subtitle1"
                                                color="primary"
                                            >
                                                Status:{" "}
                                                <Chip
                                                    label={
                                                        getStatusOfReference(
                                                            reference.status
                                                        ).label
                                                    }
                                                    color={
                                                        getStatusOfReference(
                                                            reference.status
                                                        ).color
                                                    }
                                                    variant="filled"
                                                />
                                            </Typography>
                                            <Typography
                                                align="center"
                                                color="text.icon"
                                                sx={{ mt: 2, fontSize: "12px" }}
                                            >
                                                {formatDateWithTime(
                                                    reference.date_created
                                                )}
                                            </Typography>
                                        </Box>
                                    </CardContent>
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
                        disabled={page === references?.total_pages}
                        onClick={() => setPage(page + 1)}
                    >
                        <ArrowForwardIos />
                    </LoadingButton>
                    {page} / {references?.total_pages}
                </Grid>
            </Container>
        </>
    )
}

export default Status
