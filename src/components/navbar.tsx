import React from "react"
import { AppBar, Toolbar, Typography, Link as MUILink } from "@mui/material"
import Link from "next/link"
import Image from "next/image"

const Navbar = () => {
    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`
            }}
        >
            <Toolbar sx={{ flexWrap: "wrap" }}>
                <Typography
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, paddingTop: 1 }}
                >
                    <Link href="/">
                        <a>
                            <Image width="75px" height="75px" src="/logo.png" alt="logo" />
                        </a>
                    </Link>
                </Typography>
                <nav>
                    <Link href="/status" passHref>
                        <MUILink
                            variant="button"
                            color="text.primary"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Status
                        </MUILink>
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
