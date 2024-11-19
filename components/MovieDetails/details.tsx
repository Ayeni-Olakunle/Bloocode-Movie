"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Loader from "../Loader/loader";

interface Genre {
  name: string;
}

interface MovieDetails {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  overview: string;
  genres: Genre[];
}

const API_TOKEN = process.env.NEXT_PUBLIC_TOKEN;

export default function Details() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const movieId = pathname.split("/")[2];

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!movie) return <div className="text-white">Movie not found.</div>;

  const {
    title,
    poster_path,
    release_date,
    overview,
    vote_average,
    genres,
    runtime,
  } = movie;

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="w-full md:w-1/3 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
            <p className="text-gray-400 mb-4">{release_date}</p>
            <p className="text-gray-200 mb-4">{overview}</p>
            <div className="text-white mb-4">
              <strong>Rating:</strong> {vote_average} / 10
            </div>
            <div className="text-white mb-4">
              <strong>Genres:</strong>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </div>
            <div className="text-white">
              <strong>Runtime:</strong> {runtime} minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
