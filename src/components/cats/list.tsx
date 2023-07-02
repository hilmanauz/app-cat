import {
    Box,
    Grid,
    FormControl,
    FormHelperText,
    OutlinedInput,
    InputAdornment,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import React, { Dispatch, SetStateAction } from "react";
import useSWR from "swr";
import CatItem, { CatProps } from "./item";
import Fuse from "fuse.js";
import { Search, Clear } from "@material-ui/icons";

const SWROptions = {
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
};

const fetcher = (url) => fetch(url).then((res) => res.json());
const options = {
    includeScore: true,
    keys: ["name"],
};

const SearchBreeds = ({
    setCatSearch,
    fuse,
    page,
    setPage,
}: {
    setCatSearch: Dispatch<
        SetStateAction<{
            search: string;
            value: Array<Record<string, any>>;
        }>
    >;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    fuse: Fuse<any>;
}) => {
    const [search, setSearch] = React.useState("");
    const handleSearch = () => {
        const filtered = fuse?.search(search);
        const filteredData = filtered
            ?.filter((item) => item.score < 0.3)
            .map((el) => el.item);
        if (page !== 0) setPage(0);
        setCatSearch({
            search,
            value: filteredData,
        });
    };
    React.useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            handleSearch();
        }, 1000);
        return () => {
            clearTimeout(timeoutHandler);
        };
    }, [search, fuse]);

    return (
        <FormControl
            style={{
                width: "20%",
            }}
        >
            <FormHelperText
                style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                }}
            >
                Search
            </FormHelperText>
            <OutlinedInput
                type={"text"}
                style={{
                    backgroundColor: "white",
                }}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                endAdornment={
                    <InputAdornment
                        position="end"
                        style={search ? { cursor: "pointer" } : {}}
                        onClick={() => {
                            if (search) {
                                setSearch("");
                                setCatSearch({
                                    search: "",
                                    value: [],
                                });
                            }
                        }}
                    >
                        {search ? <Clear /> : <Search />}
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

function CatsList() {
    const [page, setPage] = React.useState(0);
    const [cats, setCats] = React.useState([]);
    const [catSearch, setCatSearch] = React.useState<{
        search: string;
        value: Array<Record<string, any>>;
    }>({
        search: "",
        value: [],
    });
    const [catSearchData, setCatSearchData] = React.useState([]);
    React.useEffect(() => {
        const listElm = document.querySelector("#scrolling-techniques-4");
        listElm.addEventListener("scroll", (e) => {
            if (
                listElm.scrollTop + listElm.clientHeight + 1 >=
                listElm.scrollHeight
            ) {
                setPage((page) => page + 1);
            }
        });
    }, []);
    const { data: breeds } = useSWR(
        "https://api.thecatapi.com/v1/breeds",
        fetcher,
    );
    const [fuse, setFuse] = React.useState(null);
    React.useEffect(() => {
        if (!breeds) return;
        setFuse(new Fuse(breeds, options));
    }, [breeds]);
    const { isLoading: isCatsLoading } = useSWR(
        [breeds, page],
        async ([breeds, page]) => {
            if (breeds.length === cats.length) return;
            const sliceData = breeds?.slice(page * 10, page * 10 + 10);
            await Promise.all(
                sliceData.map(async (item: CatProps) => {
                    const { data } = await axios.get(
                        `https://api.thecatapi.com/v1/images/search?breed_ids=${item.id}&limit=10`,
                    );
                    item.images = data;
                }),
            );
            setCats((cats) =>
                page === 0 ? sliceData : [...cats, ...sliceData],
            );
        },
    );
    const { isLoading: isSearchLoading } = useSWR(
        [catSearch, cats, page],
        async ([catSearch, cats, page]) => {
            if (catSearch.value.length === catSearchData.length) return;
            const sliceData = catSearch.value?.slice(page * 10, page * 10 + 10);
            await Promise.all(
                sliceData.map(async (item: CatProps) => {
                    const { data } = await axios.get(
                        `https://api.thecatapi.com/v1/images/search?breed_ids=${item.id}&limit=10`,
                    );
                    item.images = data;
                }),
            );
            setCatSearchData((cats) =>
                page === 0 ? sliceData : [...cats, ...sliceData],
            );
        },
    );
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    return (
        <Box
            height={"auto"}
            bgcolor={"var(--secondary-yellow-500)"}
            position={"relative"}
            overflow={"hidden"}
            paddingX={lg ? "150px" : "50px"}
            paddingY={lg ? "100px" : "50px"}
        >
            <div className="property property__top-left" />
            <div className="property property__bottom-right" />
            <Box display={"flex"} flexDirection={"column"}>
                <Box
                    display={"flex"}
                    flexDirection={lg ? "row" : "column"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    zIndex={10}
                >
                    <SearchBreeds
                        page={page}
                        setCatSearch={setCatSearch}
                        fuse={fuse}
                        setPage={setPage}
                    />
                </Box>
                <Box m="5" height={50} />
                <Grid container style={{ zIndex: 10 }} spacing={lg ? 10 : 5}>
                    {((isCatsLoading || isSearchLoading) &&
                    !cats.length &&
                    !catSearch.value?.length
                        ? Array.from(new Array(10))
                        : catSearch.search.length
                        ? catSearchData
                        : cats
                    ).map((item) => (
                        <CatItem item={item} key={Math.random()} />
                    ))}
                </Grid>
                {(isCatsLoading || isSearchLoading) &&
                    (catSearch.value?.length !== catSearchData?.length ||
                        breeds?.length !== cats?.length) && (
                        <Box
                            height={100}
                            marginY={"20px"}
                            width={"100%"}
                            display={"flex"}
                            justifyContent={"center"}
                        >
                            <CircularProgress size={"6rem"} />
                        </Box>
                    )}
            </Box>
        </Box>
    );
}

export default CatsList;
