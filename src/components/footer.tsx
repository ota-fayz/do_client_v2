import React from "react"
import { Container, Typography, Link as MUILink } from "@mui/material"

function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            {new Date().getFullYear()}
            <MUILink
                target="_blank"
                color="inherit"
                href="https://t.me/ota_fayz"
            >
                &nbsp;Otabek Fayziev
            </MUILink>
            {","}
            <MUILink
                target="_blank"
                color="inherit"
                href="https://t.me/turquoise_cacke"
            >
                &nbsp;Leonid Tsoy
            </MUILink>
            {". All Rights Reserved"}
        </Typography>
    )
}

const Footer = () => {
    return (
        <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6]
            }}
        >
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default Footer
