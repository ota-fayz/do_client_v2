import React, { ChangeEvent } from "react"
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    IconButton
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { PhotoCamera } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"
import { useGetPatternQuery, useCreateReferencesMutation } from "@/services"
import {
    capitalizeFirstLetter,
    getFlagByLang,
    getTypeOfReference,
    getValidationForFile
} from "@/helpers"
import { CreateReference } from "@/interfaces/createReference"
import { InputNone } from "@/components/inputeNone"
import { schemaCreateReference } from "@/validation/createReference"
import { toast } from "react-toastify"

const checkTargetFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    return e.target.files[0]
}

function Pattern() {
    const router = useRouter()
    const {
        query: { id }
    } = router
    const { data: pattern, isLoading, error } = useGetPatternQuery(id as string)
    const [
        createReferences,
        { error: createError, isLoading: isCreateLoading, isSuccess }
    ] = useCreateReferencesMutation()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isValid }
    } = useForm<CreateReference>({
        resolver: yupResolver(schemaCreateReference),
        mode: "onChange"
    })

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

    if (isSuccess) {
        router.replace("/").then()
        toast.success(
            "Request is sent successfully, now go to the status section"
        )
    }

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
                                    required
                                    fullWidth
                                    label={field.label.en}
                                    {...register(
                                        `static_fields.${index}.value`
                                    )}
                                    // error={!!errors.static_fields}
                                    // helperText={
                                    //     errors.static_fields
                                    //         ? capitalizeFirstLetter(
                                    //               field.field_name
                                    //           ) + " is required"
                                    //         : ""
                                    // }
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
                                        defaultValue={
                                            getTypeOfReference(field.type) ===
                                                "date" && "2022-11-24"
                                        }
                                        // error={!!errors.reference_json}
                                        // helperText={
                                        //     errors.reference_json
                                        //         ? "Field is required"
                                        //         : ""
                                        // }
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
                                        <Typography
                                            sx={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <Typography
                                                component="span"
                                                color={
                                                    typeof watch(
                                                        field.id as any
                                                    ) === "object"
                                                        ? ""
                                                        : "error"
                                                }
                                            >
                                                {field.label} ({field.type}
                                                )&nbsp;
                                            </Typography>
                                            <IconButton
                                                component="span"
                                                color="primary"
                                            >
                                                <PhotoCamera />
                                            </IconButton>
                                            &nbsp;
                                            {typeof watch(field.id as any) ===
                                            "object"
                                                ? watch(field.id as any)?.name
                                                : "❌"}
                                        </Typography>
                                    </label>
                                </Grid>
                            )
                        )}
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item xs={4}>
                            <LoadingButton
                                loading={isCreateLoading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid}
                            >
                                Submit
                            </LoadingButton>
                        </Grid>
                    </Grid>
                    <Typography align="center" color="error">
                        {/*TODO: Fix wrong interface*/}
                        {/*@ts-ignore:next-line*/}
                        {createError?.data.plain_message.map(
                            (message: string) => message
                        )}
                    </Typography>
                </Box>
            </Box>
        </Container>
    )
}

export default Pattern
