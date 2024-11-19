"use client";

import React from "react";
import MovieCard from "../movieList/MovieCard";

interface MovieDetails {
  id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: number;
}

export default function FavoriteMovieList() {
  const data: string | null = localStorage.getItem("faveMovies");
  const parsedData = JSON.parse(data ?? "[]");

  return (
    <section>
      <div className="min-h-screen bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">
            Favorite Movies
          </h1>
          {parsedData.length === 0 ? (
            <div className="flex justify-center items-center text-[white]">
              <p>You&apos;ve not add any movie to favorite</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-5 sm:grid-cols-[1fr_1fr] md:grid-cols-3">
              {parsedData.map((movie: MovieDetails, index: number) => (
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
          )}
        </div>
      </div>
    </section>
  );
}
