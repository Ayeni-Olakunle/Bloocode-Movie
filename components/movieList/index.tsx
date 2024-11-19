"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Loader from "../Loader/loader";

interface MovieDetails {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: number;
}
export default function MovieList() {
  const [data, setData] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const token = process.env.NEXT_PUBLIC_TOKEN;

  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTg2MGI4YWFlMjU3NzZiMjdjYTVhOTZkYmUyNmMzMyIsIm5iZiI6MTczMTkzNDk5MC45NjA3MjY3LCJzdWIiOiI2NzNiMWM2MTczYTQ1ZTUxODRiZmE0YTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7-BptNNuX9kdBgWN6-yXb-pDRYcnOxRf36zXs2o4s8s`,
              //   Authorization: `Bearer ${token}`,
            },
          }
        );

        setData((prevData) => [...prevData, ...response.data.results]);
        setLoading(false);

        if (response.data.results.length === 0) {
          setHasMore(false);
        }
      } catch (err) {
        setError("Oops! Something went wrong while fetching movies.");
        console.log(err);        
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchMovies(page);
  }, [page, fetchMovies]);

  const loadMoreMovies = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting && hasMore && !loading) {
        loadMoreMovies();
      }
    }, options);

    const currentObserver = observerRef.current;
    const loaderElement = document.getElementById("loader");

    if (loaderElement) {
      currentObserver.observe(loaderElement);
    }

    return () => {
      if (loaderElement && currentObserver) {
        currentObserver.unobserve(loaderElement);
      }
    };
  }, [loadMoreMovies, hasMore, loading]);

  if (loading && data.length === 0) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section>
      <div className="min-h-screen bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Latest Movies</h1>
          <div className="grid gap-6 grid-cols-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5">
            {data.map((movie, index: number) => (
              <MovieCard
                key={index}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
              />
            ))}
          </div>
          <div id="loader" className="text-center py-6">
            {loading && <Loader />}
            {!hasMore && (
              <div className="text-gray-400">No more movies to load.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
