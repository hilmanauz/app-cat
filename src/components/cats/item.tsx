import {
    Grid,
    Box,
    Typography,
    capitalize,
    Tooltip,
    useMediaQuery,
    useTheme,
    Avatar,
    styled,
    IconButtonProps,
    IconButton,
    Button,
    Collapse,
} from "@material-ui/core";
import { ExpandMore, Favorite, FavoriteBorder } from "@material-ui/icons";
import { Rating, Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import React from "react";
import Carousel from "react-material-ui-carousel";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

export type CatProps = {
    adaptability: number;
    affection_level: number;
    alt_names: string;
    cfa_url: string;
    child_friendly: number;
    country_code: string;
    country_codes: string;
    description: string;
    dog_friendly: number;
    energy_level: number;
    experimental: number;
    grooming: number;
    hairless: number;
    health_issues: number;
    hypoallergenic: number;
    id: string;
    indoor: number;
    intelligence: number;
    lap: number;
    life_span: string;
    name: string;
    natural: number;
    origin: string;
    rare: number;
    reference_image_id: string;
    rex: number;
    shedding_level: number;
    short_legs: number;
    social_needs: number;
    stranger_friendly: number;
    suppressed_tail: number;
    temperament: string;
    vcahospitals_url: string;
    vetstreet_url: string;
    vocalisation: number;
    wikipedia_url: string;
    images: Array<{
        id: string;
        url: string;
    }>;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreComp = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    // @ts-ignore
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

const catStatusKey = [
    "adaptability",
    "affection_level",
    "child_friendly",
    "dog_friendly",
    "energy_level",
    "grooming",
    "health_issues",
    "intelligence",
    "shedding_level",
    "social_needs",
    "stranger_friendly",
    "vocalisation",
];

function CatItem({ item }: { item: CatProps }) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = React.useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    const catStatus = React.useMemo(() => {
        if (!item) return [];
        return catStatusKey.map((key) => [key, item[key]]);
    }, [item]);
    return (
        <Grid item lg={4}>
            <Box
                borderRadius={"5px"}
                bgcolor={"white"}
                padding={"45px 25px"}
                paddingBottom={"25px"}
                style={{
                    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.35)",
                }}
                display={"flex"}
                flexDirection={"column"}
            >
                {item ? (
                    <div
                        style={{
                            position: "relative",
                        }}
                    >
                        <Carousel
                            autoPlay={false}
                            indicators
                            fullHeightHover
                            animation="fade"
                            navButtonsAlwaysVisible
                            cycleNavigation
                        >
                            {item.images.length ? (
                                item.images.map((item, i) => (
                                    <img
                                        key={i}
                                        className="cat-image"
                                        src={item.url}
                                        width={"100%"}
                                        height={"400"}
                                        alt={item.id}
                                    />
                                ))
                            ) : (
                                <img
                                    className="cat-image"
                                    src={"/not-found.webp"}
                                    width={"100%"}
                                    height={"400"}
                                    alt={item.id}
                                />
                            )}
                        </Carousel>
                        <div
                            style={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                zIndex: 100,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="default"
                                onClick={function () {}}
                                style={{
                                    borderRadius: "12px",
                                    padding: "5px 10px",
                                }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${item.country_code.toLowerCase()}.svg`}
                                    style={{
                                        marginRight: "10px",
                                        cursor: "pointer",
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                                {item.origin}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Skeleton variant="rect" height={300} />
                )}
                <Box height={8} />
                {item ? (
                    <>
                        <Typography
                            variant="h5"
                            component="p"
                            color="textSecondary"
                            style={{ fontWeight: "bold" }}
                        >
                            #{item.id.toLocaleUpperCase()}
                        </Typography>
                        <Typography
                            variant="h5"
                            component="p"
                            style={{ fontWeight: "700" }}
                        >
                            {capitalize(item.name)}
                        </Typography>
                        <Box height={15} />
                        <Box display={"flex"}>
                            <Avatar
                                alt="wiki-url"
                                src="/wiki-logo.png"
                                style={{
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    window.open(
                                        item.wikipedia_url,
                                        "_blank",
                                        "noreferrer",
                                    );
                                }}
                            />
                            <Avatar
                                alt="vestreet-url"
                                src="/vestreet-logo.jpg"
                                style={{
                                    marginRight: "10px",
                                    cursor: "pointer",
                                }}
                                variant="rounded"
                                onClick={() => {
                                    window.open(
                                        item.vetstreet_url,
                                        "_blank",
                                        "noreferrer",
                                    );
                                }}
                            />
                            <Avatar
                                alt="cfa-url"
                                src="/cfa-logo.jpg"
                                style={{
                                    marginRight: "10px",
                                    outline: "1px solid gray",
                                    cursor: "pointer",
                                }}
                                variant="rounded"
                                onClick={() => {
                                    window.open(
                                        item.cfa_url,
                                        "_blank",
                                        "noreferrer",
                                    );
                                }}
                            />
                            <Avatar
                                alt="vca-url"
                                src="/VCA-logo.png"
                                style={{
                                    outline: "1px solid gray",
                                    cursor: "pointer",
                                }}
                                variant="rounded"
                                onClick={() => {
                                    window.open(
                                        item.vcahospitals_url,
                                        "_blank",
                                        "noreferrer",
                                    );
                                }}
                            />
                            <ExpandMoreComp
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMore />
                            </ExpandMoreComp>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                )}
                {item && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box height={10} />
                        <Typography variant="body1">
                            {item.description}
                        </Typography>
                        <div>---</div>
                        <Typography
                            variant="body1"
                            paragraph
                            style={{ fontWeight: "bold", fontStyle: "italic" }}
                        >
                            {item.temperament}
                        </Typography>
                        <Grid container spacing={1}>
                            {catStatus.map(([key, value]) => (
                                <Grid item lg={6} key={key}>
                                    <Typography
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {capitalize(key.split("_").join(" "))}
                                    </Typography>
                                    <StyledRating
                                        name="customized-color"
                                        value={value}
                                        readOnly
                                        precision={0.5}
                                        icon={<Favorite fontSize="inherit" />}
                                        emptyIcon={
                                            <FavoriteBorder fontSize="inherit" />
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Collapse>
                )}
            </Box>
        </Grid>
    );
}

export default React.memo(CatItem);
