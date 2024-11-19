import React from "react";
import Header from "@/components/Header";
import FavoriteMovieList from "@/components/favorite/favoriteList";

export default function Page() {
  return (
    <section>
      <Header />
      <FavoriteMovieList />
    </section>
  );
}
