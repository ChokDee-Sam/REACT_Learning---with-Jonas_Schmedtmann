import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie }) {
  // console.log(movies);
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
