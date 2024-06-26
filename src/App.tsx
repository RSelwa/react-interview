import React, { useEffect } from "react"
import MovieCard from "@components/movie-card"
import { useSearchParams } from "react-router-dom"
import { movies$ } from "../movies"

import { Movie } from "@/types"
import { useCustomContext } from "@/custom-context"

const App = () => {
  const { movies, setMovies } = useCustomContext()
  const moviesCategories = [...new Set(movies.map((movie) => movie.category))]

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryFilter = searchParams.get("c")
  const filterMovies = (category: string) => {
    if (category === "default") {
      const newSearchParams = searchParams
      newSearchParams.delete("c")
      setSearchParams(newSearchParams)

      return
    }
    setSearchParams({ ...searchParams, c: category })
  }
  const fetchMovies = async () => {
    const moviesList = (await movies$) as Movie[]
    setMovies(moviesList)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <header className="w-full py-4 bg-gray-700 pl-40">
        <select
          onChange={(e) => filterMovies(e.target.value)}
          className="border-none outline-none px-2 py-2"
        >
          <option defaultChecked value="default">
            Selctionner une catégorie
          </option>
          {moviesCategories.map((categorie, i) => (
            <option key={i}>{categorie}</option>
          ))}
        </select>
      </header>
      <section className="flex flex-wrap gap-4 mx-auto w-10/12">
        {movies
          .filter((movie) =>
            categoryFilter ? movie.category === categoryFilter : movie
          )
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </section>
    </main>
  )
}

export default App
