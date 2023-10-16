import { useEffect, useState } from "react";
import NavBar from "./navbar/Navbar";
import Search from "./navbar/Search";
import NumResults from "./navbar/NumResults";
import Main from "./main/Main";
import Box from "./main/Box";
import MovieList from "./main-left/MovieList";
import WatchedMovieList from "./main-right/WatchedMovieList";
import WatchedSummary from "./main-right/WatchedSummary";
import Loader from "./miscellaneouse/Loader";
import MovieDetails from "./main-right/MovieDetails";
import ErrorMessage from "./miscellaneouse/ErrorMessage";

const key = `8047cb10`;

// –––––––––––––––––––––––––––––––

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  // Récupère la liste des films watched
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  const [watched, setWatched] = useState(() => localStorage.getItem("watched"));

  // const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ----------------------------------

  function handleSelectedId(id) {
    setSelectedId((cur) => (id === cur ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

  // ----------------------------------
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  // ----------------------------------

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          //Si le fetch a un soucis
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          //Si aucun résultat de recherche
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.log(err.message);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // Pour éviter des erreurs, et avoir un départ de recherche propre
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  // ----------------------------------

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
