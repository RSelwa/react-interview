import React, { useEffect } from "react"
import MovieCard from "@components/movie-card"
import { useSearchParams } from "react-router-dom"
import { movies$ } from "../movies"

import { Movie } from "@/types"
import { useCustomContext } from "@/custom-context"

const App = () => {
  const { movies, setMovies } = useCustomContext()

  const [searchParams, setSearchParams] = useSearchParams()
  const moviesCategories = [...new Set(movies.map((movie) => movie.category))]

  const fetchMovies = async () => {
    const moviesList = (await movies$) as Movie[]
    setMovies(moviesList)
  }
  useEffect(() => {
    fetchMovies()
  }, [])
  return (
    <main>
      <header>
        <select>
          {moviesCategories.map((categorie, i) => (
            <option key={i}>{categorie}</option>
          ))}
        </select>
      </header>
      <section className="flex flex-wrap gap-4 mx-auto w-10/12">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  )
}

export default App
