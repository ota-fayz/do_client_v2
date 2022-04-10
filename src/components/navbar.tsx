import React from "react"
import { AppBar, Toolbar, Typography, Link as MUILink } from "@mui/material"
import Link from "next/link"

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
                    sx={{ flexGrow: 1 }}
                >
                    <Link href="/">
                        <a>TTPU - Dean&apos;s Office</a>
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
