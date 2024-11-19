import Link from "next/link";
import { useState, useCallback } from "react";
import { IoHeart } from "react-icons/io5";

interface MovieDetails {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: number;
}

const getMoviesFromLocalStorage = (): MovieDetails[] => {
  const data = localStorage.getItem("faveMovies");
  return data ? JSON.parse(data) : [];
};

const saveMoviesToLocalStorage = (movies: MovieDetails[]): void => {
  localStorage.setItem("faveMovies", JSON.stringify(movies));
};

const addMovieToLocalStorage = (newMovie: MovieDetails): void => {
  const moviesArray = getMoviesFromLocalStorage();
  moviesArray.push(newMovie);
  saveMoviesToLocalStorage(moviesArray);
};

const removeMovieFromLocalStorage = (movieTitle: string): void => {
  const moviesArray = getMoviesFromLocalStorage();
  const updatedMoviesArray = moviesArray.filter(
    (movie) => movie.title !== movieTitle
  );
  saveMoviesToLocalStorage(updatedMoviesArray);
};

const doesMovieExistInLocalStorage = (movieTitle: string): boolean => {
  const moviesArray = getMoviesFromLocalStorage();
  return moviesArray.some((movie) => movie.title === movieTitle);
};

const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
}: MovieDetails) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(
    doesMovieExistInLocalStorage(title)
  );

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeMovieFromLocalStorage(title);
    } else {
      addMovieToLocalStorage({
        id,
        title,
        poster_path,
        vote_average,
        release_date,
      });
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, id, title, poster_path, vote_average, release_date]);

  const getRatingColor = (rating: number): string => {
    if (rating >= 75) return "bg-green-500";
    if (rating >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${getRatingColor(
            vote_average
          )} text-white`}
        >
          {vote_average}%
        </div>
      </div>
      <div className="p-4">
        <Link href={`movie-detail/${id}`}>
          <h2 className="dontBreak text-lg font-bold text-white hover:text-bg-gray-800">
            {title}
          </h2>
        </Link>
        <div className="flex justify-between items-center">
          <p className="dontBreak text-gray-400">{release_date}</p>
          <IoHeart
            onClick={toggleFavorite}
            className={`cursor-pointer ${
              isFavorite ? "text-[tomato]" : "text-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
