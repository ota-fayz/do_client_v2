import * as Yup from "yup"

export const validationSchemaStaticField = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    role: Yup.string().required("Role is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
})
