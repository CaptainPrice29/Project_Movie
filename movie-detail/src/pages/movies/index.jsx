import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, setMovieDetailDrawerState, setSearchParam } from "./actions";
import { Heading, Icon, Input, InputGroup } from "@chakra-ui/react";
import MovieCard from "./movieCard";
import styled from "styled-components";
import { SkeletonCard } from "./skeletonCard";
import MovieDetail from "./movieDetail";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router";
import queryString from "query-string";
function Movies() {
    const dispatch = useDispatch();
    let [_, setSearchParams] = useSearchParams();

    const { moviesList, loaders, movieDetail, movieDetailDrawerState, searchParam } = useSelector((state) => state.moviesReducer);
    useEffect(() => {
        const params = queryString.parse(location.search);
        console.log('www', params.q);
        dispatch(setSearchParam(params?.q || ''));
        dispatch(getMovies());
    }, []);

    return (
        <Body>
            {movieDetailDrawerState && <MovieDetail movieData={movieDetail} open={movieDetailDrawerState} close={() => dispatch(setMovieDetailDrawerState(false))} isLoading={loaders?.movieDetailLoader} />}
            <Heading size="3xl">Movies</Heading>
            <InputGroup flex="1" startElement={<Icon as={FaSearch} mr={1} />}>
                <Input value={searchParam} placeholder="Search movies" onChange={(e) => {
                    dispatch(setSearchParam(e.target.value))
                    dispatch(getMovies())
                    setSearchParams({ q: e.target.value });
                }} />
            </InputGroup>
            <MovieWrapper>

                {loaders?.movieListLoader ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    moviesList.map((movie) => (
                        <MovieCard key={movie['#IMDB_ID']} movie={movie} />
                    ))
                )}
            </MovieWrapper>
        </Body>
    );
}
export default Movies

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const MovieWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
`
