import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

function Navbar() {
    const router = useRouter();
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    return (
        <Box
            position={"absolute"}
            top={0}
            display={"flex"}
            alignItems={"center"}
            height={"88px"}
            marginX={lg ? "130px" : "0px"}
        >
            <img
                style={{
                    maxWidth: lg ? "167px" : "120px",
                    maxHeight: "100px",
                }}
                src={`/cat-logo.png`}
                srcSet={`/cat-logo.png`}
                alt={"dashboard"}
                loading="lazy"
            />
            <Typography
                align="center"
                variant="h4"
                display="inline"
                style={{
                    textDecoration: "underline",
                    paddingTop: "20px",
                    color:
                        router.pathname === "/"
                            ? "var(--active-button)"
                            : "var(--basic-neutral-700)",
                    cursor: "pointer",
                }}
            >
                Cat Gallery
            </Typography>
        </Box>
    );
}

export default Navbar;
