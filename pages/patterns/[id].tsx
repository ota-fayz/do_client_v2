import React, { ChangeEvent } from "react"
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    IconButton
} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { useRouter } from "next/router"
import { useGetPatternQuery } from "@/services/patterns"
import { useCreateReferencesMutation } from "@/services/references"
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter"
import { getFlagByLang } from "@/helpers/getFlagByLang"
import { getTypeOfReference } from "@/helpers/getTypeOfReference"
import { CreateReference } from "@/interfaces/createReference"
import { getValidationForFile } from "@/helpers/getValidationForFile"
import { InputNone } from "@/components/inputeNone"

const checkTargetFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    return e.target.files[0]
}

function Pattern() {
    const {
        query: { id }
    } = useRouter()
    const { data: pattern, isLoading, error } = useGetPatternQuery(id as string)
    const [
        createReferences,
        { error: createError, isLoading: isCreateLoading }
    ] = useCreateReferencesMutation()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<CreateReference>()

    const onSubmit = async (data: CreateReference) => {
        data.pattern_id = parseInt(id as string)
        data.static_fields.map(
            (field, index) =>
                (field.field_name = pattern?.static_fields[index].field_name)
        )
        data.reference_json.map(
            (field, index) => (field.id = pattern?.json_pattern[index].id)
        )

        const fData = new FormData()

        for (const key in data) {
            if (key === "static_fields" || key === "reference_json") {
                fData.append(key, JSON.stringify(data[key]))
            } else {
                fData.append(key, data[key] as Blob)
            }
        }

        await createReferences(fData)
    }

    if (isLoading) return <h1>Loading</h1>

    if (error) return <h1>This template does not exist</h1>

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography component="h1" variant="h5">
                    {capitalizeFirstLetter(pattern?.doc_type)}&nbsp;
                    {capitalizeFirstLetter(pattern?.name)}&nbsp;
                    {getFlagByLang(pattern?.language)}
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2}>
                        {pattern?.static_fields.map((field, index) => (
                            <Grid key={field.field_name} item xs={12} sm={4}>
                                <TextField
                                    // error
                                    // helperText="Kutok"
                                    required
                                    fullWidth
                                    label={field.label.en}
                                    {...register(
                                        `static_fields.${index}.value`
                                    )}
                                />
                            </Grid>
                        ))}
                        {pattern?.json_pattern.map((field, index) =>
                            getTypeOfReference(field.type) !== "file" ? (
                                <Grid key={field.id} item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label={field.label}
                                        type={getTypeOfReference(field.type)}
                                        {...register(
                                            `reference_json.${index}.value`
                                        )}
                                    />
                                </Grid>
                            ) : (
                                <Grid key={field.id} item xs={12}>
                                    <label>
                                        <InputNone
                                            type="file"
                                            accept={getValidationForFile(
                                                field.type
                                            )}
                                            onChange={(e) =>
                                                setValue(
                                                    field.id as any,
                                                    checkTargetFiles(e)
                                                )
                                            }
                                        />
                                        {field.label}&nbsp;({field.type})&nbsp;
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                        >
                                            <PhotoCamera />
                                        </IconButton>
                                        &nbsp;
                                        {typeof watch(field.id as any) ===
                                        "object"
                                            ? watch(field.id as any)?.name
                                            : "❌"}
                                    </label>
                                </Grid>
                            )
                        )}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Pattern
