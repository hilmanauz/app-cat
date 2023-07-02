import React, { FC } from "react";
import {
    Box,
    Button,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import CatsList from "@components/cats/list";
import Navbar from "@components/navbar";

const CatPage: FC = () => {
    const listRef = React.useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    return (
        <div
            style={{
                height: "100vh",
                overflowY: "scroll",
                overflowAnchor: "none",
            }}
            id="scrolling-techniques-4"
        >
            <Box height={"100vh"} display={"block"}>
                <Box
                    position={"relative"}
                    alignItems={"center"}
                    justifyContent={lg ? "space-between" : "start"}
                    display={"flex"}
                    height={"100%"}
                    paddingTop={"88px"}
                    flexDirection={lg ? "row" : "column-reverse"}
                >
                    <Navbar />
                    <Box
                        width={lg ? "30%" : "100%"}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        marginLeft={lg ? "150px" : "0px"}
                    >
                        <Typography
                            align="left"
                            variant={lg ? "h2" : "h3"}
                            component="span"
                            gutterBottom
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {
                                "All the Cat variants data you'll ever need in one place!"
                            }
                        </Typography>
                        <Typography
                            align="left"
                            variant={lg ? "h6" : "body1"}
                            component="span"
                            color="textSecondary"
                            gutterBottom
                        >
                            Thousands of data compiled into one place
                        </Typography>
                        <br />
                        <Button
                            variant="contained"
                            style={{
                                borderRadius: "14px",
                                width: "240px",
                                textTransform: "none",
                                fontWeight: "bold",
                                backgroundColor: "var(--active-button)",
                                color: "white",
                                fontSize: "20px",
                            }}
                            size="large"
                            fullWidth={false}
                            onClick={() => {
                                listRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }}
                        >
                            Check here!
                        </Button>
                    </Box>
                    <Box
                        display={"flex"}
                        width={lg ? "35%" : "100%"}
                        height={lg ? "60%" : "42%"}
                        marginRight={lg ? "150px" : "0px"}
                    >
                        <img
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                            src={`/Group_291.png`}
                            srcSet={`/Group_291.png`}
                            alt={"dashboard"}
                            loading="lazy"
                        />
                    </Box>
                </Box>
            </Box>
            <div ref={listRef}>
                <CatsList />
            </div>
        </div>
    );
};

export default CatPage;
